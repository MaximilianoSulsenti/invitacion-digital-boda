import { useEffect, useState } from "react";
import api from "../services/api";
import { UserPlus, Copy, Check, Trash2, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const InvitadosPanel = () => {
  const [invitados, setInvitados] = useState([]);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [copiado, setCopiado] = useState(null);

  const load = async () => {
    try {
      const res = await api.get("/invitados");
      setInvitados(res.data);
    } catch (error) {
      console.error("Error al cargar invitados");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const crear = async () => {
    if (!nombre || !telefono) return;
    await api.post("/invitados", { nombre, telefono });
    setNombre("");
    setTelefono("");
    load();
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Estás seguro de eliminar este invitado?")) {
      await api.delete(`/invitados/${id}`);
      load();
    }
  };

  const copiarLink = (linkUnico) => {
    // Usamos el Frontend URL para el link de la invitación
    const link = `${import.meta.env.VITE_FRONTEND_URL}/?inv=${linkUnico}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopiado(linkUnico);
      setTimeout(() => setCopiado(null), 2000);
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 md:p-0">
      
      {/* Título de la Sección */}
      <div className="flex items-center gap-3 border-b border-[#B8860B]/10 pb-4">
        <Users className="text-[#B8860B]" size={24} />
        <h2 className="text-2xl font-serif text-black">Gestión de Invitados</h2>
      </div>

      {/* Formulario de Creación - Responsive Grid */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-[#B8860B]/10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-2">Nombre</label>
            <input
              className="w-full bg-[#FDFCF0] border-none p-4 rounded-2xl text-sm focus:ring-1 ring-[#B8860B]/30 outline-none"
              placeholder="Ej: Familia García"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="space-y-1">
            <label className="text-[10px] uppercase tracking-widest text-gray-400 font-bold ml-2">Teléfono</label>
            <input
              className="w-full bg-[#FDFCF0] border-none p-4 rounded-2xl text-sm focus:ring-1 ring-[#B8860B]/30 outline-none"
              placeholder="Ej: 3416123456"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
            />
          </div>
          <div className="flex items-end">
            <button 
              onClick={crear}
              className="w-full bg-black text-white h-[52px] rounded-2xl font-bold uppercase text-[10px] tracking-[0.2em] hover:bg-[#B8860B] transition-all flex items-center justify-center gap-2"
            >
              <UserPlus size={16} />
              Crear Invitado
            </button>
          </div>
        </div>
      </div>

      {/* Lista de Invitados - Card Style for Mobile */}
      <div className="space-y-3">
        <AnimatePresence>
          {invitados.map((i) => (
            <motion.div
              layout
              key={i._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white p-5 rounded-2xl border border-[#B8860B]/5 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex flex-col">
                <span className="font-bold text-gray-900">{i.nombre}</span>
                <span className={`text-[10px] uppercase font-bold tracking-tighter ${i.confirmado ? 'text-green-500' : 'text-yellow-500'}`}>
                  {i.confirmado ? "● Confirmado" : "○ Pendiente de respuesta"}
                </span>
              </div>

              <div className="flex items-center gap-2 md:gap-4 border-t md:border-none pt-3 md:pt-0">
                <button
                  onClick={() => copiarLink(i.linkUnico)}
                  className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    copiado === i.linkUnico 
                    ? "bg-green-500 text-white" 
                    : "bg-[#FDFCF0] text-[#B8860B] hover:bg-[#B8860B]/10"
                  }`}
                >
                  {copiado === i.linkUnico ? <Check size={14} /> : <Copy size={14} />}
                  {copiado === i.linkUnico ? "Copiado" : "Link"}
                </button>

                <button
                  onClick={() => eliminar(i._id)}
                  className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                  title="Eliminar"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {invitados.length === 0 && (
        <div className="text-center py-20 bg-white/50 rounded-[2rem] border border-dashed border-gray-200">
          <p className="text-gray-400 font-serif italic">No hay invitados registrados aún.</p>
        </div>
      )}
    </div>
  );
};

export default InvitadosPanel;