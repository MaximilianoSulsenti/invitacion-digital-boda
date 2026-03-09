import { motion } from "framer-motion";
import { Calendar, Clock, MapPin } from "lucide-react";

const EventDetails = () => {
  return (
    <section className="relative w-full py-24 px-4 bg-[#FDFCF0] overflow-hidden">
      {/* Separador sutil decorativo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-[0.5px] bg-[#B8860B]/20" />

      <div className="relative max-w-5xl mx-auto">

        {/* --- Evento Iglesia --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-black mb-6">
            Ceremonia Religiosa
          </h2>
          <div className="flex justify-center items-center gap-4 text-[#B8860B]">
            <div className="w-10 h-[1px] bg-[#B8860B]/40" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium text-gray-500">
              Detalles del evento de Iglesia
            </span>
            <div className="w-10 h-[1px] bg-[#B8860B]/40" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-24">
          {/* Fecha Iglesia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center p-8 border border-[#B8860B]/10 rounded-2xl bg-white/5 hover:bg-white/20 transition-colors"
          >
            <div className="mb-6 text-[#B8860B] opacity-80">
              <Calendar size={32} strokeWidth={1.2} />
            </div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-black mb-3">Fecha</h3>
            <p className="text-lg font-serif italic text-gray-700">20 de Noviembre 2026</p>
          </motion.div>
          {/* Hora Iglesia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center p-8 border border-[#B8860B]/10 rounded-2xl bg-white/5 hover:bg-white/20 transition-colors"
          >
            <div className="mb-6 text-[#B8860B] opacity-80">
              <Clock size={32} strokeWidth={1.2} />
            </div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-black mb-3">Hora</h3>
            <p className="text-lg font-serif italic text-gray-700">20:30 hs</p>
          </motion.div>
          {/* Lugar Iglesia */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center p-8 border border-[#B8860B]/10 rounded-2xl bg-white/5 hover:bg-white/20 transition-colors"
          >
            <div className="mb-6 text-[#B8860B] opacity-80 text-4xl">
              ⛪
            </div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-black mb-3">Lugar</h3>
            <p className="text-lg font-serif italic text-gray-700">Iglesia Nuestra Señora del Perpetuo Socorro</p>
            <br />
            <p className="text-md font-serif italic text-gray-500">Av. Alberdi 580</p>
          </motion.div>
        </div>

        {/* --- Evento Principal --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-black mb-6">
            Fiesta En Salon
          </h2>
          <div className="flex justify-center items-center gap-4 text-[#B8860B]">
            <div className="w-10 h-[1px] bg-[#B8860B]/40" />
            <span className="text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium text-gray-500">
              Detalles del evento
            </span>
            <div className="w-10 h-[1px] bg-[#B8860B]/40" />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {/* Fecha */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center p-8 border border-[#B8860B]/10 rounded-2xl bg-white/5 hover:bg-white/20 transition-colors"
          >
            <div className="mb-6 text-[#B8860B] opacity-80">
              <Calendar size={32} strokeWidth={1.2} />
            </div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-black mb-3">Fecha</h3>
            <p className="text-lg font-serif italic text-gray-700">20 de Noviembre 2026</p>
          </motion.div>
          {/* Hora */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center p-8 border border-[#B8860B]/10 rounded-2xl bg-white/5 hover:bg-white/20 transition-colors"
          >
            <div className="mb-6 text-[#B8860B] opacity-80">
              <Clock size={32} strokeWidth={1.2} />
            </div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-black mb-3">Hora</h3>
            <p className="text-lg font-serif italic text-gray-700">21:30 hs</p>
          </motion.div>
          {/* Lugar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center p-8 border border-[#B8860B]/10 rounded-2xl bg-white/5 hover:bg-white/20 transition-colors"
          >
            <div className="mb-6 text-[#B8860B] opacity-80 text-4xl">
              🪩
            </div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-black mb-3">Lugar</h3>
            <p className="text-lg font-serif italic text-gray-700">Salón Altos del Rio</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;