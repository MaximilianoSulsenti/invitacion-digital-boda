import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const RSVP = ({ invitado, slug }) => {
  const [asistencia, setAsistencia] = useState(true);
  const [personas, setPersonas] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (invitado?.asistentes) {
      setPersonas(invitado.asistentes);
    }
  }, [invitado]);

  const enviar = async () => {
    if (!slug) {
      setError("Necesitas un link válido para confirmar");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await axios.post(
        `${import.meta.env.VITE_API_URL}/invitados/confirmar/${slug}`,
        {
          asistentes: asistencia ? Number(personas) : 0,
          mensaje
        }
      );
      setOk(true);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "No se pudo enviar la confirmación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full py-24 px-4 bg-[#FDFCF0] overflow-hidden">
      {/* Separador sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-[#B8860B]/20" />

      <div className="relative max-w-xl mx-auto">
        
        {/* Título Estilo Shelley */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-black mb-4 tracking-tight">
             INVITACION
          </h2>
          <p className="font-shelley text-[#B8860B] text-3xl md:text-4xl">
            Confirma tu asistencia
          </p>
        </div>

        {/* Tarjeta del Formulario */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-white border border-[#B8860B]/20 rounded-3xl p-8 md:p-12 shadow-[0_10px_40px_rgba(184,134,11,0.05)]"
        >
          {invitado && !ok && (
            <div className="text-center mb-8 border-b border-[#B8860B]/10 pb-6">
              <p className="text-gray-500 font-serif italic mb-1">Invitación para:</p>
              <p className="text-xl font-medium text-black uppercase tracking-widest">{invitado.nombre}</p>
              <p className="text-[10px] text-[#B8860B] mt-2 uppercase tracking-widest opacity-70">
                Máximo permitido: {invitado.maxAsistentes} personas
              </p>
            </div>
          )}

          {ok ? (
            <motion.div 
              initial={{ scale: 0.9 }} 
              animate={{ scale: 1 }} 
              className="text-center py-10"
            >
              <div className="flex justify-center mb-6 text-[#B8860B]">
                <CheckCircle2 size={60} strokeWidth={1} />
              </div>
              <p className="text-2xl font-serif text-black mb-2">¡Confirmado!</p>
              <p className="text-gray-500 font-serif italic">
                Gracias por acompañarnos, nos hace muy felices compartir este día con vos.
              </p>
            </motion.div>
          ) : (
            <div className="flex flex-col gap-6">
              {/* Selector de Asistencia */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 ml-1">¿Podrás asistir?</label>
                <select
                  className="w-full bg-[#FDFCF0] border border-[#B8860B]/20 p-3 rounded-xl text-black focus:outline-none focus:border-[#B8860B] transition-colors appearance-none"
                  value={asistencia}
                  onChange={(e) => setAsistencia(e.target.value === "true")}
                >
                  <option value="true">Sí, allí estaré</option>
                  <option value="false">Lamentablemente no puedo</option>
                </select>
              </div>

              {asistencia && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="flex flex-col gap-2"
                >
                  <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 ml-1">Invitados confirmados</label>
                  <input
                    type="number"
                    min="1"
                    max={invitado?.maxAsistentes || 10}
                    className="w-full bg-[#FDFCF0] border border-[#B8860B]/20 p-3 rounded-xl text-black focus:outline-none focus:border-[#B8860B]"
                    value={personas}
                    onChange={(e) => setPersonas(e.target.value)}
                  />
                </motion.div>
              )}

              {/* Mensaje */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 ml-1">Mensaje o restricciones</label>
                <textarea
                  className="w-full bg-[#FDFCF0] border border-[#B8860B]/20 p-3 rounded-xl text-black focus:outline-none focus:border-[#B8860B] placeholder:text-gray-300"
                  placeholder="Restricciones alimentarias, canciones que no pueden faltar..."
                  rows="3"
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                />
              </div>

              {error && (
                <p className="text-red-500 text-xs italic text-center bg-red-50 p-2 rounded-lg">
                  {error}
                </p>
              )}

              {/* Botón Dorado */}
              <button
                onClick={enviar}
                disabled={loading || !slug}
                className={`mt-4 py-4 rounded-full text-xs uppercase tracking-[0.3em] font-bold transition-all duration-300 ${
                  loading 
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed" 
                    : "bg-black text-white hover:bg-[#B8860B] shadow-xl"
                }`}
              >
                {loading ? "Enviando..." : "Confirmar Asistencia"}
              </button>
            </div>
          )}
        </motion.div>

        {/* Frase Final */}
        <p className="text-center mt-12 font-shelley text-[#B8860B] text-2xl">
          Nati & Maxi
        </p>
      </div>
    </section>
  );
};

export default RSVP;