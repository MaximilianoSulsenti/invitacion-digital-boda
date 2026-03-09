import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectCoverflow } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const images = [
  "/img/anopasado.jpeg",
  "/img/momentos.jpeg",
  "/img/foto2016.jpeg",
  "/img/del2020.jpeg",
  "/img/inolvidable2021.jpeg",
  "/img/mardel.jpeg",
  "/img/centralito.jpeg",
  "/img/masviajes.jpeg",
  "/img/mendoza.jpeg",
];

const Gallery = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="relative w-full py-24 px-4 bg-[#FDFCF0] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-[#B8860B]/20" />

      <div className="relative max-w-6xl mx-auto">
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-black mb-4">
            Nuestros Momentos
          </h2>
          <p className="font-shelley text-[#B8860B] text-3xl md:text-4xl">
            Recuerdos de nuestra historia
          </p>
        </motion.div>

        {/* MÓVIL: Carrusel (Se muestra solo en pantallas pequeñas) */}
        <div className="block md:hidden">
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="w-full pb-12"
          >
            {images.map((src, i) => (
              <SwiperSlide key={i} className="w-[280px]">
                <div 
                  className="aspect-[4/5] bg-white p-2 rounded-2xl border border-[#B8860B]/20 shadow-lg"
                  onClick={() => setSelected(src)}
                >
                  <img
                    src={src}
                    alt=""
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* PC: Grilla (Se muestra solo de tablets en adelante) */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -5 }}
              onClick={() => setSelected(src)}
              className="relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer bg-white p-2 border border-[#B8860B]/10 group"
            >
              <div className="w-full h-full overflow-hidden rounded-xl">
                <img
                  src={src}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-[#B8860B]/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox - Igual que antes */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-4xl w-full flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={() => setSelected(null)} className="absolute -top-12 right-0 text-white/70">
                <X size={32} />
              </button>
              <img src={selected} className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl" alt="" />
              <p className="mt-6 font-shelley text-[#B8860B] text-3xl">Nati & Maxi</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Gallery;