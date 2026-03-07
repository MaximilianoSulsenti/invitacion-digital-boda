import { useEffect, useState } from "react";
import InvitadosPanel from "./InvitadosPanel";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { Users, UserCheck, UserPlus, Clock, LogOut } from "lucide-react";

const AdminDashboard = () => {
  const { logout } = useAuth();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const res = await api.get("/invitados/stats");
        setStats(res.data);
      } catch (error) {
        console.error("Error cargando estadísticas");
      }
    };
    loadStats();
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFCF0]/50">
      
      {/* Navbar Superior Responsive */}
      <header className="bg-white border-b border-[#B8860B]/10 px-4 py-4 md:px-8 flex justify-between items-center sticky top-0 z-50">
        <div>
          <h1 className="text-xl font-serif text-black tracking-tight">Panel de Control</h1>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#B8860B] font-bold">Nati & Maxi</p>
        </div>
        <button 
          onClick={logout}
          className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors text-sm font-medium"
        >
          <span className="hidden md:block">Cerrar Sesión</span>
          <LogOut size={18} />
        </button>
      </header>

      <main className="max-w-7xl mx-auto py-6 md:py-10">
        
        {/* 📊 Estadísticas Grilla Responsive */}
        {stats && (
          <div className="px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            
            {/* Total Invitados */}
            <div className="bg-white p-6 rounded-2xl border border-[#B8860B]/10 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-gray-50 rounded-xl text-gray-600">
                <Users size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Total Invitados</p>
                <p className="text-2xl font-serif text-black">{stats.totalInvitados}</p>
              </div>
            </div>

            {/* Confirmados */}
            <div className="bg-white p-6 rounded-2xl border border-[#B8860B]/10 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-green-50 rounded-xl text-green-600">
                <UserCheck size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Confirmados</p>
                <p className="text-2xl font-serif text-green-600">{stats.confirmados}</p>
              </div>
            </div>

            {/* Pendientes */}
            <div className="bg-white p-6 rounded-2xl border border-[#B8860B]/10 shadow-sm flex items-center gap-4">
              <div className="p-3 bg-yellow-50 rounded-xl text-yellow-600">
                <Clock size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Pendientes</p>
                <p className="text-2xl font-serif text-yellow-600">{stats.pendientes}</p>
              </div>
            </div>

            {/* Total Reales */}
            <div className="bg-white p-6 rounded-2xl border border-[#B8860B]/20 shadow-md flex items-center gap-4 bg-gradient-to-br from-white to-[#FDFCF0]">
              <div className="p-3 bg-[#B8860B]/10 rounded-xl text-[#B8860B]">
                <UserPlus size={24} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-[#B8860B] font-bold">Personas Reales</p>
                <p className="text-2xl font-serif text-black">{stats.totalAsistentesConfirmados}</p>
              </div>
            </div>

          </div>
        )}

        {/* Panel de Invitados (Tabla/Lista) */}
        <div className="px-4">
          <InvitadosPanel />
        </div>

      </main>
    </div>
  );
};

export default AdminDashboard;