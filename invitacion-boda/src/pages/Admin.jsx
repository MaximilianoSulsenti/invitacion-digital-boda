import { useEffect, useState } from "react";
import api from "../services/api"; // 🔥 usar api

const Admin = () => {
  const [invitados, setInvitados] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await api.get("/admin/invitados");
      setInvitados(res.data);
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-3xl mb-6">Panel Admin 💍</h1>

      <div className="grid gap-4">
        {invitados.map((inv) => (
          <div key={inv._id} className="bg-neutral-900 p-4 rounded-xl">
            <p><b>Nombre:</b> {inv.nombre}</p>
            <p><b>Asistencia:</b> {inv.asistencia ? "✅" : "❌"}</p>
            <p><b>Personas:</b> {inv.personas}</p>
            <p><b>Mensaje:</b> {inv.mensaje}</p>
            <p className="text-xs opacity-60">Link: /i/{inv.linkUnico}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Admin;