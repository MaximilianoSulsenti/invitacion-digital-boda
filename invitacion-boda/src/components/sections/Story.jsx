import { motion } from "framer-motion";

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
    <section className="relative w-full py-24 px-6 bg-[#FDFCF0] overflow-hidden">
      
      {/* Separador superior sutil */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-[#B8860B]/20" />

      <div className="relative max-w-3xl mx-auto">
        
        {/* Título */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-black mb-4">
            Nuestra Historia
          </h2>
          <p className="font-shelley text-[#B8860B] text-3xl md:text-4xl">
            Un camino de amor
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative border-l-[0.5px] border-[#B8860B]/30 ml-2 md:mx-auto md:left-0 md:right-0">
          
          {storyData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative pl-10 mb-16 last:mb-0"
            >
              {/* Punto Dorado Estilizado */}
              <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 bg-[#FDFCF0] border border-[#B8860B] rounded-full z-10" />
              
              {/* Contenido */}
              <div className="flex flex-col">
                <span className="text-[#B8860B] font-serif italic text-lg mb-1">
                  {item.year}
                </span>
                <h3 className="text-xl font-medium text-black mb-3 tracking-wide uppercase text-[13px] md:text-sm">
                  {item.title}
                </h3>
                <p className="text-gray-600 font-serif leading-relaxed text-sm md:text-base max-w-lg italic">
                  "{item.text}"
                </p>
              </div>
            </motion.div>
          ))}

        </div>

        {/* Decoración Final */}
        <div className="text-center mt-20 opacity-30">
          <div className="inline-block w-1 h-1 bg-[#B8860B] rounded-full mx-1"></div>
          <div className="inline-block w-1 h-1 bg-[#B8860B] rounded-full mx-1"></div>
          <div className="inline-block w-1 h-1 bg-[#B8860B] rounded-full mx-1"></div>
        </div>

      </div>
    </section>
  );
};

export default Story;