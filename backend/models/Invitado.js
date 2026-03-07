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

// Middleware PRE-SAVE
// Importante: No uses arrow functions () => {} aquí para mantener el contexto de 'this'
invitadoSchema.pre("save", function (next) {
  const invitado = this;

  // Solo generamos valores si el documento es nuevo
  if (invitado.isNew) {
    // Generador nativo robusto
    const idCorto = Math.random().toString(36).substring(2, 8);
    
    // 1. Asignar linkUnico si no existe
    if (!invitado.linkUnico) {
      invitado.linkUnico = idCorto;
    }

    // 2. Generar Slug seguro (maneja espacios y caracteres especiales básicos)
    if (!invitado.slug && invitado.nombre) {
      const nombreLimpio = invitado.nombre
        .toLowerCase()
        .normalize("NFD") // Separa tildes de las letras
        .replace(/[\u0300-\u036f]/g, "") // Elimina las tildes
        .replace(/[^a-z0-9\s-]/g, "") // Elimina todo lo que no sea letra, número o espacio
        .trim()
        .replace(/\s+/g, "-"); // Cambia espacios por guiones
      
      invitado.slug = `${nombreLimpio}-${idCorto}`;
    }
  }

  // Finaliza el middleware y permite que Mongoose guarde
  next();
});

// Evitar errores de compilación de modelo duplicado en desarrollo
const Invitado = mongoose.models.Invitado || mongoose.model("Invitado", invitadoSchema);

export default Invitado;