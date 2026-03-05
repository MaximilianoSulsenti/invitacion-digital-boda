import express from "express";
import Invitado from "../models/Invitado.js";
import auth from "../middleware/auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";

const router = express.Router();

router.get("/invitados", auth, async (req, res) => {
  try {
    const invitados = await Invitado.find();
    res.json(invitados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear admin (usar solo una vez)
router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existe = await Admin.findOne({ email });
    if (existe) {
      return res.status(400).json({ msg: "Admin ya existe" });
    }

    const hash = await bcrypt.hash(password, 10);

    const nuevoAdmin = new Admin({
      email,
      password: hash,
    });

    await nuevoAdmin.save();

    res.json({ msg: "Admin creado correctamente" });

  } catch (err) {
    res.status(500).json({ msg: "Error creando admin" });
  }
});

export default router;