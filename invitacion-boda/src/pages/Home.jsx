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
  return (
    <>
     <Hero />
     <EventDetails />
     <Countdown />
     <Story />
     <Gallery />
     <RSVP />
     <Location />
     <Info />
     <Footer />
    </>
     )
}

export default Home