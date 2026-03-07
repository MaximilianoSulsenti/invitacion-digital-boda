import express from "express";
import upload from "../middlewares/upload.js";
import cloudinary from "../config/cloudinary.js";
import Foto from "../models/Foto.js";
import Invitado from "../models/Invitado.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Subida desde QR del salón (sin invitado)

router.post("/", upload.array("foto", 20), async (req, res) => {
  try {

    const fotosGuardadas = [];

    for (const file of req.files) {

      await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          { folder: "boda" },
          async (error, result) => {

            if (error) return reject(error);

            const foto = new Foto({
              url: result.secure_url,
              nombre: result.public_id,
              invitado: null,
              aprobada: false
            });

            await foto.save();

            fotosGuardadas.push(foto);

            resolve();
          }
        );

        stream.end(file.buffer);

      });

    }

    res.json(fotosGuardadas);

  } catch (e) {
    res.status(500).json({ msg: "Error upload" });
  }
});

router.post("/:link", upload.array("foto", 20), async (req, res) => {
  try {

    const invitado = await Invitado.findOne({ linkUnico: req.params.link });

    if (!invitado) {
      return res.status(404).json({ msg: "Invitado no encontrado" });
    }

    const fotosGuardadas = [];

    for (const file of req.files) {

      await new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
          { folder: "boda" },
          async (error, result) => {

            if (error) return reject(error);

            const foto = new Foto({
              url: result.secure_url,
              nombre: result.public_id,
              invitado: invitado._id,
              aprobada: false
            });

            await foto.save();

            fotosGuardadas.push(foto);

            resolve();
          }
        );

        stream.end(file.buffer);

      });

    }

    res.json(fotosGuardadas);

  } catch (e) {
    res.status(500).json({ msg: "Error upload" });
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