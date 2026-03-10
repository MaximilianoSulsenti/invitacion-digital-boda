import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const fotosSalon = [
  "/img/salonrio.webp",
  "/img/salon1.jpeg",
  "/img/salon2.jpeg",
  "/img/salon3.jpeg",
  "/img/salon4.jpeg",

  // Agrega más rutas de imágenes aquí
];

const SalonCarousel = () => {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? fotosSalon.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === fotosSalon.length - 1 ? 0 : i + 1));

  // Autoplay cada 4 segundos
  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [index]); // Cambia a [] si quieres que no se reinicie al cambiar manualmente

  return (
    <section className="relative w-full py-20 px-4 bg-[#FDFCF0] overflow-hidden">
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
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[1px] bg-[#B8860B]/20" />
      <div className="max-w-2xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif text-black mb-2">El Salón</h2>
        <p className="font-shelley text-[#B8860B] text-2xl md:text-3xl mb-4">Un lugar para celebrar juntos</p>
        <div className="flex justify-center items-center gap-3 text-[#B8860B] mb-6">
          <div className="w-8 h-[0.5px] bg-[#B8860B]/40" />
          <span className="text-xs uppercase tracking-[0.3em] font-medium text-gray-500">Galería</span>
          <div className="w-8 h-[0.5px] bg-[#B8860B]/40" />
        </div>
      </div>
      <div className="relative max-w-2xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-xl border border-[#B8860B]/10 bg-white">
          <AnimatePresence initial={false} mode="wait">
            <motion.img
              key={fotosSalon[index]}
              src={fotosSalon[index]}
              alt={`Foto salón ${index + 1}`}
              className="w-full h-64 md:h-96 object-contain bg-[#FDFCF0] transition-all duration-500"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          {/* Flechas */}
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-[#FDFCF0]/80 hover:bg-[#B8860B]/80 text-[#B8860B] hover:text-white rounded-full p-2 shadow transition-all"
            aria-label="Anterior"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FDFCF0]/80 hover:bg-[#B8860B]/80 text-[#B8860B] hover:text-white rounded-full p-2 shadow transition-all"
            aria-label="Siguiente"
          >
            <ChevronRight size={24} />
          </button>
          {/* Indicadores */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {fotosSalon.map((_, i) => (
              <span
                key={i}
                className={`w-2 h-2 rounded-full ${i === index ? "bg-[#B8860B]" : "bg-[#B8860B]/30"} transition-all`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SalonCarousel;