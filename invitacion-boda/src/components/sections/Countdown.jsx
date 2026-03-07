import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const targetDate = new Date("2026-11-20T19:00:00");

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const diff = targetDate - now;

      if (diff <= 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full py-24 px-4 bg-[#FDFCF0] overflow-hidden">
      
      {/* Separador superior fino */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-[#B8860B]/20" />

      <div className="relative max-w-5xl mx-auto text-center">
        
        {/* Título Estilo Editorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-black mb-4 tracking-tight">
            Cuenta Regresiva
          </h2>
          <p className="text-gray-500 font-serif italic text-sm md:text-base">
            Cada segundo nos acerca a nuestro gran día
          </p>
        </motion.div>

        {/* Bloques del Contador */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8"
        >
          {[
            { label: "Días", value: timeLeft.days },
            { label: "Horas", value: timeLeft.hours },
            { label: "Minutos", value: timeLeft.minutes },
            { label: "Segundos", value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center bg-transparent border border-[#B8860B]/10 rounded-2xl p-6 md:p-8 transition-all hover:border-[#B8860B]/30"
            >
              {/* Números en Dorado */}
              <div className="text-5xl md:text-6xl font-light text-[#B8860B] mb-2 font-serif">
                {item.value ?? "00"}
              </div>
              
              {/* Etiquetas en Negro Minimalista */}
              <div className="uppercase tracking-[0.2em] text-[10px] md:text-xs text-black font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Frase final pequeña */}
        <p className="mt-16 text-[10px] md:text-xs uppercase tracking-[0.4em] text-[#B8860B]/60">
          Nati & Maxi
        </p>
      </div>
    </section>
  );
};

export default Countdown;