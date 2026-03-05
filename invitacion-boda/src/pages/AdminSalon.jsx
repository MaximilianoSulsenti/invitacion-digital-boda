import { useEffect, useState } from "react";
import api from "../services/api";

const AdminSalon = () => {
  const [config, setConfig] = useState({
    pausa: false,
    velocidad: 5000,
    texto: "",
    mostrarQR: true
  });

  const [pendientes, setPendientes] = useState([]);

  useEffect(() => {
    cargarConfig();
    cargarPendientes();
  }, []);

  const cargarConfig = async () => {
    const res = await api.get("/salon/config");
    setConfig(res.data);
  };

  const cargarPendientes = async () => {
    const res = await api.get("/fotos/pendientes");
    setPendientes(res.data);
  };

  const actualizarConfig = async (nuevo) => {
    const res = await api.post("/salon/config", nuevo);
    setConfig(res.data);
  };

  const aprobarFoto = async (id) => {
    await api.put(`/fotos/${id}/aprobar`);
    setPendientes((prev) => prev.filter((f) => f._id !== id));
  };

  const eliminarFoto = async (id) => {
    await api.delete(`/fotos/${id}`);
    setPendientes((prev) => prev.filter((f) => f._id !== id));
  };

  return (
    <div className="p-10 max-w-5xl mx-auto space-y-10">

      {/* 🎛️ CONFIGURACIÓN SALÓN */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">🎛️ Control Salón</h2>

        <button
          onClick={() => actualizarConfig({ pausa: !config.pausa })}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {config.pausa ? "Reanudar" : "Pausar"} Slideshow
        </button>

        <div>
          <label>Velocidad (ms)</label>
          <input
            type="number"
            value={config.velocidad}
            onChange={(e) =>
              actualizarConfig({ velocidad: Number(e.target.value) })
            }
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label>Texto inferior</label>
          <input
            type="text"
            value={config.texto}
            onChange={(e) =>
              actualizarConfig({ texto: e.target.value })
            }
            className="border p-2 w-full"
          />
        </div>

        <button
          onClick={() => actualizarConfig({ mostrarQR: !config.mostrarQR })}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          {config.mostrarQR ? "Ocultar QR" : "Mostrar QR"}
        </button>
      </div>

      <button
        onClick={() =>
          actualizarConfig({
            modoFiesta: !config.modoFiesta,
            velocidad: !config.modoFiesta ? 1500 : 5000,
            texto: !config.modoFiesta
              ? "🎉 ¡HORA LOCA!"
              : "💍 Boda Maxi & Nati",
          })
        }
        className={`px-4 py-2 rounded text-white ${config.modoFiesta ? "bg-purple-700" : "bg-purple-500"
          }`}
      >
        {config.modoFiesta ? "Desactivar" : "Activar"} 🎉 Modo Fiesta
      </button>

      {/* 📸 MODERACIÓN */}
      <div>
        <h2 className="text-2xl font-bold mb-6">📸 Fotos Pendientes</h2>

        {pendientes.length === 0 ? (
          <p>No hay fotos pendientes 🎉</p>
        ) : (
          <div className="grid grid-cols-3 gap-6">
            {pendientes.map((foto) => (
              <div key={foto._id} className="border p-3 rounded shadow space-y-3">
                <img
                  src={foto.url}
                  alt="pendiente"
                  className="w-full h-48 object-cover rounded"
                />

                <div className="flex gap-2">
                  <button
                    onClick={() => aprobarFoto(foto._id)}
                    className="bg-green-600 text-white w-full py-2 rounded"
                  >
                    ✅ Aprobar
                  </button>

                  <button
                    onClick={() => {
                      const confirmar = window.confirm("¿Seguro que querés eliminar esta foto?");
                      if (confirmar) eliminarFoto(foto._id);
                    }}
                    className="bg-red-600 text-white w-full py-2 rounded"
                  >
                    🗑 Eliminar
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default AdminSalon;