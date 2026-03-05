import express from "express";
import auth from "../middlewares/auth.js";

const router = express.Router();

let configSalon = {
  pausa: false,
  velocidad: 5000,
  texto: "💍 Boda Maxi & Nati",
  mostrarQR: true,
  modoFiesta: false,
};

router.get("/config", (req, res) => {
  res.json(configSalon);
});

router.post("/config", auth, (req, res) => {
  configSalon = { ...configSalon, ...req.body };

  const io = req.app.get("io");
  io.emit("salon-config", configSalon);

  res.json(configSalon);
});

export default router;