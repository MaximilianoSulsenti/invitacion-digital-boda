import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const RSVP = ({ invitado, slug }) => {
  const [asistencia, setAsistencia] = useState(true);
  const [personas, setPersonas] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const [cancion, setCancion] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (invitado?.asistentes) {
      setPersonas(invitado.asistentes);
    }
    // Verifica si ya confirmó este invitado usando localStorage
    if (slug && localStorage.getItem(`rsvp_${slug}`) === "ok") {
      setOk(true);
    }
  }, [invitado, slug]);

  const maxPermitido = invitado?.maxAsistentes || 10;

  const enviar = async () => {
    if (!invitado) {
      setError("No tienes una invitación personalizada.");
      return;
    }
    if (!slug) {
      setError("Necesitas un link válido para confirmar");
      return;
    }
    if (asistencia && (personas < 1 || personas > maxPermitido)) {
      setError(`La cantidad de personas debe ser entre 1 y ${maxPermitido}`);
      return;
    }
    setError("");
    try {
      setLoading(true);
      await axios.post(
        `${import.meta.env.VITE_API_URL}/invitados/confirmar/${slug}`,
        {
          asistentes: asistencia ? Number(personas) : 0,
          mensaje,
          cancion
        }
      );
      setOk(true);
      // Guarda en localStorage que este invitado ya confirmó
      if (slug) {
        localStorage.setItem(`rsvp_${slug}`, "ok");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.msg || "No se pudo enviar la confirmación");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative w-full py-24 px-4 bg-[#FDFCF0] overflow-hidden">
      {/* Imagen de fondo decorativa */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundImage: "url('/img/fondocontenedor.jpeg')", // Cambia por tu imagen
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.60, // Ajusta la opacidad a gusto
          pointerEvents: "none"
        }}
        aria-hidden="true"
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-[#B8860B]/20" />
      <div className="relative max-w-xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif text-black mb-4 tracking-tight">
            INVITACION
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mb-8 bg-[#FDFCF0] border border-[#B8860B]/30 rounded-2xl p-4 shadow-sm max-w-xs mx-auto"
          >
            <h3 className="text-base font-serif text-[#B8860B] mb-2 text-center">Detalles de la tarjeta</h3>
            <ul className="text-xs text-gray-700 font-serif space-y-1 text-center">
              <li>
                <span className="font-semibold text-black">Precio:</span> $97.600 por persona , menores de 0 a 3 no abonan y de 4 a 8 abonan el 50% del valor total.
              </li>
              <li>
                <span className="font-semibold text-black">Menú:</span> Entrada, Plato Principal (Costillar y vacio a la estaca), postre, bebidas y barra libre (Sin limite toda la noche) y desayuno al finalizar la fiesta.
              </li>
              <li>
                <span className="font-semibold text-black">Restricciones:</span> Aclararnos en el formulario si tenes alguna restriccion alimentaria.
              </li>
            </ul>
            <br />
            <span className="block text-[12px] text-gray-600 italic mt-2 text-center">
              Precio sujeto a modificación por IPC
            </span>
          </motion.div>
          <p className="font-shelley text-[#B8860B] text-3xl md:text-4xl">
            Confirma tu asistencia
          </p>
        </div>
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
                Máximo permitido: {maxPermitido} personas
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
                    max={maxPermitido}
                    className="w-full bg-[#FDFCF0] border border-[#B8860B]/20 p-3 rounded-xl text-black focus:outline-none focus:border-[#B8860B]"
                    value={personas}
                    onChange={(e) => setPersonas(e.target.value)}
                  />
                </motion.div>
              )}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 ml-1">Restricciones</label>
                <textarea
                  className="w-full bg-[#FDFCF0] border border-[#B8860B]/20 p-2 rounded-xl text-black focus:outline-none focus:border-[#B8860B] placeholder:text-gray-300"
                  placeholder="Dejanos tu mensaje con tu Restriccion Alimentaria..."
                  rows={2}
                  value={mensaje}
                  onChange={(e) => setMensaje(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] uppercase tracking-[0.2em] text-gray-400 ml-1">Tu Canción Favorita</label>
                <textarea
                  className="w-full bg-[#FDFCF0] border border-[#B8860B]/20 p-2 rounded-xl text-black focus:outline-none focus:border-[#B8860B] placeholder:text-gray-300"
                  placeholder="Que canción no puede faltar el día de la boda..."
                  rows={2}
                  value={cancion}
                  onChange={(e) => setCancion(e.target.value)}
                />
              </div>
              {error && (
                <p className="text-red-500 text-xs italic text-center bg-red-50 p-2 rounded-lg">
                  {error}
                </p>
              )}
              <button
                onClick={enviar}
                disabled={loading}
                className={`mt-4 py-4 rounded-full text-xs uppercase tracking-[0.3em] font-bold transition-all duration-300 ${loading
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-black text-white hover:bg-[#B8860B] shadow-xl"
                  }`}
              >
                {loading ? "Enviando..." : "Confirmar Asistencia"}
              </button>
            </div>
          )}
        </motion.div>
        <p className="text-center mt-12 font-shelley text-[#B8860B] text-2xl">
          Nati & Maxi
        </p>
      </div>
    </section>
  );
};

export default RSVP;