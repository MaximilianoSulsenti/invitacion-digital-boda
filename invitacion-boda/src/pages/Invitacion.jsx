import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Users, Heart, CheckCircle2 } from "lucide-react";

const Invitacion = () => {
  const { linkUnico } = useParams();
  const [invitado, setInvitado] = useState(null);
  const [asistentes, setAsistentes] = useState(1);
  const [loading, setLoading] = useState(true);
  const [confirmado, setConfirmado] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/invitados/link/${linkUnico}`);
        setInvitado(res.data);
        setAsistentes(Math.min(res.data.asistentes || 1, res.data.maxAsistentes || 1));
        setConfirmado(res.data.confirmado);
      } catch (e) {
        setInvitado(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [linkUnico]);

  const confirmar = async () => {
    try {
      setErrorMsg("");
      await api.post(`/invitados/confirmar/${linkUnico}`, { asistentes, mensaje });
      setConfirmado(true);
      setMostrarConfirmacion(false);
    } catch (error) {
      setErrorMsg(error.response?.data?.msg || "Ocurrió un error al confirmar");
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#FDFCF0] flex items-center justify-center">
      <div className="w-8 h-8 border-4 border-[#B8860B]/20 border-t-[#B8860B] rounded-full animate-spin" />
    </div>
  );

  if (!invitado) return (
    <div className="min-h-screen bg-[#FDFCF0] flex items-center justify-center p-6 text-center">
      <p className="font-serif italic text-gray-500">Lo sentimos, esta invitación no es válida o ha expirado.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FDFCF0] text-[#2D2D2D] font-sans selection:bg-[#B8860B]/10 overflow-x-hidden">

      {/* 🌿 CABECERA / HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="space-y-4"
        >
          <span className="text-[10px] uppercase tracking-[0.5em] text-[#B8860B] font-bold">Estás invitado</span>
          <h1 className="text-6xl md:text-8xl font-shelley text-black">Nati & Maxi</h1>
          <div className="h-px w-20 bg-[#B8860B]/30 mx-auto my-6" />
          <p className="font-serif italic text-lg text-gray-600">Nos encantaría que nos acompañes en nuestro gran día.</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="absolute bottom-10 animate-bounce"
        >
          <div className="w-px h-12 bg-[#B8860B]/40" />
        </motion.div>
      </section>

      {/* 📸 FOTO Y DETALLES */}
      <section className="max-w-2xl mx-auto px-6 py-20 space-y-16">
        <motion.div
          whileInView={{ opacity: 1, scale: 1 }}
          initial={{ opacity: 0, scale: 0.95 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <img src="/img/1.jpg" alt="Nati y Maxi" className="rounded-[2.5rem] shadow-2xl z-10 relative" />
          <div className="absolute -inset-4 border border-[#B8860B]/20 rounded-[3rem] -z-0 translate-x-2 translate-y-2" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-4 bg-white rounded-full shadow-sm text-[#B8860B]">
              <Calendar size={28} strokeWidth={1.2} />
            </div>
            <h3 className="font-serif text-xl">¿Cuándo?</h3>
            <p className="text-sm text-gray-500 leading-relaxed uppercase tracking-widest">
              20 de Noviembre, 2026<br />20:30 Horas
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-3">
            <div className="p-4 bg-white rounded-full shadow-sm text-[#B8860B]">
              <MapPin size={28} strokeWidth={1.2} />
            </div>
            <h3 className="font-serif text-xl">¿Dónde?</h3>
            <p className="text-sm text-gray-500 leading-relaxed uppercase tracking-widest">
              Salón Altos Del Rio<br />Rosario, Santa Fe
            </p>
          </div>
        </div>
      </section>

      {/* 💌 SECCIÓN DE ACCIÓN (CONFIRMACIÓN) */}
      <section className="bg-white rounded-t-[3rem] shadow-[0_-20px_50px_rgba(0,0,0,0.03)] py-20 px-6">
        <div className="max-w-md mx-auto text-center">

          <AnimatePresence mode="wait">
            {!confirmado ? (
              !mostrarConfirmacion ? (
                <motion.div key="pre-confirm" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <Heart className="mx-auto text-red-100 mb-6" size={48} fill="currentColor" />
                  <h2 className="text-3xl font-serif mb-8">¿Nos acompañas?</h2>
                  <button
                    onClick={() => setMostrarConfirmacion(true)}
                    className="w-full bg-black text-white py-5 rounded-2xl font-bold uppercase text-[10px] tracking-[0.3em] shadow-xl hover:bg-[#B8860B] transition-all"
                  >
                    Confirmar Asistencia
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-2xl font-serif">Hola {invitado.nombre}</h2>
                    <p className="text-sm text-gray-500 mt-2">Por favor, indicanos cuántos serán:</p>
                  </div>

                  <div className="flex flex-col items-center space-y-4">
                    <div className="flex items-center gap-6 bg-[#FDFCF0] p-2 rounded-2xl">
                      <button
                        onClick={() => setAsistentes(Math.max(1, asistentes - 1))}
                        className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-xl"
                      >-</button>
                      <span className="text-2xl font-serif w-8">{asistentes}</span>
                      <button
                        onClick={() => setAsistentes(Math.min(invitado.maxAsistentes, asistentes + 1))}
                        className="w-12 h-12 flex items-center justify-center bg-white rounded-xl shadow-sm text-xl"
                      >+</button>
                    </div>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                      Máximo permitido: {invitado.maxAsistentes} personas
                    </p>
                  </div>
                  
                  <div className="w-full">
                    <textarea
                      placeholder="Dejanos un mensaje o dedicatoria (opcional)..."
                      value={mensaje}
                      onChange={(e) => setMensaje(e.target.value)}
                      className="w-full bg-[#FDFCF0] border-none p-4 rounded-2xl text-sm font-serif italic focus:ring-1 focus:ring-[#B8860B]/20 outline-none resize-none"
                      rows="3"
                    />
                  </div>

                  {errorMsg && <p className="text-red-500 text-xs italic">{errorMsg}</p>}

                  <div className="space-y-3">
                    <button
                      onClick={confirmar}
                      className="w-full bg-black text-white py-5 rounded-2xl font-bold uppercase text-[10px] tracking-[0.3em] shadow-xl"
                    >
                      Confirmar Ahora
                    </button>
                    <button
                      onClick={() => setMostrarConfirmacion(false)}
                      className="text-xs text-gray-400 uppercase tracking-widest"
                    >
                      Volver
                    </button>
                  </div>
                </motion.div>
              )
            ) : (
              <motion.div
                key="success"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-10"
              >
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-serif mb-2">¡Genial!</h2>
                <p className="text-gray-500 font-serif italic">Tu asistencia ha sido confirmada.<br />¡Nos vemos pronto!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <footer className="py-12 text-center">
        <p className="text-[10px] uppercase tracking-[0.4em] text-gray-300 font-bold">Nati & Maxi • 2026</p>
      </footer>
    </div>
  );
};

export default Invitacion;