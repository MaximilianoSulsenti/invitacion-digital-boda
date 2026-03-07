import mongoose from "mongoose";

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

invitadoSchema.pre("save", function (next) {
  if (this.isNew) {
    // Generador ultra-simple nativo
    const idCorto = Math.random().toString(36).substring(2, 8);
    
    if (!this.linkUnico) this.linkUnico = idCorto;
    if (!this.slug) {
      // Slug manual simple para testear
      this.slug = `${this.nombre.toLowerCase().replace(/\s+/g, '-')}-${idCorto}`;
    }
  }
  next();
});

export default mongoose.model("Invitado", invitadoSchema);