import { motion } from "framer-motion";

const storyData = [
  {
    year: "2016",
    title: "El comienzo de todo",
    text: "Despues de varios años de amistad, nos dimos cuenta de que estábamos destinados a estar juntos.",
  },
  {
    year: "2017",
    title: "Nos elegimos",
    text: "Entre risas, sueños y desafíos decidimos convivir juntos.",
  },
  {
    year: "2020",
    title: "El gran Desafio",
    text: "En medio del caos , recibimos un regalo de dios, nuestro hermoso Angel.",
  },
  {
    year: "2023",
    title: "La Resiliencia",
    text: "Aprendimos que amar no es solo celebrar los momentos lindos sino sostenernos en las tormentas, abrazarnos en la incertidumbre, y cada dia elegimos seguir adelante juntos.",
  },
  {
    year: "2026",
    title: "Nuestra Gran Dia",
    text: "Unidos por una promesa y un destino común, celebrando el comienzo de nuestra vida juntos y el inicio de esta nueva etapa. Nada nos hace más felices que empezar este viaje junto a las personas que más queremos.",
  },
];

const Story = () => {
  return (
    <section className="relative w-full py-24 px-6 bg-[#FDFCF0] overflow-hidden">
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