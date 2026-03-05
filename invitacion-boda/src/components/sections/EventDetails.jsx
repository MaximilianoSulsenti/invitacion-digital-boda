import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Heart } from "lucide-react";

const EventDetails = () => {
  return (
    <section className="relative w-full py-24 px-4 bg-gradient-to- from-white to-rose-50 overflow-hidden">
      
      {/* Decoración fondo */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-rose-300/30 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto">
        
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-rose-700 mb-4">
            Nuestro Gran Día
          </h2>
          <div className="flex justify-center items-center gap-3 text-rose-400">
            <Heart size={18} />
            <span className="text-sm uppercase tracking-widest">Detalles del evento</span>
            <Heart size={18} />
          </div>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Fecha */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl p-8 shadow-xl text-center"
          >
            <div className="flex justify-center mb-4 text-rose-500">
              <Calendar size={36} />
            </div>
            <h3 className="text-xl font-semibold text-rose-700 mb-2">Fecha</h3>
            <p className="text-gray-600">14 de Febrero 2026</p>
          </motion.div>

          {/* Hora */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl p-8 shadow-xl text-center"
          >
            <div className="flex justify-center mb-4 text-rose-500">
              <Clock size={36} />
            </div>
            <h3 className="text-xl font-semibold text-rose-700 mb-2">Hora</h3>
            <p className="text-gray-600">19:00 hs</p>
          </motion.div>

          {/* Lugar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl p-8 shadow-xl text-center"
          >
            <div className="flex justify-center mb-4 text-rose-500">
              <MapPin size={36} />
            </div>
            <h3 className="text-xl font-semibold text-rose-700 mb-2">Lugar</h3>
            <p className="text-gray-600">Salón Bella Vista</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default EventDetails;