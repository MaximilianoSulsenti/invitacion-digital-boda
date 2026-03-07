import { useEffect, useState } from "react";
import api from "../services/api";
import io from "socket.io-client";
import { QRCodeCanvas } from "qrcode.react";

const socket = io(import.meta.env.VITE_SOCKET_URL, {
  transports: ["websocket"]
});

const optimizar = (url) => {
  return url.replace(
    "/upload/",
    "/upload/f_auto,q_auto,w_1600/"
  );
};


const Salon = () => {
  const [fotos, setFotos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [floating, setFloating] = useState([]);
  const [destacada, setDestacada] = useState(null);

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

    const handleConfig = (nuevaConfig) => {
      setConfig(nuevaConfig);
    };

    const handleNuevaFoto = (foto) => {

      setFotos((prev) => [foto, ...prev].slice(0, 100));

      // foto destacada
      setDestacada(foto);

      setTimeout(() => {
        setDestacada(null);
      }, 4000);

      // foto cayendo
      setFloating((prev) => [...prev, foto]);

      setTimeout(() => {
        setFloating((prev) => prev.filter((f) => f._id !== foto._id));
      }, 6000);

    };

    const handleEliminarFoto = (id) => {
      setFotos((prev) => prev.filter((f) => f._id !== id));
    };

    socket.on("salon-config", handleConfig);
    socket.on("nueva-foto", handleNuevaFoto);
    socket.on("eliminar-foto", handleEliminarFoto);

    return () => {
      socket.off("salon-config", handleConfig);
      socket.off("nueva-foto", handleNuevaFoto);
      socket.off("eliminar-foto", handleEliminarFoto);
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

  useEffect(() => {
    if (currentIndex >= fotos.length) {
      setCurrentIndex(0);
    }
  }, [fotos]);

  const cargar = async () => {
    try {
      const res = await api.get("/fotos");
      setFotos(res.data.reverse().slice(0, 100));
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
        src={optimizar(fotos[currentIndex].url)}
        className={`absolute max-h-screen max-w-full object-contain transition-all duration-700 ${fade ? "opacity-0 scale-95" : "opacity-100 scale-100"
          } ${config.modoFiesta ? "animate-bounce" : ""}`}
        alt="Foto actual"
      />

      {/* Imagen siguiente */}
      {fotos[nextIndex] && (
        <img
          src={optimizar(fotos[nextIndex].url)}
          className={`absolute max-h-screen max-w-full object-contain transition-all duration-700 ${fade ? "opacity-0 scale-95" : "opacity-100 scale-100"
            } ${config.modoFiesta ? "animate-bounce" : ""}`}
          alt="Foto siguiente"
        />
      )}

      {floating.map((foto) => (
        <img
          key={foto._id}
          src={optimizar(foto.url)}
          className="absolute w-48 animate-fall rounded-xl shadow-xl"
          style={{
            left: `${Math.random() * 80}%`,
            top: "-200px"
          }}
        />
      ))}

      {destacada && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">

          <img
            src={optimizar(destacada.url)}
            className="max-h-[85vh] rounded-xl shadow-2xl border-4 border-white"
            alt="Foto destacada"
          />

        </div>
      )}

      {/* Texto */}
      <div className="absolute bottom-10 text-white text-xl bg-black/50 px-6 py-3 rounded-xl">
        {config.texto}
      </div>

      {/* QR */}
      {config.mostrarQR && (
        <div className="absolute top-6 right-6 bg-white p-4 rounded-xl shadow-xl">

          <QRCodeCanvas
            value={`${import.meta.env.VITE_FRONTEND_URL}/fotos`}
            size={120}
          />

          <p className="text-black text-xs text-center mt-2 font-semibold">
            Escaneá y subí tu foto 📸
          </p>

        </div>
      )}
    </div>
  );
};

export default Salon;