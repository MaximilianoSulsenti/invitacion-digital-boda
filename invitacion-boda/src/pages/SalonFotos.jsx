import { useState } from "react";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, Upload, CheckCircle2, X, Plus } from "lucide-react";

const SalonFotos = () => {
  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ok, setOk] = useState(false);

  const seleccionar = (e) => {
    const selected = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selected]);

    const newPreviews = selected.map((file) => URL.createObjectURL(file));
    setPreview((prev) => [...prev, ...newPreviews]);
    setOk(false);
  };

  const quitarFoto = (index) => {
    setFiles(files.filter((_, i) => i !== index));
    setPreview(preview.filter((_, i) => i !== index));
  };

  const subir = async () => {
    if (files.length === 0) return;

    try {
      setLoading(true);
      const form = new FormData();
      files.forEach((f) => form.append("foto", f));

      await api.post("/fotos", form, {
        onUploadProgress: (p) => {
          const percent = Math.round((p.loaded * 100) / p.total);
          setProgress(percent);
        },
      });

      setOk(true);
      setFiles([]);
      setPreview([]);
      setProgress(0);
      // Feedback de éxito por 5 segundos
      setTimeout(() => setOk(false), 5000);
    } catch (err) {
      console.error(err);
      alert("Error al subir. Probá de a pocas fotos.");
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
                    <span className="text-[8px] uppercase tracking-tighter text-gray-400 mt-1">Sumar foto</span>
                    <input type="file" accept="image/*" multiple onChange={seleccionar} className="hidden" />
                  </label>
                </div>

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
                      disabled={files.length === 0}
                      className={`w-full py-5 rounded-2xl font-bold uppercase text-[10px] tracking-[0.3em] transition-all flex items-center justify-center gap-3 ${
                        files.length === 0 
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