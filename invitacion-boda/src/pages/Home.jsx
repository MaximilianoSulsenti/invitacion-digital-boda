import { useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";

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
  const slug = params.get("inv");

  const [invitado, setInvitado] = useState(null);

  useEffect(() => {

    if(!slug) return;

    fetch(`https://invitacion-digital-boda.onrender.com/api/invitados/link/${slug}`)
      .then(res => res.json())
      .then(data => setInvitado(data))
      .catch(err => console.error(err));

  }, [slug]);

  return (
    <>
      <Hero invitado={invitado} />
      <EventDetails />
      <Countdown />
      <Story />
      <Gallery />
      <RSVP invitado={invitado} slug={slug}/>
      <Location />
      <Info />
      <Footer />
    </>
  )
}

export default Home;