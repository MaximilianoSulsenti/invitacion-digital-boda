import { useEffect, useState, useRef } from "react";
import { useSearchParams, useParams } from "react-router-dom";

import Hero from "../components/sections/Hero";
import EventDetails from "../components/sections/EventDetails";
import Countdown from "../components/sections/Countdown";
import Story from "../components/sections/Story";
import Gallery from "../components/sections/Gallery";
import RSVP from "../components/sections/RSVP";
import Location from "../components/sections/Location";
import Info from "../components/sections/Info";
import Footer from "../components/sections/Footer";
import SalonCarousel from "../components/sections/SalonCarousel";

const Home = () => {
  const [params] = useSearchParams();
  const invParam = params.get("inv");
  const { linkUnico } = useParams(); // Para la ruta /:linkUnico
  const [invitado, setInvitado] = useState(null);
  const [loading, setLoading] = useState(!!invParam || !!linkUnico);

  // --- NUEVA LÓGICA DE MÚSICA ---
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(err => console.log("Error al reproducir:", err));
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    if (!invParam && !linkUnico) return;

    const url = invParam
      ? `${import.meta.env.VITE_API_URL}/invitados/link/${invParam}`
      : `${import.meta.env.VITE_API_URL}/invitados/slug/${linkUnico}`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("No encontrado");
        return res.json();
      })
      .then(data => {
        setInvitado(data);
        setLoading(false);

        setTimeout(() => {
          window.scrollBy({
            top: 300,
            left: 0,
            behavior: 'smooth'
          });
        }, 2500);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [invParam, linkUnico]);

  useEffect(() => {
    const observerOptions = { threshold: 0.15 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    }, observerOptions);

    const sections = document.querySelectorAll(".reveal");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [invitado, loading]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando invitación...</div>;

  return (
    <>
      {/* 1. Etiqueta de audio con Referencia */}
      <audio
        ref={audioRef}
        src="/music.mp3"
        loop
      />

      {/* Botón de música con iconos de texto REAL (Sin conversión a emoji) */}
      <button
        onClick={toggleMusic}
        style={{
          position: 'fixed',
          top: '25px',
          right: '25px',
          zIndex: 1000,
          backgroundColor: '#B8860B',
          color: '#FDFCF0', // Color crema
          width: '45px',
          height: '45px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: '2px solid #FDFCF0',
          cursor: 'pointer',
          boxShadow: '0px 4px 15px rgba(0,0,0,0.2)',
          transition: 'all 0.3s ease',
        }}
      >
        {isPlaying ? (
          /* Dos barras verticales simples que nunca serán emojis */
          <div style={{ display: 'flex', gap: '3px' }}>
            <div style={{ width: '3px', height: '15px', backgroundColor: '#FDFCF0' }}></div>
            <div style={{ width: '3px', height: '15px', backgroundColor: '#FDFCF0' }}></div>
          </div>
        ) : (
          /* Un triángulo dibujado con CSS para que sea 100% del color que queremos */
          <div style={{
            width: 0,
            height: 0,
            borderTop: '8px solid transparent',
            borderBottom: '8px solid transparent',
            borderLeft: '14px solid #FDFCF0',
            marginLeft: '4px'
          }}></div>
        )}
      </button>

      <Hero invitado={invitado} />
      <div className="reveal"><EventDetails /></div>
      <div className="reveal"><SalonCarousel /></div>
      <div className="reveal"><Location /></div>
      <div className="reveal"><Countdown /></div>
      <div className="reveal"><Story /></div>
      <div className="reveal"><Gallery /></div>
      <div className="reveal"><RSVP invitado={invitado} slug={linkUnico || invParam} /></div>
      <div className="reveal"><Info /></div>
      <div className="reveal"><Footer /></div>
    </>
  );
};

export default Home;