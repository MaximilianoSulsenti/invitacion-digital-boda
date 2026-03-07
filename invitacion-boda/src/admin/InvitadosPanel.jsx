import { useEffect, useState } from "react";
import api from "../services/api";
import { QRCodeCanvas } from "qrcode.react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

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
    navigator.clipboard.writeText(link).then(() => {
      setCopiado(linkUnico);
      setTimeout(() => setCopiado(null), 2000);
    });
  };

  const enviarWhatsApp = (invitado) => {

    const numero = `549${invitado.telefono}`;

    const link = `${import.meta.env.VITE_FRONTEND_URL}/?inv=${invitado.linkUnico}`;

    const mensaje = `Hola ${invitado.nombre}! 💍

Te invitamos a nuestra boda.

Podés ver la invitación y confirmar asistencia acá:
${link}

¡Te esperamos!`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");

  };

  const enviarRecordatorio = (invitado) => {

    const numero = `549${invitado.telefono}`;

    const link = `${import.meta.env.VITE_FRONTEND_URL}/?inv=${invitado.linkUnico}`;

    const mensaje = `Hola ${invitado.nombre}! 😊

Te recordamos confirmar tu asistencia a nuestra boda 💍

Podés hacerlo acá:
${link}

¡Nos ayudaría mucho tu confirmación!`;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");

  };

  const recordarPendientes = () => {

    const pendientes = invitados.filter(i => !i.confirmado);

    pendientes.forEach((invitado, index) => {

      const numero = `549${invitado.telefono}`;

      const link = `${import.meta.env.VITE_FRONTEND_URL}/?inv=${invitado.linkUnico}`;

      const mensaje = `Hola ${invitado.nombre}! 😊

Te recordamos confirmar tu asistencia a nuestra boda 💍

Podés hacerlo acá:
${link}

¡Nos ayudaría mucho tu confirmación!`;

      const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

      setTimeout(() => {
        window.open(url, "_blank");
      }, index * 800);

    });

  };

  const exportarExcel = () => {

    const data = invitados.map((inv) => ({
      Nombre: inv.nombre,
      Confirmado: inv.asistencia ? "SI" : "NO",
      Personas: inv.personas || 0,
      Mensaje: inv.mensaje || "",
      Link: `${window.location.origin}/i/${inv.linkUnico}`
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Invitados");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const blob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
    });

    saveAs(blob, "invitados_boda.xlsx");
  };

  const exportarSalon = () => {

    const confirmados = invitados.filter(i => i.confirmado);

    const data = confirmados.map((inv) => ({
      Nombre: inv.nombre,
      Personas: inv.personas || 1
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(workbook, worksheet, "Salon");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array"
    });

    const blob = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
    });

    saveAs(blob, "confirmados_salon.xlsx");
  };


  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Invitados</h2>

      <div className="mb-6">

        <div className="flex justify-between text-sm mb-1">
          <span>Confirmaciones</span>
          <span>{porcentaje}%</span>
        </div>

        <div className="w-full bg-gray-200 rounded h-3">
          <div
            className="bg-green-500 h-3 rounded"
            style={{ width: `${porcentaje}%` }}
          />
        </div>

        <p className="text-xs text-gray-500 mt-1">
          {confirmados} de {total} invitados confirmaron
        </p>

      </div>

      <div className="mb-4 flex gap-3">

        <button
          onClick={recordarPendientes}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          📢 Recordar pendientes
        </button>

        <button
          onClick={exportarExcel}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          📊 Exportar Excel
        </button>

        <button
          onClick={exportarSalon}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          🍽 Exportar para salón
        </button>

      </div>

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

              {!i.confirmado && (
                <button
                  onClick={() => enviarRecordatorio(i)}
                  className="text-yellow-600"
                >
                  🔁 Recordar
                </button>
              )}

              <button
                onClick={() => enviarWhatsApp(i)}
                className="text-green-600"
              >
                📲 WhatsApp
              </button>

              <button
                onClick={() => copiarLink(i.linkUnico)}  // ✅ Cambiar
                className={`${copiado === i.linkUnico ? "text-green-600" : "text-blue-600"}`}  // ✅ Cambiar color
              >
                {copiado === i.linkUnico ? "✅ Copiado" : "Copiar link"}  {/* ✅ Cambiar texto */}
              </button>

              <button
                onClick={() => setQrInvitado(i)}
                className="text-purple-600"
              >
                📷 QR
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

      {/* MODAL QR */}
      {qrInvitado && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded text-center shadow-lg">

            <h3 className="mb-4 font-bold text-lg">
              QR para {qrInvitado.nombre}
            </h3>

            <QRCodeCanvas
              value={`${import.meta.env.VITE_FRONTEND_URL}/?inv=${qrInvitado.linkUnico}`}
              size={220}
            />

            <p className="text-sm mt-3 text-gray-500">
              Escaneá para abrir la invitación
            </p>

            <div className="mt-4">
              <button
                onClick={() => setQrInvitado(null)}
                className="bg-black text-white px-4 py-2 rounded"
              >
                Cerrar
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default InvitadosPanel;