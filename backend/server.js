import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import invitadoRoutes from "./routes/invitados.js";
import confirmacionRoutes from "./routes/confirmacion.js";
import uploadRoutes from "./routes/upload.js";
import fotosRoutes from "./routes/fotos.js";
import salonRoutes from "./routes/salon.js";
import path from "path";
import { fileURLToPath } from "url";
import http from "http";
import { Server } from "socket.io";
import authRoutes from "./routes/auth.js";
import adminRoutes from "./routes/admin.js";

// para servir archivos estáticos (fotos subidas)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuración de variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Backend de Invitación Boda funcionando ✅");
});

// Rutas
app.use("/api/invitados", invitadoRoutes);
app.use("/api/confirmaciones", confirmacionRoutes);
app.use("/api/uploads", uploadRoutes);
app.use("/api/fotos", fotosRoutes);
app.use("/api/salon", salonRoutes); 
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);

// Mongo
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB conectado ✅"))
  .catch((err) => console.log("Error MongoDB:", err));

// 🔥 HTTP SERVER + SOCKET
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  console.log("Cliente conectado (salón/pantalla)");
});

// hacemos io global para las rutas
app.set("io", io);

// Arrancar servidor
server.listen(PORT, () => {
  console.log(`Servidor PRO corriendo en puerto ${PORT}`);
});