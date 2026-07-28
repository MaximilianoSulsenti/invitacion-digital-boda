import { useState } from "react";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Upload, CheckCircle2, X, Plus } from "lucide-react";

const MAX_ORIGINAL_FILE_SIZE_MB = 20;
const MAX_ORIGINAL_FILE_SIZE_BYTES = MAX_ORIGINAL_FILE_SIZE_MB * 1024 * 1024;
const TARGET_FILE_SIZE_MB = 4;
const TARGET_FILE_SIZE_BYTES = TARGET_FILE_SIZE_MB * 1024 * 1024;
const MAX_DIMENSION = 1920;

const cargarImagen = (file) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };

    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("No se pudo leer la imagen"));
    };

    img.src = url;
  });

const canvasToBlob = (canvas, type, quality) =>
  new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return reject(new Error("No se pudo comprimir la imagen"));
      resolve(blob);
    }, type, quality);
  });

const comprimirImagen = async (file) => {
  const img = await cargarImagen(file);

  let width = img.width;
  let height = img.height;
  const scale = Math.min(1, MAX_DIMENSION / Math.max(width, height));
  width = Math.max(1, Math.round(width * scale));
  height = Math.max(1, Math.round(height * scale));

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No se pudo procesar la imagen");

  let quality = 0.82;
  let blob;

  while (true) {
    canvas.width = width;
    canvas.height = height;
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, 0, 0, width, height);

    blob = await canvasToBlob(canvas, "image/jpeg", quality);

    if (blob.size <= TARGET_FILE_SIZE_BYTES) break;
    if (quality > 0.5) {
      quality -= 0.08;
      continue;
    }
    if (width <= 900 || height <= 900) break;

    width = Math.round(width * 0.85);
    height = Math.round(height * 0.85);
  }

  if (!blob || blob.size > TARGET_FILE_SIZE_BYTES) {
    throw new Error(`No se pudo bajar de ${TARGET_FILE_SIZE_MB} MB`);
  }

  const nombreBase = file.name.replace(/\.[^/.]+$/, "");
  return new File([blob], `${nombreBase}.jpg`, {
    type: "image/jpeg",
    lastModified: Date.now(),
  });
};

