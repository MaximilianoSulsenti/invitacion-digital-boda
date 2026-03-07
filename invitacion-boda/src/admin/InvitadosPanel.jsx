import { useEffect, useState } from "react";
import api from "../services/api";
import { QRCodeCanvas } from "qrcode.react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import {
  UserPlus, FileText, Utensils, Send,
  Copy, Check, QrCode, Trash2, MessageCircle, Bell
} from "lucide-react";

const InvitadosPanel = () => {
  const [invitados, setInvitados] = useState([]);
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [copiado, setCopiado] = useState(null);
  const [maxAsistentes, setMaxAsistentes] = useState(1);
  const [qrInvitado, setQrInvitado] = useState(null);

  const total = invitados.length;
  const confirmados = invitados.filter(i => i.confirmado).length;
  const porcentaje = total ? Math.round((confirmados / total) * 100) : 0;

  const load = async () => {
    const res = await api.get("/invitados");
    setInvitados(res.data);
  };

  useEffect(() => { load(); }, []);

  const crear = async () => {
    if (!nombre || !telefono) return alert("Nombre y teléfono obligatorios");
    await api.post("/invitados", { nombre, telefono, maxAsistentes });
    setNombre(""); setTelefono(""); setMaxAsistentes(1);
    load();
  };

  const eliminar = async (id) => {
    if (window.confirm("¿Eliminar invitado?")) {
      await api.delete(`/invitados/${id}`);
      load();
    }
  };

  const copiarLink = (invitado) => {
    const link = `${import.meta.env.VITE_FRONTEND_URL}/${invitado.slug}`;
    navigator.clipboard.writeText(link).then(() => {
      setCopiado(invitado.linkUnico);
      setTimeout(() => setCopiado(null), 2000);
    });
  };

  const enviarWhatsApp = (invitado, esRecordatorio = false) => {
    const numero = `549${invitado.telefono}`;
    const link = `${import.meta.env.VITE_FRONTEND_URL}/${invitado.slug}`;

    const mensaje = esRecordatorio
      ? `Hola ${invitado.nombre}! 😊\n\nTe recordamos confirmar tu asistencia a nuestra boda 💍\n\nPodés hacerlo acá:\n${link}\n\n¡Nos ayudaría mucho tu confirmación!`
      : `Hola ${invitado.nombre}! 💍\n\nTe invitamos a nuestra boda.\n\nPodés ver la invitación y confirmar asistencia acá:\n${link}\n\n¡Te esperamos!`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, "_blank");
  };

  const exportarExcel = () => {
    // Preparamos los datos tal como queremos que se vean en las columnas
    const data = invitados.map(i => ({
      "Nombre del Invitado": i.nombre,
      "Teléfono": i.telefono,
      "Estado": i.confirmado ? "Confirmado ✅" : "Pendiente ⏳",
      "Asistentes": i.confirmado ? i.asistentes : 0,
      "Cupo Máximo": i.maxAsistentes,
      "Mensaje / Dedicatoria": i.mensaje || "",
      "Fecha de Confirmación": i.fechaConfirmacion ? new Date(i.fechaConfirmacion).toLocaleDateString() : "-"
    }));

    // Creamos la hoja de Excel
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Invitados");

    // Generamos el archivo y lo descargamos
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(fileData, `Lista_Invitados_Boda_${new Date().toLocaleDateString()}.xlsx`);
  };

  const exportarSalon = () => {
    // Filtramos solo los que ya confirmaron
    const confirmadosLista = invitados.filter(i => i.confirmado);

    // Sumamos el total de personas reales que van a ir
    const totalPersonas = confirmadosLista.reduce((acc, i) => acc + i.asistentes, 0);

    const data = confirmadosLista.map(i => ({
      "Invitado Principal": i.nombre,
      "Cantidad de Personas": i.asistentes,
      "Notas / Mensajes": i.mensaje || ""
    }));

    // Agregamos una fila vacía y luego el total al final de la lista
    data.push({});
    data.push({
      "Invitado Principal": "TOTAL DE ASISTENTES CONFIRMADOS",
      "Cantidad de Personas": totalPersonas
    });

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Planilla_Catering");

    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const fileData = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(fileData, `Planilla_Salon_Boda_${new Date().toLocaleDateString()}.xlsx`);
  };

  return (
    <div className="space-y-6">

      {/* 📈 Progreso de Confirmaciones */}
      <div className="bg-white p-6 rounded-2xl border border-[#B8860B]/10 shadow-sm">
        <div className="flex justify-between items-end mb-4">
          <div>
            <h2 className="text-xl font-serif text-black">Invitados</h2>
            <p className="text-xs text-gray-500">{confirmados} de {total} han confirmado</p>
          </div>
          <span className="text-2xl font-serif text-[#B8860B]">{porcentaje}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
          <div
            className="bg-[#B8860B] h-full transition-all duration-1000"
            style={{ width: `${porcentaje}%` }}
          />
        </div>
      </div>

      {/* 🚀 Acciones Rápidas (Grid en móvil) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <button onClick={() => {/* Lógica recordar todos */ }} className="flex items-center justify-center gap-2 bg-yellow-50 text-yellow-700 p-3 rounded-xl border border-yellow-100 text-sm font-bold hover:bg-yellow-100 transition">
          <Bell size={18} /> Recordar Pendientes
        </button>
        <button
          onClick={exportarExcel}
          className="flex items-center justify-center gap-2 bg-green-50 text-green-700 p-3 rounded-xl border border-green-100 text-sm font-bold hover:bg-green-100 transition"
        >
          <FileText size={18} /> Exportar Excel
        </button>
        <button
          onClick={exportarSalon}
          className="flex items-center justify-center gap-2 bg-blue-50 text-blue-700 p-3 rounded-xl border border-blue-100 text-sm font-bold hover:bg-blue-100 transition"
        >
          <Utensils size={18} /> Planilla Salón
        </button>
      </div>

      {/* ➕ Creador de Invitados (Vertical en móvil) */}
      <div className="bg-white p-6 rounded-2xl border border-[#B8860B]/20 shadow-sm">
        <h3 className="text-xs uppercase tracking-widest font-bold text-gray-400 mb-4 flex items-center gap-2">
          <UserPlus size={16} /> Nuevo Invitado
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            className="bg-gray-50 border-none p-3 rounded-xl text-sm focus:ring-1 ring-[#B8860B]/30"
            placeholder="Nombre del invitado"
            value={nombre} onChange={(e) => setNombre(e.target.value)}
          />
          <input
            className="bg-gray-50 border-none p-3 rounded-xl text-sm focus:ring-1 ring-[#B8860B]/30"
            placeholder="Teléfono (sin 0 ni 15)"
            value={telefono} onChange={(e) => setTelefono(e.target.value)}
          />
          <input
            type="number" className="bg-gray-50 border-none p-3 rounded-xl text-sm focus:ring-1 ring-[#B8860B]/30"
            placeholder="Máx. Cupos"
            value={maxAsistentes} onChange={(e) => setMaxAsistentes(Number(e.target.value))}
          />
          <button onClick={crear} className="bg-black text-white p-3 rounded-xl font-bold text-sm hover:bg-[#B8860B] transition">
            Crear Invitación
          </button>
        </div>
      </div>

      {/* 📋 Lista de Invitados */}
      <div className="bg-white rounded-2xl border border-[#B8860B]/10 overflow-hidden shadow-sm">
        <div className="hidden md:grid grid-cols-5 bg-gray-50 p-4 text-[10px] uppercase tracking-widest font-bold text-gray-400">
          <div className="col-span-2">Invitado</div>
          <div>Estado</div>
          <div className="col-span-2 text-right">Acciones</div>
        </div>

        <div className="divide-y divide-gray-50">
          {invitados.map((i) => (
            <div key={i._id} className="p-4 flex flex-col md:grid md:grid-cols-5 md:items-center gap-4 hover:bg-[#FDFCF0]/30 transition">

              {/* Info principal */}
              <div className="col-span-2 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-gray-900">{i.nombre}</p>
                  {/* 💌 Si hay mensaje, mostramos un globito de texto */}
                  {i.mensaje && (
                    <div className="group relative">
                      <MessageCircle size={14} className="text-[#B8860B] animate-pulse" />
                      <span className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-48 bg-black text-white text-[10px] p-2 rounded-lg shadow-xl z-50 font-normal normal-case italic">
                        "{i.mensaje}"
                      </span>
                    </div>
                  )}
                </div>
                <p className="text-xs text-gray-400">{i.telefono} • Máx: {i.maxAsistentes}</p>

                {/* Mensaje visible si existe */}
                {i.mensaje && (
                  <p className="text-[11px] text-[#B8860B] font-serif italic line-clamp-1 border-l-2 border-[#B8860B]/20 pl-2 mt-1">
                    "{i.mensaje}"
                  </p>
                )}
              </div>
              {/* Status Badge */}
              <div>
                <span className={`text-[10px] uppercase font-bold px-3 py-1 rounded-full ${i.confirmado ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                  }`}>
                  {i.confirmado ? "Confirmado" : "Pendiente"}
                </span>
              </div>

              {/* Acciones (Flex-wrap para mobile) */}
              <div className="col-span-2 flex flex-wrap md:justify-end gap-2">
                {!i.confirmado && (
                  <button onClick={() => enviarWhatsApp(i, true)} className="p-2 text-yellow-600 bg-yellow-50 rounded-lg" title="Recordar">
                    <Bell size={18} />
                  </button>
                )}
                <button onClick={() => enviarWhatsApp(i)} className="p-2 text-green-600 bg-green-50 rounded-lg" title="WhatsApp">
                  <MessageCircle size={18} />
                </button>
                <button onClick={() => copiarLink(i)} className={`p-2 rounded-lg transition ${copiado === i.linkUnico ? "bg-green-600 text-white" : "bg-blue-50 text-blue-600"}`}>
                  {copiado === i.linkUnico ? <Check size={18} /> : <Copy size={18} />}
                </button>
                <button onClick={() => setQrInvitado(i)} className="p-2 text-purple-600 bg-purple-50 rounded-lg">
                  <QrCode size={18} />
                </button>
                <button onClick={() => eliminar(i._id)} className="p-2 text-red-500 bg-red-50 rounded-lg hover:bg-red-500 hover:text-white transition">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 📱 Modal QR Responsive */}
      {qrInvitado && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
          <div className="bg-white p-8 rounded-3xl text-center shadow-2xl max-w-sm w-full">
            <h3 className="mb-2 font-serif text-xl">QR de Invitación</h3>
            <p className="text-gray-400 text-xs mb-6 uppercase tracking-widest">{qrInvitado.nombre}</p>

            <div className="bg-white p-4 rounded-2xl border border-gray-100 inline-block shadow-inner">
              <QRCodeCanvas
                value={`${import.meta.env.VITE_FRONTEND_URL}/${qrInvitado.slug}`}
                size={200}
                level="H"
              />
            </div>

            <button onClick={() => setQrInvitado(null)} className="mt-8 w-full bg-black text-white py-4 rounded-xl font-bold uppercase text-[10px] tracking-[0.2em]">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvitadosPanel;