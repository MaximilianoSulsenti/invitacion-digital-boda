import express from "express";
import upload from "../middlewares/upload.js";
import cloudinary from "../config/cloudinary.js";
import Foto from "../models/Foto.js";
import Invitado from "../models/Invitado.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

const extraerMensajeError = (error) => {
  if (!error) return "Error upload";
  return (
    error.message ||
    error.error?.message ||
    error.error?.description ||
    "Error upload"
  );
};

const subirArchivoACloudinary = (file, invitadoId = null) =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder: "boda",
        resource_type: "image",
      },
      async (error, result) => {
        if (error) return reject(error);

        if (!result?.secure_url || !result?.public_id) {
          return reject(new Error("Cloudinary no devolvió una URL válida"));
        }

        try {
          const foto = new Foto({
            url: result.secure_url,
            nombre: result.public_id,
            invitado: invitadoId,
            aprobada: false,
          });

          await foto.save();
          resolve(foto);
        } catch (dbError) {
          reject(dbError);
        }
      }
    );

    stream.end(file.buffer);
  });

// Subida desde QR del salón (sin invitado)

router.post("/", upload.array("foto", 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "No se recibió ninguna foto" });
    }

    const fotosGuardadas = [];

    for (const file of req.files) {
      const foto = await subirArchivoACloudinary(file);
      fotosGuardadas.push(foto);
    }

    res.json(fotosGuardadas);

  } catch (e) {
    const detalle = extraerMensajeError(e);
    console.error("Error en /api/fotos:", detalle);
    res.status(500).json({ msg: detalle });
  }
});

router.post("/:link", upload.array("foto", 20), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: "No se recibió ninguna foto" });
    }

    const invitado = await Invitado.findOne({ linkUnico: req.params.link });

    if (!invitado) {
      return res.status(404).json({ msg: "Invitado no encontrado" });
    }

    const fotosGuardadas = [];

    for (const file of req.files) {
      const foto = await subirArchivoACloudinary(file, invitado._id);
      fotosGuardadas.push(foto);
    }

    res.json(fotosGuardadas);

  } catch (e) {
    const detalle = extraerMensajeError(e);
    console.error(`Error en /api/fotos/${req.params.link}:`, detalle);
    res.status(500).json({ msg: detalle });
  }
});

router.get("/", async (req, res) => {
  const fotos = await Foto.find({ aprobada: true });
  res.json(fotos);
});

router.get("/pendientes", async (req, res) => {
  const fotos = await Foto.find({ aprobada: false }).sort({ fecha: -1 });
  res.json(fotos);
});

router.put("/:id/aprobar", auth, async (req, res) => {
  const foto = await Foto.findByIdAndUpdate(
    req.params.id,
    { aprobada: true },
    { new: true }
  );

  const io = req.app.get("io");
  io.emit("nueva-foto", foto);

  res.json(foto);
});

router.delete("/:id", auth, async (req, res) => {
  const foto = await Foto.findByIdAndDelete(req.params.id);

  if (!foto) {
    return res.status(404).json({ error: "Foto no encontrada" });
  }

  const io = req.app.get("io");

  // Avisar al salón que elimine esa foto
  io.emit("eliminar-foto", req.params.id);

  res.json({ mensaje: "Foto eliminada" });
});

export default router;