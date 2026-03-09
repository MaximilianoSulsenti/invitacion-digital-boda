import { motion } from "framer-motion";
import { Navigation } from "lucide-react";

const Location = () => {
  // Datos de cada lugar
  const lugares = [
    {
      nombre: "Iglesia Nuestra Señora del Perpetuo Socorro",
      direccion: "Av. Alberdi 580, Rosario, Santa Fe",
      mapsUrl: "https://maps.google.com/?q=Iglesia+Nuestra+Señora+del+Perpetuo+Socorro+Rosario",
      iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.3300801655682!2d-60.683113877984205!3d-32.9210569619658!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b6535a28c7b13d%3A0x19f2e0ae7583ede1!2sParroquia%20Nuestra%20Se%C3%B1ora%20del%20Perpetuo%20Socorro!5e0!3m2!1ses-419!2sar!4v1773019376495!5m2!1ses-419!2sar",
      // Pega aquí el embed real de la iglesia
      icono: "⛪",
    },
    {
      nombre: "Salón Los Altos Del Rio",
      direccion: "Salón de Eventos Los Altos Del Rio, Rosario, Santa Fe",
      mapsUrl: "https://maps.google.com/?q=Los+Altos+Del+Rio+Rosario",
      iframe: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3348.123456789!2d-60.63!3d-32.94!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzLCsDU2JzM0LjAiUyA2MMKwMzcnNDguMCJX!5e0!3m2!1ses!2sar!4v123456789" ,
      // Pega aquí el embed real del salón
      icono: "🪩",
    }
  ];

  return (
    <section className="relative w-full py-24 px-4 bg-[#FDFCF0] overflow-hidden">
      {/* Separador superior sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-[#B8860B]/20" />

      <div className="relative max-w-5xl mx-auto">

        {/* Título Estilo Editorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-black mb-4">
            Ubicación
          </h2>
          <div className="flex justify-center items-center gap-3 text-[#B8860B]">
            <div className="w-8 h-[0.5px] bg-[#B8860B]/40" />
            <span className="font-shelley text-3xl md:text-4xl">Cómo llegar</span>
            <div className="w-8 h-[0.5px] bg-[#B8860B]/40" />
          </div>
        </motion.div>

        {/* Contenedor Principal Responsive */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-2 gap-0 bg-white border border-[#B8860B]/10 rounded-3xl shadow-[0_10px_50px_rgba(184,134,11,0.05)] overflow-hidden"
        >
          {lugares.map((lugar, idx) => (
            <div key={lugar.nombre} className="flex flex-col">
              {/* Mapa */}
              <div className="w-full h-[300px] md:h-[450px] bg-[#F9F7E8]">
                <iframe
                  title={`Mapa ${lugar.nombre}`}
                  src={lugar.iframe}
                  className="w-full h-full grayscale-[0.3] contrast-[1.1]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              {/* Información */}
              <div className="p-8 md:p-12 flex flex-col justify-center items-center text-center">
                <div className="mb-8">
                  <div className="text-[#B8860B] mx-auto mb-4 text-4xl">{lugar.icono}</div>
                  <h3 className="text-xl font-serif text-black mb-4 uppercase tracking-widest">
                    {lugar.nombre}
                  </h3>
                  <p className="text-gray-500 font-serif italic leading-relaxed">
                    {lugar.direccion}
                  </p>
                </div>
                <div className="w-full flex flex-col gap-4">
                  <motion.a
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    href={lugar.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-full text-[10px] uppercase tracking-[0.3em] font-bold shadow-xl hover:bg-[#B8860B] transition-all duration-300"
                  >
                    <Navigation size={14} />
                    Abrir GPS
                  </motion.a>
                  <p className="text-[10px] text-gray-400 uppercase tracking-[0.2em] mt-4">
                    Rosario, Santa Fe
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Decoración Final de Sección */}
        <div className="flex justify-center mt-16 opacity-20">
          <div className="w-[1px] h-10 bg-gradient-to-b from-[#B8860B] to-transparent"></div>
        </div>
      </div>
    </section>
  );
};

export default Location;