import { useEffect, useState } from "react";
import api from "../services/api";
import { 
  Play, Pause, FastForward, Type, QrCode, 
  PartyPopper, Check, Trash2, Settings2, Image as ImageIcon 
} from "lucide-react";

const AdminSalon = () => {
  const [config, setConfig] = useState({
    pausa: false,
    velocidad: 5000,
    texto: "",
    mostrarQR: true,
    modoFiesta: false
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
    const res = await api.post("/salon/config", { ...config, ...nuevo });
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
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-10">
      
      {/* 🎛️ CONTROL CENTER DEL SALÓN */}
      <section className="bg-white rounded-[2.5rem] p-6 md:p-10 border border-[#B8860B]/10 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <Settings2 className="text-[#B8860B]" size={24} />
          <h2 className="text-2xl font-serif text-black">Control del Salón</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Play/Pausa & QR Toggle */}
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Estado del Slideshow</p>
            <div className="flex gap-3">
              <button
                onClick={() => actualizarConfig({ pausa: !config.pausa })}
                className={`flex-1 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${
                  config.pausa ? "bg-green-500 text-white" : "bg-black text-white"
                }`}
              >
                {config.pausa ? <Play size={18} /> : <Pause size={18} />}
                {config.pausa ? "Reanudar" : "Pausar"}
              </button>
              <button
                onClick={() => actualizarConfig({ mostrarQR: !config.mostrarQR })}
                className={`px-6 rounded-2xl transition-all border ${
                  config.mostrarQR ? "bg-[#FDFCF0] border-[#B8860B]/30 text-[#B8860B]" : "bg-gray-100 border-transparent text-gray-400"
                }`}
              >
                <QrCode size={20} />
              </button>
            </div>
          </div>

          {/* Velocidad */}
          <div className="space-y-4">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Velocidad (ms)</p>
            <div className="relative flex items-center">
              <FastForward className="absolute left-4 text-gray-400" size={18} />
              <input
                type="number"
                value={config.velocidad}
                onChange={(e) => actualizarConfig({ velocidad: Number(e.target.value) })}
                className="w-full bg-gray-50 border-none p-4 pl-12 rounded-2xl text-sm focus:ring-2 ring-[#B8860B]/10 outline-none"
              />
            </div>
          </div>

          {/* Texto Inferior */}
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-400">Texto en Pantalla</p>
            <div className="relative flex items-center">
              <Type className="absolute left-4 text-gray-400" size={18} />
              <input
                type="text"
                value={config.texto}
                onChange={(e) => actualizarConfig({ texto: e.target.value })}
                className="w-full bg-gray-50 border-none p-4 pl-12 rounded-2xl text-sm focus:ring-2 ring-[#B8860B]/10 outline-none"
                placeholder="Escribí un mensaje..."
              />
            </div>
          </div>
        </div>

        {/* MODO FIESTA - El botón más importante */}
        <div className="mt-10 pt-8 border-t border-gray-50">
          <button
            onClick={() =>
              actualizarConfig({
                modoFiesta: !config.modoFiesta,
                velocidad: !config.modoFiesta ? 1500 : 5000,
                texto: !config.modoFiesta ? "🎉 ¡A BAILAR!" : "💍 Nati & Maxi",
              })
            }
            className={`w-full py-6 rounded-[2rem] font-black text-sm uppercase tracking-[0.4em] transition-all flex items-center justify-center gap-4 shadow-xl ${
              config.modoFiesta 
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white animate-pulse" 
                : "bg-gray-100 text-gray-400 hover:text-purple-600"
            }`}
          >
            <PartyPopper size={24} />
            {config.modoFiesta ? "Modo Fiesta Activo" : "Activar Modo Fiesta"}
          </button>
        </div>
      </section>

      {/* 📸 MODERACIÓN DE FOTOS */}
      <section className="space-y-6">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-3">
            <ImageIcon className="text-[#B8860B]" size={24} />
            <h2 className="text-2xl font-serif text-black">Fotos Pendientes</h2>
          </div>
          <span className="bg-[#B8860B]/10 text-[#B8860B] px-4 py-1 rounded-full text-xs font-bold">
            {pendientes.length}
          </span>
        </div>

        {pendientes.length === 0 ? (
          <div className="bg-white/50 border-2 border-dashed border-gray-200 rounded-[2.5rem] py-20 text-center">
            <p className="font-serif italic text-gray-400">No hay fotos esperando aprobación</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pendientes.map((foto) => (
              <div key={foto._id} className="bg-white p-3 rounded-[2rem] border border-gray-100 shadow-sm group">
                <div className="relative overflow-hidden rounded-[1.5rem]">
                  <img
                    src={foto.url}
                    alt="pendiente"
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                <div className="flex gap-2 mt-4">
                  <button
                    onClick={() => aprobarFoto(foto._id)}
                    className="flex-1 bg-green-50 text-green-600 py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all flex items-center justify-center gap-2"
                  >
                    <Check size={16} /> Aprobar
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm("¿Eliminar definitivamente?")) eliminarFoto(foto._id);
                    }}
                    className="px-5 bg-red-50 text-red-500 py-4 rounded-xl hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default AdminSalon;