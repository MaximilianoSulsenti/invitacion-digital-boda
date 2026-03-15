import mongoose from "mongoose";

const ConfirmacionSchema = new mongoose.Schema({
  invitado: { type: mongoose.Schema.Types.ObjectId, ref: "Invitado", required: true },
  asistencia: { type: Boolean, required: true },
  mensaje: { type: String },
  cancion : { type: String },
  personas: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Confirmacion", ConfirmacionSchema);