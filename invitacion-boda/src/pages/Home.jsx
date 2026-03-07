import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Hero from "../components/sections/Hero";
import EventDetails from "../components/sections/EventDetails";
import Countdown from "../components/sections/Countdown";
import Story from "../components/sections/Story";
import Gallery from "../components/sections/Gallery";
import RSVP from "../components/sections/RSVP";
import Location from "../components/sections/Location";
import Info from "../components/sections/Info";
import Footer from "../components/sections/Footer";

const Home = () => {
  const [params] = useSearchParams();
  const invParam = params.get("inv"); 
  const [invitado, setInvitado] = useState(null);
  const [loading, setLoading] = useState(!!invParam);

  // UN SOLO useEffect para cargar datos y disparar el scroll
  useEffect(() => {
    if (!invParam) return;

    fetch(`${import.meta.env.VITE_API_URL}/invitados/link/${invParam}`)
      .then(res => {
        if (!res.ok) throw new Error("No encontrado");
        return res.json();
      })
      .then(data => {
        setInvitado(data);
        setLoading(false);

        // EFECTO DE SCROLL: Se dispara después de cargar los datos
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
  }, [invParam]); // Usamos invParam que es la variable real

  // El efecto de los observadores para el Fade-in (Este está perfecto)
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
  }, [invitado, loading]); // Agregamos loading para que re-ejecute al terminar de cargar

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando invitación...</div>;

  return (
    <>
      <Hero invitado={invitado} />
      <div className="reveal"><EventDetails /></div>
      <div className="reveal"><Countdown /></div>
      <div className="reveal"><Story /></div>
      <div className="reveal"><Gallery /></div>
      <div className="reveal"><RSVP invitado={invitado} slug={invParam} /></div>
      <div className="reveal"><Location /></div>
      <div className="reveal"><Info /></div>
      <div className="reveal"><Footer /></div>
    </>
  );
};

export default Home;