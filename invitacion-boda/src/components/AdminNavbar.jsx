import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, LayoutDashboard, Utensils, Camera, LogOut, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const AdminNavbar = () => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { name: "Dashboard", path: "/admin/panel", icon: <LayoutDashboard size={18} /> },
    { name: "Admin Salón", path: "/admin/salon", icon: <Utensils size={18} /> },
    { name: "Ver Salón", path: "/salon", icon: <ExternalLink size={18} /> },
    { name: "Fotos", path: "/fotos", icon: <Camera size={18} /> },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-b border-[#B8860B]/10 px-6 py-4 sticky top-0 z-[100]">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo / Branding */}
        <div className="flex flex-col">
          <span className="font-serif text-xl text-black tracking-tight">Admin</span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-[#B8860B] font-bold -mt-1">N&M Wedding</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-xs uppercase tracking-widest font-bold transition-colors ${
                isActive(link.path) ? "text-[#B8860B]" : "text-gray-400 hover:text-black"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={logout}
            className="flex items-center gap-2 text-red-400 hover:text-red-600 transition-colors text-xs uppercase tracking-widest font-bold"
          >
            <LogOut size={16} />
            <span>Salir</span>
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden p-2 text-gray-600"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-50 overflow-hidden"
          >
            <div className="flex flex-col py-4 gap-1">
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-4 px-6 py-4 text-sm font-medium ${
                    isActive(link.path) 
                      ? "bg-[#FDFCF0] text-[#B8860B] border-r-4 border-[#B8860B]" 
                      : "text-gray-500 hover:bg-gray-50"
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
              <button
                onClick={logout}
                className="flex items-center gap-4 px-6 py-4 text-sm font-medium text-red-500 hover:bg-red-50"
              >
                <LogOut size={18} />
                Salir
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default AdminNavbar;