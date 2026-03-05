import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

const Invitacion = () => {
  const { linkUnico } = useParams();
  const [invitado, setInvitado] = useState(null);
  const [asistentes, setAsistentes] = useState(1);
  const [loading, setLoading] = useState(true);
  const [confirmado, setConfirmado] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/invitados/link/${linkUnico}`);
        setInvitado(res.data);
        setAsistentes(
          Math.min(
            res.data.asistentes || 1,
            res.data.maxAsistentes || 1
          )
        );
        setConfirmado(res.data.confirmado);
      } catch (e) {
        setInvitado(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [linkUnico]);

  const confirmar = async () => {
    try {
      setErrorMsg(""); // limpiar errores previos

      await api.post(`/invitados/confirmar/${linkUnico}`, {
        asistentes
      });

      setConfirmado(true);

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
    <div className="min-h-screen bg-[#f7f4ef] flex justify-center items-center">
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full text-center">

        <h1 className="text-2xl font-bold mb-2">
          {invitado.nombre}
        </h1>

        <p className="mb-4 text-gray-600">
          Estás invitado/a a nuestra boda 💍
        </p>

        {confirmado ? (
          <div className="text-green-600 font-semibold">
            ✅ Asistencia confirmada <br />
            ¡Gracias por acompañarnos!
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block mb-1">Cantidad de personas</label>
              <input
                type="number"
                min="1"
                max={invitado.maxAsistentes}
                value={asistentes}
                onChange={(e) => setAsistentes(Number(e.target.value))}
                className="border p-2 rounded w-full text-center"
              />
              {errorMsg && (
                <div className="text-red-600 text-sm mt-2">
                  ❌ {errorMsg}
                </div>
              )}

              <p className="text-sm text-gray-500 mt-1">
                Podés confirmar hasta {invitado.maxAsistentes} personas
              </p>
            </div>

            <button
              onClick={confirmar}
              className="bg-black text-white w-full py-2 rounded hover:opacity-90"
            >
              Confirmar asistencia
            </button>
          </>
        )}

      </div>
    </div>
  );
};

export default Invitacion;