import express from "express";
import multer from "multer";
import Upload from "../models/Upload.js";
import Invitado from "../models/Invitado.js";

const router = express.Router();

// Configuración de Multer (subidas locales en carpeta /uploads)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// POST /api/uploads - subir foto
router.post("/", upload.single("foto"), async (req, res) => {
  try {
    const { linkUnico } = req.body;
    const invitado = await Invitado.findOne({ linkUnico });
    if (!invitado) return res.status(404).json({ error: "Invitado no encontrado" });

    const nuevaUpload = new Upload({
      invitado: invitado._id,
      nombreArchivo: req.file.filename,
      url: `/uploads/${req.file.filename}`, // luego podés usar cloud URL si subís a Cloud
    });
    await nuevaUpload.save();

    res.status(201).json(nuevaUpload);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/uploads - listar todas las fotos
router.get("/", async (req, res) => {
  try {
    const uploads = await Upload.find().populate("invitado");
    res.json(uploads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;