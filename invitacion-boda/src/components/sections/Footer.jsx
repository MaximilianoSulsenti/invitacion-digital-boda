import { motion } from "framer-motion";
import { QrCode, Share2, Heart } from "lucide-react";

const Footer = () => {
  return (
    <section className="relative w-full py-24 px-4 bg-gradient-to-b from-rose-50 to-white overflow-hidden">

      {/* decor blur */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-rose-300/30 rounded-full blur-3xl" />

      <div className="relative max-w-5xl mx-auto text-center">

        {/* frase final */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-rose-700 mb-4">
            Gracias por ser parte de nuestra historia
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Cada persona que nos acompaña forma parte de este momento único.
            Nos sentimos profundamente agradecidos de compartirlo con vos 🤍
          </p>
        </motion.div>

        {/* acciones */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-center gap-6 mb-16"
        >
          {/* QR */}
          <div className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-lg px-8 py-6 flex items-center gap-3">
            <QrCode className="text-rose-600" />
            <span className="text-sm text-gray-600">Escaneá para compartir</span>
          </div>

          {/* compartir */}
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: "Invitación de boda",
                  text: "Te invitamos a nuestra boda 💍",
                  url: window.location.href,
                });
              } else {
                navigator.clipboard.writeText(window.location.href);
                alert("Link copiado ✨");
              }
            }}
            className="backdrop-blur-xl bg-white/70 border border-white/40 rounded-2xl shadow-lg px-8 py-6 flex items-center gap-3 hover:scale-105 transition"
          >
            <Share2 className="text-rose-600" />
            <span className="text-sm text-gray-600">Compartir invitación</span>
          </button>
        </motion.div>

        {/* firma */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="flex justify-center items-center gap-2 text-rose-600 mb-2">
            <Heart className="w-4 h-4" />
            <span className="text-sm">Nati y Maxi</span>
            <Heart className="w-4 h-4" />
          </div>

          <p className="text-xs text-gray-400">
            Invitación digital · Diseño premium · Experiencia interactiva
          </p>

          <p className="text-[10px] text-gray-300 mt-2">
            Hecho con amor 💕
          </p>
        </motion.div>

      </div>
    </section>
  );
};

export default Footer;