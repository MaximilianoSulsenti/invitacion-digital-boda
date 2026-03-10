import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative w-full py-20 bg-[#FDFCF0] overflow-hidden text-center">
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

      {/* Línea divisoria minimalista */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <div className="w-12 h-[0.5px] bg-[#B8860B]/30"></div>
        <div className="w-1 h-1 bg-[#B8860B]/40 rounded-full"></div>
        <div className="w-12 h-[0.5px] bg-[#B8860B]/30"></div>
      </div>

      <div className="relative z-10 px-4">
        
        {/* Frase de cierre */}
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="text-gray-400 font-serif italic text-sm md:text-base mb-6 tracking-wide"
        >
          No es solo un día, es el comienzo de nuestra vida juntos.
        </motion.p>

        {/* Nombres en Shelley Script */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-shelley text-[#B8860B] text-5xl md:text-7xl mb-8"
        >
          Nati & Maxi
        </motion.h2>

        {/* Hashtag o Fecha final (opcional) */}
        <div className="space-y-2">
          <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-black/60">
            20 . 11 . 2026
          </p>
          <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 mt-4">
            Hecho con amor • Rosario, Argentina
          </p>
        </div>

      </div>

      {/* Decoración de fondo sutil */}
      <div className="absolute inset-0 flex justify-center items-center opacity-[0.03] pointer-events-none">
        <span className="text-[20vw] font-serif select-none">N&M</span>
      </div>

    </footer>
  );
};

export default Footer;