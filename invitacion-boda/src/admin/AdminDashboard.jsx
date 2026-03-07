import { useEffect, useState } from "react";
import InvitadosPanel from "./InvitadosPanel";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

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
    
    <div>
      {/* 📊 Estadísticas */}
      {stats && (
        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">Total Invitados</p>
            <p className="text-2xl font-bold">{stats.totalInvitados}</p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">Confirmados</p>
            <p className="text-2xl font-bold text-green-600">
              {stats.confirmados}
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">Pendientes</p>
            <p className="text-2xl font-bold text-yellow-600">
              {stats.pendientes}
            </p>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <p className="text-sm text-gray-500">Asistentes Confirmados</p>
            <p className="text-2xl font-bold text-blue-600">
              {stats.totalAsistentesConfirmados}
            </p>
          </div>
        </div>
      )}

      <InvitadosPanel />
    </div>
  );
};

export default AdminDashboard;