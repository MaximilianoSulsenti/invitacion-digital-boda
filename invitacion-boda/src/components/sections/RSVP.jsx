import { useState } from "react";
import axios from "axios";

const RSVP = ({ linkUnico }) => {
  const [asistencia, setAsistencia] = useState(true);
  const [personas, setPersonas] = useState(1);
  const [mensaje, setMensaje] = useState("");
  const [ok, setOk] = useState(false);

  const enviar = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/confirmaciones`, {
        linkUnico,
        asistencia,
        personas,
        mensaje,
      });
      setOk(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="p-10 bg-neutral-900">
      <h2 className="text-2xl mb-4">Confirmar asistencia</h2>

      {ok ? (
        <p className="text-green-400">¡Confirmación enviada! 💚</p>
      ) : (
        <div className="flex flex-col gap-4 max-w-md">
          <select
            className="p-2 text-black"
            onChange={(e) => setAsistencia(e.target.value === "true")}
          >
            <option value="true">Asistiré</option>
            <option value="false">No podré asistir</option>
          </select>

          <input
            type="number"
            min="1"
            className="p-2 text-black"
            placeholder="Cantidad de personas"
            value={personas}
            onChange={(e) => setPersonas(e.target.value)}
          />

          <textarea
            className="p-2 text-black"
            placeholder="Mensaje"
            onChange={(e) => setMensaje(e.target.value)}
          />

          <button
            onClick={enviar}
            className="bg-white text-black py-2 rounded-xl hover:bg-gray-200"
          >
            Enviar confirmación
          </button>
        </div>
      )}
    </section>
  );
};

export default RSVP;