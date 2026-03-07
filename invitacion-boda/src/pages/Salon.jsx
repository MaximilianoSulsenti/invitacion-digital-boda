import { useEffect, useState } from "react";
import api from "../services/api";
import io from "socket.io-client";
import { QRCodeCanvas } from "qrcode.react";
import { motion, AnimatePresence } from "framer-motion";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ["websocket"]
});

const optimizar = (url) => {
  if (!url) return "";
  return url.replace("/upload/", "/upload/f_auto,q_auto,w_1920/");
};

const Salon = () => {
  const [fotos, setFotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [floating, setFloating] = useState([]);
  const [destacada, setDestacada] = useState(null);
  const [config, setConfig] = useState({
    pausa: false,
    velocidad: 5000,
    texto: "💍 Nati & Maxi",
    mostrarQR: true,
    modoFiesta: false,
  });

  useEffect(() => {
    cargar();

    socket.on("salon-config", (nuevaConfig) => setConfig(nuevaConfig));
    
    socket.on("nueva-foto", (foto) => {
      setFotos((prev) => [foto, ...prev].slice(0, 100));
      setDestacada(foto);
      setTimeout(() => setDestacada(null), 5000);
      
      // Efecto de miniatura cayendo
      const idFly = Math.random();
      setFloating((prev) => [...prev, { ...foto, flyId: idFly }]);
      setTimeout(() => {
        setFloating((prev) => prev.filter((f) => f.flyId !== idFly));
      }, 8000);
    });

    socket.on("eliminar-foto", (id) => {
      setFotos((prev) => prev.filter((f) => f._id !== id));
    });

    return () => socket.off();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!config.pausa && fotos.length > 0) {
        setCurrentIndex((prev) => (prev + 1) % fotos.length);
      }
    }, config.velocidad);
    return () => clearInterval(interval);
  }, [config.pausa, config.velocidad, fotos.length]);

  const cargar = async () => {
    try {
      const res = await api.get("/fotos");
      setFotos(res.data.reverse().slice(0, 100));
    } catch (e) { console.error(e); }
  };

  if (fotos.length === 0) {
    return (
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <motion.p 
          animate={{ opacity: [0.4, 1, 0.4] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="text-white font-serif italic text-4xl"
        >
          Esperando los primeros momentos... 📸
        </motion.p>
      </div>
    );
  }

  return (
    <div className={`h-screen w-screen relative overflow-hidden transition-colors duration-1000 ${
      config.modoFiesta ? "bg-indigo-950" : "bg-black"
    }`}>
      
      {/* ⚡️ MODO FIESTA: Luces de fondo */}
      {config.modoFiesta && (
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/40 via-transparent to-pink-900/40 animate-pulse" />
          <div className="absolute top-0 left-0 w-full h-full opacity-30 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        </div>
      )}

      {/* 🖼 SLIDESHOW PRINCIPAL */}
      <AnimatePresence mode="wait">
        <motion.img
          key={fotos[currentIndex]?._id}
          src={optimizar(fotos[currentIndex]?.url)}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="absolute inset-0 w-full h-full object-contain z-10 p-4 md:p-12"
          alt="Boda"
        />
      </AnimatePresence>

      {/* 🎈 FOTOS FLOTANTES (Recién subidas) */}
      {floating.map((f, i) => (
        <motion.img
          key={f.flyId}
          initial={{ y: -200, x: `${20 + (i * 15)}%`, rotate: -20, opacity: 0 }}
          animate={{ y: 1200, rotate: 20, opacity: 1 }}
          transition={{ duration: 8, ease: "linear" }}
          src={optimizar(f.url)}
          className="absolute w-40 h-40 object-cover rounded-2xl shadow-2xl border-4 border-white z-20"
        />
      ))}

      {/* ⭐ FOTO DESTACADA (Pop-up cuando alguien sube una) */}
      <AnimatePresence>
        {destacada && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.2 }}
            className="absolute inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          >
            <div className="relative p-3 bg-white rounded-[2rem] shadow-[0_0_100px_rgba(255,255,255,0.2)]">
              <img 
                src={optimizar(destacada.url)} 
                className="max-h-[80vh] rounded-[1.5rem] shadow-2xl"
              />
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#B8860B] text-white px-8 py-2 rounded-full font-bold uppercase tracking-widest text-sm whitespace-nowrap">
                ¡Nueva foto recién subida!
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 📋 INTERFAZ: QR Y TEXTO */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-6">
        <motion.div 
          initial={{ y: 50, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          className="bg-black/40 backdrop-blur-md border border-white/10 px-10 py-4 rounded-full"
        >
          <h2 className="text-white text-3xl font-serif tracking-wide italic">
            {config.texto}
          </h2>
        </motion.div>
      </div>

      {config.mostrarQR && (
        <motion.div 
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="absolute top-10 right-10 z-50 bg-white p-6 rounded-[2.5rem] shadow-2xl flex flex-col items-center gap-3 border-4 border-[#B8860B]/20"
        >
          <QRCodeCanvas
            value={`${import.meta.env.VITE_FRONTEND_URL}/fotos`}
            size={140}
            className="rounded-lg"
          />
          <div className="text-center">
            <p className="text-black font-bold text-[10px] uppercase tracking-tighter">Subí tu foto a la pantalla</p>
            <p className="text-[#B8860B] font-serif italic text-sm">Escaneá el código</p>
          </div>
        </motion.div>
      )}

      {/* Estilo para la animación de bounce suave en modo fiesta */}
      <style>{`
        @keyframes slow-bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-slow-bounce {
          animation: slow-bounce 3s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default Salon;