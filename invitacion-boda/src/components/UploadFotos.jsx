import { useState } from "react";
import axios from "axios";

const UploadFotos = ({ linkUnico }) => {
  const [file, setFile] = useState(null);
  const [ok, setOk] = useState(false);

  const subir = async () => {
    const formData = new FormData();
    formData.append("foto", file);
    formData.append("linkUnico", linkUnico);

    try {
      await axios.post(`${import.meta.env.API_URL}/uploads`, formData);
      setOk(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section className="p-10">
      <h2 className="text-2xl mb-4">Compartí tus fotos 📸</h2>

      {ok ? (
        <p className="text-green-400">Foto subida correctamente 💚</p>
      ) : (
        <div className="flex flex-col gap-4 max-w-md">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <button
            onClick={subir}
            className="bg-white text-black py-2 rounded-xl"
          >
            Subir foto
          </button>
        </div>
      )}
    </section>
  );
};

export default UploadFotos;