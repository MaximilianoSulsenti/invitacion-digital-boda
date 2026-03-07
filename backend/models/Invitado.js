import mongoose from "mongoose";

const invitadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: { type: String },
  email: { type: String },
  linkUnico: { type: String, unique: true },
  confirmado: { type: Boolean, default: false },
  asistentes: { type: Number, default: 1 }, // por si viene +1
  maxAsistentes: { type: Number, default: 1 }, // para limitar invitados con +1
  acompanante: [{ nombre: String, apellido: String }],
  fechaConfirmacion: { type: Date },
}, { timestamps: true });

export default mongoose.model("Invitado", invitadoSchema);