const SalonFotos = () => {
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ok, setOk] = useState(false);

  const seleccionar = async (e) => {
    const selected = Array.from(e.target.files);
    if (selected.length === 0) return;

    setProcessing(true);
    const validos = [];
    const rechazados = [];

    for (const file of selected) {
      if (!file.type?.startsWith("image/")) {
        rechazados.push(`${file.name}: no es una imagen`);
        continue;
      }

      if (file.size > MAX_ORIGINAL_FILE_SIZE_BYTES) {
        rechazados.push(`${file.name}: supera ${MAX_ORIGINAL_FILE_SIZE_MB} MB`);
        continue;
      }

      try {
        const comprimida = await comprimirImagen(file);
        validos.push(comprimida);
      } catch (errorCompresion) {
        rechazados.push(`${file.name}: ${errorCompresion.message}`);
      }
    }

    if (rechazados.length > 0) {
      alert(
        `Estas fotos no se pudieron agregar:\n\n${rechazados.join("\n")}`
      );
    }

    if (validos.length === 0) {
      setProcessing(false);
      e.target.value = "";
      return;
    }

    setFiles((prev) => [...prev, ...validos]);

    const newPreviews = validos.map((file) => URL.createObjectURL(file));
    setPreview((prev) => [...prev, ...newPreviews]);
    setOk(false);
    setProcessing(false);
    e.target.value = "";
  };

  const quitarFoto = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreview(preview.filter((_, i) => i !== index));
  };

  const subir = async () => {
    if (files.length === 0) return;

    try {
      setLoading(true);
      let subidasOk = 0;
      const errores = [];

      for (let i = 0; i < files.length; i += 1) {
        const form = new FormData();
        form.append("foto", files[i]);

        try {
          await api.post("/fotos", form, {
            onUploadProgress: (p) => {
              if (!p.total) return;
              const porcentajeArchivo = Math.round((p.loaded * 100) / p.total);
              const porcentajeTotal = Math.round(((i + porcentajeArchivo / 100) / files.length) * 100);
              setProgress(porcentajeTotal);
            },
          });
          subidasOk += 1;
        } catch (errorArchivo) {
          const detalle =
            errorArchivo?.response?.data?.msg ||
            errorArchivo?.response?.data?.error ||
            "No se pudo subir una de las fotos";
          errores.push(`${files[i].name}: ${detalle}`);
        }
      }

      if (subidasOk === 0) {
        throw new Error(errores[0] || "No se pudo subir ninguna foto");
      }

      setOk(true);
      if (subidasOk === files.length) {
        setFiles([]);
        setPreview([]);
      } else {
        alert(`Se subieron ${subidasOk} de ${files.length} fotos.\n\n${errores.join("\n")}`);
      }
      setProgress(0);
      // Feedback de éxito por 5 segundos
      setTimeout(() => setOk(false), 5000);
    } catch (err) {
      console.error(err);
      const detalle =
        err?.response?.data?.msg ||
        err?.response?.data?.error ||
        err?.message ||
        "Error al subir";
      alert(`Error al subir: ${detalle}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white w-full max-w-md rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.05)] border border-[#B8860B]/10 overflow-hidden"
      >
        <div className="p-8 md:p-10 text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-[#FDFCF0] p-4 rounded-full text-[#B8860B]">
              <ImageIcon size={32} strokeWidth={1.5} />
            </div>
          </div>

          <h2 className="text-2xl font-serif text-black mb-2">Álbum en Vivo</h2>
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold mb-8">
            Nati & Maxi • 20/11/2026
          </p>

          <AnimatePresence mode="wait">
            {ok ? (
              <motion.div 
                key="ok"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-10 space-y-4"
              >
                <CheckCircle2 size={60} className="mx-auto text-green-500" strokeWidth={1} />
                <p className="font-serif italic text-gray-600 text-lg">¡Tus fotos ya están en la pantalla!</p>
                <button 
                  onClick={() => setOk(false)}
                  className="text-[10px] uppercase tracking-widest font-bold text-[#B8860B]"
                >
                  Subir más fotos
                </button>
              </motion.div>
            ) : (
              <motion.div key="form" className="space-y-6">
                
                {/* ÁREA DE PREVIEW Y CARGA */}
                <div className="grid grid-cols-3 gap-3 min-h-[100px]">
                  {preview.map((img, i) => (
                    <div key={i} className="relative group aspect-square">
                      <img src={img} className="w-full h-full object-cover rounded-2xl shadow-sm border border-gray-100" />
                      <button 
                        onClick={() => quitarFoto(i)}
                        className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 shadow-lg"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                  
                  <label className="aspect-square border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                    <Plus size={24} className="text-gray-300" />
                    <span className="text-[8px] uppercase tracking-tighter text-gray-400 mt-1">
                      {processing ? "Procesando..." : "Sumar foto"}
                    </span>
                    <input type="file" accept="image/*" multiple onChange={seleccionar} className="hidden" disabled={processing || loading} />
                  </label>
                </div>
                <p className="text-[10px] text-gray-400 uppercase tracking-wider">
                  Se comprime automático a {TARGET_FILE_SIZE_MB} MB por foto
                </p>

                {/* BOTÓN Y PROGRESO */}
                <div className="pt-4 space-y-4">
                  {loading ? (
                    <div className="space-y-2">
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <motion.div 
                          className="bg-black h-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-[10px] uppercase tracking-widest font-bold text-gray-400">
                        Subiendo... {progress}%
                      </p>
                    </div>
                  ) : (
                    <button
                      onClick={subir}
                      disabled={files.length === 0 || processing}
                      className={`w-full py-5 rounded-2xl font-bold uppercase text-[10px] tracking-[0.3em] transition-all flex items-center justify-center gap-3 ${
                        files.length === 0 || processing
                        ? "bg-gray-50 text-gray-300" 
                        : "bg-black text-white shadow-xl active:scale-95"
                      }`}
                    >
                      <Upload size={16} />
                      Compartir Momentos
                    </button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="bg-[#FDFCF0] py-4 text-center border-t border-[#B8860B]/5">
          <p className="text-[9px] text-gray-400 uppercase tracking-widest leading-relaxed px-10">
            Escaneaste el código de tu mesa.<br/>¡Las fotos se verán en la pantalla principal!
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SalonFotos;