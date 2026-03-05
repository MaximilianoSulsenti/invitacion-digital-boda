import { motion } from "framer-motion";
import { MapPin, Navigation } from "lucide-react";

const Location = () => {
  const direccion = "Salón de Eventos Los Altos Del Rio, Rosario, Santa Fe";
  const mapsUrl = "https://www.google.com/maps/search/?api=1&query=Salón+de+Eventos+Los+Altos+Del+Rio+Rosario+Santa+Fe";

  return (
    <section className="relative w-full py-28 px-4 bg-gradient-to-b from-rose-50 to-white overflow-hidden">

      {/* Blur decor */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-rose-300/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto">

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-rose-700 mb-4">
            Ubicación del evento
          </h2>

          <div className="flex justify-center items-center gap-2 text-rose-400">
            <MapPin size={18} />
            <span className="text-sm uppercase tracking-widest">Cómo llegar</span>
          </div>
        </motion.div>

        {/* Card principal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-8 backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl shadow-xl overflow-hidden"
        >

          {/* Mapa */}
          <div className="w-full h-[350px], md:h-full">
            <iframe
              title="Mapa evento"
              src="https://www.google.com/maps?q=Salón+de+Eventos+Los+Altos+Del+Rio+Rosario+Santa+Fe&output=embed" 
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Info */}
          <div className="p-8 flex flex-col justify-center gap-6">

            <div>
              <h3 className="text-2xl font-semibold text-rose-700 mb-2">
                Lugar del evento
              </h3>
              <p className="text-gray-600">
                {direccion}
              </p>
            </div>

            <div className="flex gap-4 flex-col sm:flex-row">
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-rose-600 text-white px-6 py-4 rounded-xl font-semibold shadow-lg hover:bg-rose-700 transition"
              >
                <Navigation size={18} />
                Abrir en Google Maps
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 border border-rose-300 text-rose-700 px-6 py-4 rounded-xl font-semibold hover:bg-rose-50 transition"
              >
                <MapPin size={18} />
                Ver ubicación
              </motion.a>
            </div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Location;