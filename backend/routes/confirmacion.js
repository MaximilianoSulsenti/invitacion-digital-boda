import express from "express";
import Confirmacion from "../models/Confirmacion.js";
import Invitado from "../models/Invitado.js";

const router = express.Router();

// Crear confirmación (RSVP)
router.post("/", async (req, res) => {
  try {
    const { linkUnico, asistencia, personas, mensaje } = req.body;

    // Buscar invitado por link único
    const invitado = await Invitado.findOne({ linkUnico });
    if (!invitado) return res.status(404).json({ error: "Invitado no encontrado" });

    // Crear confirmación
    const confirmacion = new Confirmacion({
      invitado: invitado._id,
      asistencia,
      personas,
      mensaje,
    });
    await confirmacion.save();

    // Marcar invitado como confirmado
    invitado.confirmado = true;
    await invitado.save();

    res.status(201).json(confirmacion);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Obtener todas las confirmaciones (para admin)
router.get("/", async (req, res) => {
  try {
    const confirmaciones = await Confirmacion.find().populate("invitado");
    res.json(confirmaciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;