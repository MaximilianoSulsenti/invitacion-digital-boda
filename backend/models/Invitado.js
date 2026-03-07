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

// Middleware PRE-SAVE Moderno
// Al ser una función async, Mongoose sabe que debe esperar a que termine
// SIN necesidad de llamar a next().
invitadoSchema.pre("save", async function () {
  const invitado = this;

  if (invitado.isNew) {
    const idCorto = Math.random().toString(36).substring(2, 8);
    
    if (!invitado.linkUnico) {
      invitado.linkUnico = idCorto;
    }

    if (!invitado.slug && invitado.nombre) {
      const nombreLimpio = invitado.nombre
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-");
      
      invitado.slug = `${nombreLimpio}-${idCorto}`;
    }
  }
  // No hay next(). Al ser async, el "return" implícito le dice a Mongoose que continúe.
});

const Invitado = mongoose.models.Invitado || mongoose.model("Invitado", invitadoSchema);
export default Invitado;