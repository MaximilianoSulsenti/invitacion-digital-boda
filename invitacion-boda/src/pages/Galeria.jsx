import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { Camera, Upload, Check, Image as ImageIcon, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Galeria = () => {
  const { linkUnico } = useParams();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreview(URL.createObjectURL(selected));
      setOk(false);
    }
  };

  const subir = async () => {
    if (!file) return;
    setLoading(true);
    const form = new FormData();
    form.append("foto", file);

    try {
      await api.post(`/fotos/${linkUnico}`, form);
      setOk(true);
      setFile(null);
      setPreview(null);
    } catch (err) {
      alert("Error al subir la foto");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF0] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white w-full max-w-md p-8 rounded-[3rem] shadow-[0_20px_50px_rgba(184,134,11,0.1)] text-center border border-[#B8860B]/10"
      >
        <div className="mb-8">
          <div className="inline-block p-4 bg-[#FDFCF0] rounded-full text-[#B8860B] mb-4">
            <Camera size={32} strokeWidth={1.5} />
          </div>
          <h2 className="text-3xl font-serif text-black">Nuestra Boda</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-gray-400 font-bold mt-2">Compartí un recuerdo</p>
        </div>

        <div className="space-y-6">
          {/* ÁREA DE SELECCIÓN / PREVIEW */}
          {!preview ? (
            <label className="relative flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-[2rem] p-10 hover:border-[#B8860B]/30 transition-colors cursor-pointer bg-gray-50/50 group">
              <Upload className="text-gray-300 group-hover:text-[#B8860B] transition-colors mb-2" size={40} />
              <span className="text-sm font-medium text-gray-500">Elegir foto o sacar una</span>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleFileChange} 
                className="hidden" 
              />
            </label>
          ) : (
            <div className="relative inline-block w-full animate-in zoom-in-95 duration-300">
              <img 
                src={preview} 
                alt="preview" 
                className="w-full h-64 object-cover rounded-[2rem] shadow-md border-4 border-white"
              />
              <button 
                onClick={() => {setFile(null); setPreview(null);}}
                className="absolute -top-2 -right-2 bg-black text-white rounded-full p-2 shadow-lg"
              >
                <X size={16} />
              </button>
            </div>
          )}

          {/* BOTÓN DE ACCIÓN */}
          <button
            onClick={subir}
            disabled={!file || loading}
            className={`w-full py-5 rounded-2xl font-bold uppercase text-[10px] tracking-[0.2em] transition-all flex items-center justify-center gap-3 ${
              !file || loading 
                ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
                : "bg-black text-white shadow-xl hover:bg-[#B8860B] active:scale-95"
            }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Subir a la pantalla</>
            )}
          </button>

          {/* MENSAJE DE ÉXITO */}
          <AnimatePresence>
            {ok && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-2 text-green-600 bg-green-50 py-3 rounded-xl"
              >
                <Check size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">¡Foto subida con éxito! ❤️</span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-10 text-[9px] text-gray-400 uppercase tracking-widest leading-relaxed">
          Tu foto aparecerá en la pantalla principal<br/>del salón en unos momentos.
        </p>
      </motion.div>
    </div>
  );
};

export default Galeria;