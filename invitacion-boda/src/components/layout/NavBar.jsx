import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* Logo */}
        <div className="text-white font-semibold tracking-wide">
          💍 Natali y Maxi
        </div>

        {/* Links */}
        <div className="hidden md:flex gap-8 text-sm text-neutral-200">
          <a href="#historia" className="hover:text-white transition">Historia</a>
          <a href="#evento" className="hover:text-white transition">Evento</a>
          <a href="#galeria" className="hover:text-white transition">Galería</a>
          <a href="#rsvp" className="hover:text-white transition">RSVP</a>
        </div>

      </div>
    </nav>
  )
}

export default Navbar