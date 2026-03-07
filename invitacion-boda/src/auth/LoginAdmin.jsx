import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Mail, Eye, EyeOff } from "lucide-react";

const LoginAdmin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(false);
    try {
      await login(email, password);
      navigate("/admin/panel");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FDFCF0] px-4">
      {/* Decoración de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#B8860B]/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-[#B8860B]/5 rounded-full blur-3xl" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-[400px]"
      >
        {/* Logo / Título */}
        <div className="text-center mb-10">
          <h2 className="font-shelley text-[#B8860B] text-5xl mb-2">Nati & Maxi</h2>
          <p className="text-[10px] uppercase tracking-[0.4em] text-gray-400 font-bold">Panel Administrativo</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(184,134,11,0.08)] border border-[#B8860B]/10 space-y-6"
        >
          <div className="space-y-4">
            {/* Input Email */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input
                className="w-full bg-gray-50 border-none p-4 pl-12 rounded-2xl text-sm focus:ring-2 ring-[#B8860B]/20 transition-all outline-none"
                placeholder="Correo electrónico"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Input Password */}
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input
                className="w-full bg-gray-50 border-none p-4 pl-12 pr-12 rounded-2xl text-sm focus:ring-2 ring-[#B8860B]/20 transition-all outline-none"
                placeholder="Contraseña"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-[#B8860B]"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }}
              className="text-red-500 text-xs text-center italic"
            >
              Credenciales incorrectas. Intenta de nuevo.
            </motion.p>
          )}

          <button className="w-full bg-black text-white py-4 rounded-2xl font-bold uppercase text-[10px] tracking-[0.3em] shadow-lg shadow-black/10 hover:bg-[#B8860B] active:scale-[0.98] transition-all">
            Ingresar al Panel
          </button>
        </form>

        <p className="text-center mt-8 text-[10px] text-gray-400 uppercase tracking-widest">
          Acceso Restringido • 2026
        </p>
      </motion.div>
    </div>
  );
};

export default LoginAdmin;