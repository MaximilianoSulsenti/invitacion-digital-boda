import express from "express";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", { email, password: "***" }); // ✅ Agrega esto

    const admin = await Admin.findOne({ email });
    console.log("Admin found:", admin ? "Sí" : "No"); // ✅ Agrega esto
    if (!admin) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    const ok = await bcrypt.compare(password, admin.password);
    console.log("Password match:", ok); // ✅ Agrega esto
    if (!ok) {
      return res.status(401).json({ msg: "No autorizado" });
    }

    const token = jwt.sign(
      { id: admin._id },
      process.env.JWT_SECRET,
      { expiresIn: "8h" }
    );

    res.json({ token });

  } catch (error) {
    console.error("Login error:", error); // ✅ Agrega esto
    res.status(500).json({ error: error.message });
  }
});

export default router;