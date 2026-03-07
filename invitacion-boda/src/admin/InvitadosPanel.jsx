import { useEffect, useState } from "react";
import api from "../services/api";

const InvitadosPanel = () => {
  const [invitados, setInvitados] = useState([]);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [copiado, setCopiado] = useState(null);
  const [maxAsistentes, setMaxAsistentes] = useState(1);

  const load = async () => {
    const res = await api.get("/invitados");
    setInvitados(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const crear = async () => {
    await api.post("/invitados", { nombre, telefono, maxAsistentes });
    setNombre("");
    setTelefono("");
    setMaxAsistentes(1);
    load();
  };

  const eliminar = async (id) => {
    await api.delete(`/invitados/${id}`);
    load();
  };

    const copiarLink = (linkUnico) => {
    const link = `${import.meta.env.VITE_FRONTEND_URL}/i/${linkUnico}`;
    console.log("Link a copiar:", link);
    console.log("linkUnico:", linkUnico);
    navigator.clipboard.writeText(link).then(() => {
      setCopiado(linkUnico);
      setTimeout(() => setCopiado(null), 2000);
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Invitados</h2>

      {/* Crear */}
      <div className="flex gap-2 mb-4">
        <input
          className="border p-2 rounded"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          className="border p-2 rounded"
          placeholder="Teléfono"
          value={telefono}
          onChange={(e) => setTelefono(e.target.value)}
        />
      
        <input
          type="number"
          min="1"
          className="border p-2 rounded"
          placeholder="Máx. asistentes"
          value={maxAsistentes}
          onChange={(e) => setMaxAsistentes(Number(e.target.value))}
        />

        <button onClick={crear} className="bg-black text-white px-4 rounded">
          Crear
        </button>
      </div>

      {/* Lista */}
      <div className="bg-white rounded shadow">
        {invitados.map((i) => (
          <div
            key={i._id}
            className="flex justify-between border-b p-3 text-sm"
          >
            <div>
              <b>{i.nombre}</b><br />
              {i.confirmado ? "✅ Confirmado" : "⏳ Pendiente"}
            </div>

            <div className="flex gap-3 items-center">
              <button
                onClick={() => copiarLink(i.linkUnico)}  // ✅ Cambiar
                className={`${copiado === i.linkUnico ? "text-green-600" : "text-blue-600"}`}  // ✅ Cambiar color
              >
                {copiado === i.linkUnico ? "✅ Copiado" : "Copiar link"}  {/* ✅ Cambiar texto */}
              </button>

              <button
                onClick={() => eliminar(i._id)}
                className="text-red-500"
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvitadosPanel;