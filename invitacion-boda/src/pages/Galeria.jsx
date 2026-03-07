import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const Galeria = () => {
  const { linkUnico } = useParams();
  const [file, setFile] = useState(null);
  const [ok, setOk] = useState(false);

  const subir = async () => {
    const form = new FormData();
    form.append("foto", file);

    await api.post(`/fotos/${linkUnico}`, form);
    setOk(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f4ef]">
      <div className="bg-white p-8 rounded-xl shadow-lg text-center">

        <h2 className="text-xl font-bold mb-4">Subí tus fotos 📸</h2>

        <input
          type="file" accept="image/*" multiple
          onChange={(e) => setFile(e.target.files[0])}
          className="mb-4"
        />

        <button
          onClick={subir}
          className="bg-black text-white px-6 py-2 rounded"
        >
          Subir
        </button>

        {ok && <p className="mt-3 text-green-600">Foto subida ❤️</p>}

      </div>
    </div>
  );
};

export default Galeria;