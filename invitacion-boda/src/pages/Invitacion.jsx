import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

const Invitacion = () => {
  const { linkUnico } = useParams();
  const [invitado, setInvitado] = useState(null);
  const [asistentes, setAsistentes] = useState(1);
  const [acompanantes, setAcompanantes] = useState([]);  // ✅ Nuevo estado
  const [loading, setLoading] = useState(true);
  const [confirmado, setConfirmado] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/invitados/link/${linkUnico}`);
        setInvitado(res.data);
        setAsistentes(Math.min(res.data.asistentes || 1, res.data.maxAsistentes || 1));
        setConfirmado(res.data.confirmado);
        setAcompanantes(res.data.acompanantes || []);  // ✅ Cargar acompañantes
      } catch (e) {
        setInvitado(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [linkUnico]);

  const agregarAcompanante = () => {
    if (acompanantes.length < asistentes - 1) {  // -1 porque el principal ya cuenta
      setAcompanantes([...acompanantes, { nombre: "", apellido: "" }]);
    }
  };

  const actualizarAcompanante = (index, field, value) => {
    const nuevos = [...acompanantes];
    nuevos[index][field] = value;
    setAcompanantes(nuevos);
  };

  const confirmar = async () => {
    try {
      setErrorMsg("");
      await api.post(`/invitados/confirmar/${linkUnico}`, {
        asistentes,
        acompanantes  // ✅ Enviar acompañantes
      });
      setConfirmado(true);
      setMostrarConfirmacion(false);
    } catch (error) {
      if (error.response && error.response.data.msg) {
        setErrorMsg(error.response.data.msg);
      } else {
        setErrorMsg("Ocurrió un error al confirmar");
      }
    }
  };

  if (loading) return <div className="p-10">Cargando...</div>;
  if (!invitado) return <div className="p-10">Invitación no válida</div>;

  return (
    <div className="min-h-screen bg-[#f7f4ef]">
      {/* ✅ SECCIÓN DE INFO DE LA BODA */}
      <div className="p-8 text-center">
        <h1 className="text-4xl font-bold mb-4">¡Estás invitado a nuestra boda!</h1>
        <p className="text-lg mb-6">Fecha: 20/11/2026 | Lugar: Salon Altos Del Rio</p>
        <img src="/img/1.jpg" alt="Foto de la boda" className="mx-auto mb-6 rounded" />
        {/* Agrega más fotos, detalles, etc. */}
      </div>

      {/* ✅ BOTÓN PARA CONFIRMAR */}
      {!confirmado && !mostrarConfirmacion && (
        <div className="text-center p-8">
          <button
            onClick={() => setMostrarConfirmacion(true)}
            className="bg-black text-white px-6 py-3 rounded hover:opacity-90"
          >
            Confirmar asistencia
          </button>
        </div>
      )}

      {/* ✅ FORMULARIO DE CONFIRMACIÓN */}
      {mostrarConfirmacion && !confirmado && (
        <div className="flex justify-center items-center p-8">
          <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">
            <h2 className="text-2xl font-bold mb-2">Hola {invitado.nombre}</h2>
            <p className="mb-4 text-gray-600">Confirma tu asistencia</p>

            <div className="mb-4">
              <label className="block mb-1">Cantidad de personas</label>
              <input
                type="number"
                min="1"
                max={invitado.maxAsistentes}
                value={asistentes}
                onChange={(e) => {
                  setAsistentes(Number(e.target.value));
                  setAcompanantes([]);  // Reset acompañantes si cambia cantidad
                }}
                className="border p-2 rounded w-full text-center"
              />
              {errorMsg && <div className="text-red-600 text-sm mt-2">❌ {errorMsg}</div>}
              <p className="text-sm text-gray-500 mt-1">
                Podés confirmar hasta {invitado.maxAsistentes} personas
              </p>
            </div>

            {/* ✅ NUEVO: Campos para acompañantes */}
            {asistentes > 1 && (
              <div className="mb-4">
                <p className="mb-2">Nombres de acompañantes:</p>
                {acompanantes.map((a, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      placeholder="Nombre"
                      value={a.nombre}
                      onChange={(e) => actualizarAcompanante(index, "nombre", e.target.value)}
                      className="border p-2 rounded flex-1"
                    />
                    <input
                      placeholder="Apellido"
                      value={a.apellido}
                      onChange={(e) => actualizarAcompanante(index, "apellido", e.target.value)}
                      className="border p-2 rounded flex-1"
                    />
                  </div>
                ))}
                {acompanantes.length < asistentes - 1 && (
                  <button
                    onClick={agregarAcompanante}
                    className="text-blue-600 text-sm"
                  >
                    + Agregar acompañante
                  </button>
                )}
              </div>
            )}

            <button onClick={confirmar} className="bg-black text-white w-full py-2 rounded hover:opacity-90">
              Confirmar
            </button>
            <button onClick={() => setMostrarConfirmacion(false)} className="mt-2 text-gray-500">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* ✅ CONFIRMACIÓN EXITOSA */}
      {confirmado && (
        <div className="text-center p-8 text-green-600 font-semibold">
          ✅ Asistencia confirmada <br />
          ¡Gracias por acompañarnos!
        </div>
      )}
    </div>
  );
};

export default Invitacion;