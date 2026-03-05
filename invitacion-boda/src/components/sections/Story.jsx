import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const storyData = [
  {
    year: "2018",
    title: "Nos conocimos",
    text: "Dos caminos distintos que se cruzaron sin saber que ese encuentro cambiaría todo.",
  },
  {
    year: "2020",
    title: "Nos elegimos",
    text: "Entre risas, sueños y desafíos, entendimos que queríamos caminar juntos.",
  },
  {
    year: "2023",
    title: "El compromiso",
    text: "Una promesa, un sí, y una historia que empieza una nueva etapa.",
  },
  {
    year: "2026",
    title: "Nuestro gran día",
    text: "El comienzo de una vida juntos, con amor, familia y sueños compartidos.",
  },
];

const Story = () => {
  return (
    <section className="relative w-full py-28 px-4 bg-gradient-to-b from-white to-rose-50 overflow-hidden">

      {/* Decoración */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-rose-300/30 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto">

        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-rose-700 mb-4">
            Nuestra Historia
          </h2>
          <div className="flex justify-center items-center gap-3 text-rose-400">
            <Heart size={18} />
            <span className="text-sm uppercase tracking-widest">Una historia de amor</span>
            <Heart size={18} />
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l border-rose-200 ml-4 md:ml-0 md:pl-8 space-y-16">

          {storyData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative pl-8"
            >
              {/* Punto */}
              <div className="absolute -left-[9px] top-2 w-4 h-4 bg-rose-500 rounded-full shadow-lg" />

              {/* Card */}
              <div className="backdrop-blur-xl bg-white/60 border border-white/40 rounded-3xl p-6 shadow-xl">
                <span className="text-sm text-rose-400 font-semibold">
                  {item.year}
                </span>
                <h3 className="text-xl font-semibold text-rose-700 mt-1 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default Story;