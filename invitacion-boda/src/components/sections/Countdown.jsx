import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const targetDate = new Date("2026-11-20T19:00:00"); // fecha boda

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
    <section className="relative w-full py-28 px-4 bg-gradient-to-b from-rose-50 to-white overflow-hidden">

      {/* Decoraciones */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-rose-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto text-center">

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-rose-700 mb-4">
            Falta muy poco
          </h2>
          <p className="text-gray-500">
            Cada segundo nos acerca a nuestro gran día
          </p>
        </motion.div>

        {/* Contador */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Días", value: timeLeft.days },
            { label: "Horas", value: timeLeft.hours },
            { label: "Minutos", value: timeLeft.minutes },
            { label: "Segundos", value: timeLeft.seconds },
          ].map((item, index) => (
            <div
              key={index}
              className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl p-6 shadow-xl"
            >
              <div className="text-4xl md:text-5xl font-bold text-rose-600 mb-2">
                {item.value ?? "00"}
              </div>
              <div className="uppercase tracking-widest text-sm text-gray-500">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Countdown;