import { motion } from "framer-motion";
import { Gift, Shirt, Info as InfoIcon } from "lucide-react";

const Info = () => {
  const alias = ""; // Actualizado
  const cbu = "";

  return (
    <section className="relative w-full py-24 px-4 bg-[#FDFCF0] overflow-hidden">

      {/* Separador superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[1px] bg-[#B8860B]/20" />

      <div className="relative max-w-6xl mx-auto">

        {/* Título Estilo Editorial */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-black mb-4">
            Información Útil
          </h2>
          <p className="font-shelley text-[#B8860B] text-3xl md:text-4xl">
            Detalles para nuestros invitados
          </p>
        </motion.div>

        {/* Grid de Tarjetas */}
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">

          {/* Regalos / Transferencia */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="group p-8 rounded-3xl border border-[#B8860B]/10 bg-white/40 hover:bg-white transition-all duration-500 text-center"
          >
            <div className="flex justify-center mb-6 text-[#B8860B]">
              <Gift size={32} strokeWidth={1.2} />
            </div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-black mb-4">Regalos</h3>
            <p className="text-gray-500 font-serif italic text-sm leading-relaxed mb-6">
              Nuestro mejor regalo es que nos acompañes en este dia tan especial, pero si queres ayudarnos a comenzar esta nueva etapa podes colaborar a traves del siguiente alias:
            </p>
            <div className="bg-[#FDFCF0] border border-[#B8860B]/10 rounded-2xl p-4 text-[11px] md:text-xs tracking-widest text-black flex flex-col gap-2">
              <p><span className="text-[#B8860B] font-bold">Lo Compartiremos el dia de la boda</span> {alias}</p>
            </div>
          </motion.div>

          {/* Dress Code */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="group p-8 rounded-3xl border border-[#B8860B]/10 bg-white/40 hover:bg-white transition-all duration-500 text-center"
          >
            <div className="flex justify-center mb-6 text-[#B8860B]">
              <Shirt size={32} strokeWidth={1.2} />
            </div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-black mb-4">Dress Code</h3>
            <p className="text-gray-500 font-serif italic text-sm leading-relaxed mb-6">
              Elegante formal.<br />
              ¡Vení como más te guste dentro de este estilo!
            </p>
          </motion.div>

          {/* Tips Adicionales */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="group p-8 rounded-3xl border border-[#B8860B]/10 bg-white/40 hover:bg-white transition-all duration-500 text-center"
          >
            <div className="flex justify-center mb-6 text-[#B8860B]">
              <InfoIcon size={32} strokeWidth={1.2} />
            </div>
            <h3 className="text-xs uppercase tracking-[0.2em] font-bold text-black mb-4">Tips Importantes</h3>
            <ul className="text-gray-500 font-serif italic text-sm space-y-3">
              <li>Confirmar asistencia antes del 10 de octubre</li>
              <li>Llegar 15 min antes del inicio</li>
              <li>Habrá fotógrafo profesional</li>
              <li>Evento exclusivo para adultos</li>
              <li>Estacionamiento privado</li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Info;