import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, CheckCircle2, UploadCloud, Image as ImageIcon, X } from "lucide-react";

const UploadFotos = ({ linkUnico }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [status, setStatus] = useState("idle"); // idle, uploading, success, error

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setStatus("idle");
    }
  };

  const subir = async () => {
    if (!file) return;
    
    setStatus("uploading");
    const formData = new FormData();
    formData.append("foto", file);
    formData.append("linkUnico", linkUnico);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/uploads`, formData);
      setStatus("success");
      setFile(null);
      setPreview(null);
      // Reset después de 3 segundos para permitir subir otra
      setTimeout(() => setStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <section className="relative w-full py-20 px-4 bg-white overflow-hidden">
      <div className="max-w-2xl mx-auto text-center">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <h2 className="text-4xl font-serif text-black mb-4">Capturá el momento</h2>
          <div className="flex justify-center items-center gap-2 text-[#B8860B]">
            <Camera size={18} strokeWidth={1.5} />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold">Compartí tus fotos</span>
          </div>
        </motion.div>

        <div className="relative bg-[#FDFCF0] border-2 border-dashed border-[#B8860B]/20 rounded-[2.5rem] p-8 md:p-12 transition-all">
          
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="py-10 flex flex-col items-center gap-4"
              >
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={32} />
                </div>
                <p className="font-serif italic text-gray-600">¡Gracias por compartir este recuerdo!</p>
              </motion.div>

            ) : (
              <motion.div key="upload-ui" className="space-y-6">
                
                {!preview ? (
                  <label className="flex flex-col items-center justify-center cursor-pointer group">
                    <div className="w-20 h-20 bg-white rounded-full shadow-sm flex items-center justify-center text-gray-400 group-hover:text-[#B8860B] transition-colors mb-4">
                      <UploadCloud size={32} strokeWidth={1.2} />
                    </div>
                    <p className="text-sm font-medium text-gray-500">Tocá para elegir una foto</p>
                    <p className="text-[10px] text-gray-400 uppercase mt-2">JPG, PNG hasta 10MB</p>
                    <input 
                      type="file" 
                      className="hidden" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                    />
                  </label>
                ) : (
                  <div className="relative inline-block">
                    <img 
                      src={preview} 
                      alt="Preview" 
                      className="w-48 h-48 object-cover rounded-2xl shadow-xl border-4 border-white"
                    />
                    <button 
                      onClick={() => {setFile(null); setPreview(null);}}
                      className="absolute -top-2 -right-2 bg-black text-white rounded-full p-1 shadow-lg"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                <div className="pt-4">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    disabled={!file || status === "uploading"}
                    onClick={subir}
                    className={`
                      w-full md:w-auto px-12 py-4 rounded-full font-bold text-[10px] uppercase tracking-[0.2em] transition-all
                      ${!file || status === "uploading" 
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                        : "bg-black text-white hover:bg-[#B8860B] shadow-lg"}
                    `}
                  >
                    {status === "uploading" ? "Subiendo..." : "Subir a la Galería"}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <p className="mt-8 text-[9px] text-gray-400 uppercase tracking-widest leading-relaxed">
          Las fotos serán moderadas y añadidas al álbum<br/>digital de la boda.
        </p>
      </div>
    </section>
  );
};

export default UploadFotos;