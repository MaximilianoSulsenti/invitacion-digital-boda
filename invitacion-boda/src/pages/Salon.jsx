import { useEffect, useState } from "react";
import api from "../services/api";
import io from "socket.io-client";

const socket = io(`${import.meta.env.VITE_API_URL}`); // 🔥 usar API_URL

const Salon = () => {
  const [fotos, setFotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const [config, setConfig] = useState({
    pausa: false,
    velocidad: 5000,
    texto: "💍 Boda Maxi & Nati",
    mostrarQR: true,
    modoFiesta: false,
  });

  // 🔌 Carga inicial + sockets
  useEffect(() => {
    cargar();

    socket.on("salon-config", (nuevaConfig) => {
      setConfig(nuevaConfig);
    });

    socket.on("nueva-foto", (foto) => {
      setFotos((prev) => [foto, ...prev]);
    });

    socket.on("eliminar-foto", (id) => {
      setFotos((prev) => prev.filter((f) => f._id !== id));
    });

    return () => {
      socket.off("salon-config");
      socket.off("nueva-foto");
      socket.off("eliminar-foto");
    };
  }, []);

  // 🎬 Slideshow con crossfade
  useEffect(() => {
    const interval = setInterval(() => {
      if (!config.pausa && fotos.length > 1) {
        const nuevoIndex = (currentIndex + 1) % fotos.length;
        setNextIndex(nuevoIndex);
        setFade(true);

        setTimeout(() => {
          setCurrentIndex(nuevoIndex);
          setFade(false);
        }, 700); // duración del fade
      }
    }, config.velocidad);

    return () => clearInterval(interval);
  }, [currentIndex, config.pausa, config.velocidad, fotos.length]);

  const cargar = async () => {
    try {
      const res = await api.get("/fotos");
      setFotos(res.data.reverse());
    } catch (error) {
      console.error("Error cargando fotos:", error);
    }
  };

  if (fotos.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white text-3xl">
        Esperando fotos 📸
      </div>
    );
  }

  return (
    <div
      className={`h-screen w-screen flex items-center justify-center relative overflow-hidden transition-all duration-500 ${config.modoFiesta
        ? "bg-gradient-to-r from-pink-600 via-purple-700 to-indigo-800 animate-pulse"
        : "bg-black"
        }`}
    >

      {/* 🎵 Música */}
      <audio autoPlay loop>
        <source src="/musica.mp3" type="audio/mpeg" />
      </audio>

      {/* Imagen actual */}
      <img
        src={fotos[currentIndex].url}
        className={`absolute max-h-screen max-w-full object-contain transition-all duration-700 ${fade ? "opacity-0 scale-95" : "opacity-100 scale-100"
          } ${config.modoFiesta ? "animate-bounce" : ""}`}
        alt="Foto actual"
      />

      {/* Imagen siguiente */}
      {fotos[nextIndex] && (
        <img
          src={fotos[nextIndex].url}
          className={`absolute max-h-screen max-w-full object-contain transition-all duration-700 ${fade ? "opacity-0 scale-95" : "opacity-100 scale-100"
            } ${config.modoFiesta ? "animate-bounce" : ""}`}
          alt="Foto siguiente"
        />
      )}

      {/* Texto */}
      <div className="absolute bottom-10 text-white text-xl bg-black/50 px-6 py-3 rounded-xl">
        {config.texto}
      </div>

      {/* QR */}
      {config.mostrarQR && (
        <div className="absolute top-6 right-6 bg-white p-3 rounded">
          <img
            src="/qr-galeria.png"
            alt="QR galería"
            className="w-28 h-28"
          />
          <p className="text-black text-xs text-center mt-1">
            Subí tu foto
          </p>
        </div>
      )}
    </div>
  );
};

export default Salon;