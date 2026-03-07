import mongoose from "mongoose";
import slugify from "speakingurl"; 
import { nanoid } from "nanoid"; // 

const invitadoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  telefono: { type: String },
  slug: { type: String, unique: true },
  linkUnico: { type: String, unique: true },
  confirmado: { type: Boolean, default: false },
  asistentes: { type: Number, default: 1 },
  maxAsistentes: { type: Number, default: 1 },
  fechaConfirmacion: { type: Date },
}, { timestamps: true });

// Middleware PRE-SAVE (mejor que validate para este caso)
invitadoSchema.pre("save", function (next) {
  // Solo generamos si son nuevos
  if (this.isNew) {
    const idCorto = nanoid(6); // Genera algo como "xkP2w9"
    
    // Si no vienen del controlador, los creamos aquí
    if (!this.slug) {
      this.slug = `${slugify(this.nombre)}-${idCorto}`;
    }
    if (!this.linkUnico) {
      this.linkUnico = idCorto;
    }
  }
  next();
});

export default mongoose.model("Invitado", invitadoSchema);