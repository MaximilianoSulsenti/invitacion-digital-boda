import mongoose from "mongoose";

const FotoSchema = new mongoose.Schema({
  url: String,
  nombre: String,
  invitado: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invitado"
  },
  fecha: {
    type: Date,
    default: Date.now
  },
  aprobada: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("Foto", FotoSchema);