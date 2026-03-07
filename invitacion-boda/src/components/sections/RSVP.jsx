import { useState } from "react";
import axios from "axios";

const RSVP = ({ invitado, slug }) => {

  const [asistencia, setAsistencia] = useState(true);
  const [personas, setPersonas] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const enviar = async () => {

    if (!slug) {
      setError("Invitación inválida");
      return;
    }

    try {

      setLoading(true);
      setError("");

      await axios.post(
        `${import.meta.env.VITE_API_URL}/invitados/confirmar/${slug}`,
        {
          asistentes: asistencia ? personas : 0,
          mensaje
        }
      );

      setOk(true);

    } catch (err) {

      console.error(err);
      setError("No se pudo enviar la confirmación");

    } finally {

      setLoading(false);

    }
  };

  return (
    <section className="p-10 bg-neutral-900 text-center">

      <h2 className="text-3xl mb-4 font-light">
        Confirmar asistencia
      </h2>

      {invitado && (
        <p className="mb-6 text-neutral-300">
          Invitación para <strong>{invitado.nombre}</strong>
        </p>
      )}

      {ok ? (

        <p className="text-green-400 text-lg">
          ¡Gracias por confirmar! 💚
        </p>

      ) : (

        <div className="flex flex-col gap-4 max-w-md mx-auto">

          <select
            className="p-2 text-black rounded"
            onChange={(e) => setAsistencia(e.target.value === "true")}
          >
            <option value="true">Asistiré</option>
            <option value="false">No podré asistir</option>
          </select>

          {asistencia && (

            <input
              type="number"
              min="1"
              max={invitado?.maxAsistentes || 5}
              className="p-2 text-black rounded"
              placeholder="Cantidad de personas"
              value={personas}
              onChange={(e) => setPersonas(e.target.value)}
            />

          )}

          <textarea
            className="p-2 text-black rounded"
            placeholder="Mensaje (opcional)"
            onChange={(e) => setMensaje(e.target.value)}
          />

          {error && (
            <p className="text-red-400 text-sm">
              {error}
            </p>
          )}

          <button
            onClick={enviar}
            disabled={loading}
            className="bg-white text-black py-2 rounded-xl hover:bg-gray-200 transition"
          >
            {loading ? "Enviando..." : "Enviar confirmación"}
          </button>

        </div>

      )}

    </section>
  );
};

export default RSVP;