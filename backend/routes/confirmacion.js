import express from "express";
import Confirmacion from "../models/Confirmacion.js";
import Invitado from "../models/Invitado.js";

const router = express.Router();

// Crear confirmación (RSVP)
router.post("/", async (req, res) => {
  try {
    const { linkUnico, asistencia, personas, mensaje, cancion } = req.body;

    // Buscar invitado por link único
    const invitado = await Invitado.findOne({ linkUnico });
    if (!invitado) return res.status(404).json({ error: "Invitado no encontrado" });

    // Crear confirmación
    const confirmacion = new Confirmacion({
      invitado: invitado._id,
      asistencia,
      personas,
      mensaje,
      // Si quieres guardar la canción también en el modelo Confirmacion, descomenta la siguiente línea:
      // cancion,
    });
    await confirmacion.save();

    // Marcar invitado como confirmado y guardar mensaje y cancion
    invitado.confirmado = true;
    if (mensaje) invitado.mensaje = mensaje;
    if (cancion) invitado.cancion = cancion;
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