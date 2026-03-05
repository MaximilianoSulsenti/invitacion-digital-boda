import mongoose from "mongoose";

const UploadSchema = new mongoose.Schema({
  invitado: { type: mongoose.Schema.Types.ObjectId, ref: "Invitado" },
  nombreArchivo: { type: String, required: true },
  url: { type: String, required: true }, // link cloud
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Upload", UploadSchema);