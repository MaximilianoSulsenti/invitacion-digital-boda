import { motion } from "framer-motion";
import { Gift, CreditCard, QrCode, Shirt, Info as InfoIcon } from "lucide-react";

const Info = () => {
  const alias = "boda.ana.y.lucas";
  const cbu = "0000003100000000000000";

  return (
    <section className="relative w-full py-28 px-4 bg-gradient-to-b from-white to-rose-50 overflow-hidden">

      {/* decor blur */}
      <div className="absolute top-10 left-0 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-0 w-72 h-72 bg-rose-300/30 rounded-full blur-3xl" />

      <div className="relative max-w-6xl mx-auto">

        {/* título */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-rose-700 mb-4">
            Información importante
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Todo lo que necesitás saber para acompañarnos en nuestro día
          </p>
        </motion.div>

        {/* grid cards */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Regalos */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-3xl shadow-xl p-8 flex flex-col gap-5"
          >
            <div className="flex items-center gap-3 text-rose-600">
              <Gift />
              <h3 className="text-xl font-semibold">Regalos</h3>
            </div>

            <p className="text-gray-600 text-sm">
              Tu presencia es nuestro mejor regalo 💕  
              Si deseás colaborar, podés hacerlo por transferencia:
            </p>

            <div className="bg-white/60 rounded-xl p-4 text-sm border">
              <p><span className="font-semibold">Alias:</span> {alias}</p>
              <p><span className="font-semibold">CBU:</span> {cbu}</p>
            </div>
          </motion.div>

          {/* Dress Code */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-3xl shadow-xl p-8 flex flex-col gap-5"
          >
            <div className="flex items-center gap-3 text-rose-600">
              <Shirt />
              <h3 className="text-xl font-semibold">Dress Code</h3>
            </div>

            <p className="text-gray-600 text-sm">
              Elegante · Formal  
              Colores suaves y tonos neutros ✨
            </p>

            <div className="flex gap-2 mt-2">
              <span className="w-6 h-6 rounded-full bg-rose-300" />
              <span className="w-6 h-6 rounded-full bg-pink-200" />
              <span className="w-6 h-6 rounded-full bg-neutral-300" />
              <span className="w-6 h-6 rounded-full bg-amber-100" />
            </div>
          </motion.div>

          {/* Info útil */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
            className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-3xl shadow-xl p-8 flex flex-col gap-5"
          >
            <div className="flex items-center gap-3 text-rose-600">
              <InfoIcon />
              <h3 className="text-xl font-semibold">Información útil</h3>
            </div>

            <ul className="text-sm text-gray-600 space-y-2">
              <li>🕒 Llegar 15 min antes del inicio</li>
              <li>📸 Habrá fotógrafo profesional</li>
              <li>👶 Evento familiar</li>
              <li>🚗 Estacionamiento disponible</li>
            </ul>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Info;