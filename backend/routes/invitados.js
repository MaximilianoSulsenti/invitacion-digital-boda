import express from "express";
import Invitado from "../models/Invitado.js";
import crypto from "crypto";

const router = express.Router();


/* Estadísticas generales */
router.get("/stats", async (req, res) => {
  try {
    const invitados = await Invitado.find();

    const totalInvitados = invitados.length;

    const confirmados = invitados.filter(i => i.confirmado).length;

    const pendientes = totalInvitados - confirmados;

    const totalAsistentesConfirmados = invitados
      .filter(i => i.confirmado)
      .reduce((acc, i) => acc + i.asistentes, 0);

    res.json({
      totalInvitados,
      confirmados,
      pendientes,
      totalAsistentesConfirmados
    });

  } catch (error) {
    res.status(500).json({ msg: "Error obteniendo estadísticas" });
  }
});

/* Crear invitado */
router.post("/", async (req, res) => {
  try {
    const { nombre, telefono, maxAsistentes } = req.body;

    // Aseguramos que los datos básicos existan
    if (!nombre) return res.status(400).json({ msg: "El nombre es obligatorio" });

    const nuevo = new Invitado({
      nombre,
      telefono,
      maxAsistentes: parseInt(maxAsistentes) || 1
    });

    const guardado = await nuevo.save();
    res.status(201).json(guardado);

  } catch (err) {
    // ESTO aparecerá en la pestaña "Logs" de Render
    console.error("CRITICAL ERROR EN POST /invitados:", err);

    res.status(500).json({
      msg: "Error interno del servidor",
      detalle: err.message
    });
  }
});

/* Listar invitados */
router.get("/", async (req, res, next) => {
  const invitados = await Invitado.find().sort({ createdAt: -1 });
  res.json(invitados);

});

/* Obtener invitado por link */
router.get("/link/:link", async (req, res, next) => {
  const invitado = await Invitado.findOne({ linkUnico: req.params.link });
  if (!invitado) return res.status(404).json({ msg: "No encontrado" });
  res.json(invitado);
});

// En tu backend: cambia la ruta de slug para que sea más robusta
router.get("/slug/:slug", async (req, res) => {
  try {
    // Busca por slug O por linkUnico por las dudas
    const invitado = await Invitado.findOne({
      $or: [
        { slug: req.params.slug },
        { linkUnico: req.params.slug }
      ]
    });

    if (!invitado) return res.status(404).json({ msg: "Invitado no encontrado" });
    res.json(invitado);
  } catch (error) {
    res.status(500).json({ msg: "Error en el servidor" });
  }
});

/* Confirmar asistencia */
router.post("/confirmar/:link", async (req, res, next) => {
  try {
    const { asistentes, mensaje } = req.body;

    const invitado = await Invitado.findOne({ linkUnico: req.params.link });
    if (!invitado) {
      return res.status(404).json({ msg: "Invitado no encontrado" });
    }

    if (!asistentes || asistentes < 1) {
      return res.status(400).json({ msg: "Debe confirmar al menos 1 asistente" });
    }

    if (asistentes > invitado.maxAsistentes) {
      return res.status(400).json({
        msg: `Solo puede confirmar hasta ${invitado.maxAsistentes} asistentes`
      });
    }

    invitado.confirmado = true;
    invitado.asistentes = asistentes;
    invitado.mensaje = mensaje || "";
    invitado.fechaConfirmacion = new Date();

    await invitado.save();

    res.json({ msg: "Confirmado correctamente", invitado });

  } catch (error) {
    res.status(500).json({ msg: "Error al confirmar asistencia" });
  }
});

/* Eliminar */
router.delete("/:id", async (req, res) => {
  await Invitado.findByIdAndDelete(req.params.id);
  res.json({ msg: "Eliminado" });
});

export default router;