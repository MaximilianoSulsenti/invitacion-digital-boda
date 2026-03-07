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
    const { nombre, telefono, email, asistentes, maxAsistentes } = req.body;

    const linkUnico = crypto.randomBytes(8).toString("hex");

    const nuevo = new Invitado({
      nombre,
      telefono,
      email,
      asistentes: asistentes || 1,
      maxAsistentes: maxAsistentes || 1,
      linkUnico
    });

    await nuevo.save();
    console.log("Nuevo invitado creado:", nuevo);
    res.json(nuevo);
  } catch (err) {
    console.error("Error creando invitado:", err);
    res.status(500).json({ msg: "Error creando invitado" });
  }
});

/* Listar invitados */
router.get("/", async (req, res) => {
  const invitados = await Invitado.find().sort({ createdAt: -1 });
  res.json(invitados);
});

/* Obtener invitado por link */
router.get("/link/:link", async (req, res) => {
  const invitado = await Invitado.findOne({ linkUnico: req.params.link });
  if (!invitado) return res.status(404).json({ msg: "No encontrado" });
  res.json(invitado);
});

/* Confirmar asistencia */
router.post("/confirmar/:link", async (req, res) => {
  try {
    const { asistentes, acompanante } = req.body;

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
    invitado.acompanante = acompanante || [];
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