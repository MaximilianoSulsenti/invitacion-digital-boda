import { useState } from "react";
import api from "../services/api";

const SalonFotos = () => {

  const [files, setFiles] = useState([]);
  const [preview, setPreview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [ok, setOk] = useState(false);

  const seleccionar = (e) => {

    const selected = Array.from(e.target.files);

    setFiles(selected);

    const previews = selected.map((file) =>
      URL.createObjectURL(file)
    );

    setPreview(previews);
  };

  const subir = async () => {

    if (files.length === 0) {
      alert("Elegí al menos una foto 📸");
      return;
    }

    try {

      setLoading(true);

      const form = new FormData();

      files.forEach((f) => {
        form.append("foto", f);
      });

      await api.post("/fotos", form, {

        onUploadProgress: (p) => {

          const percent = Math.round(
            (p.loaded * 100) / p.total
          );

          setProgress(percent);
        }

      });

      setOk(true);
      setFiles([]);
      setPreview([]);

    } catch (err) {

      console.error(err);
      alert("Error subiendo fotos");

    } finally {

      setLoading(false);

    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-[#f7f4ef]">

      <div className="bg-white p-8 rounded-xl shadow-lg text-center w-[350px]">

        <h2 className="text-xl font-bold mb-4">
          Subí fotos del evento 📸
        </h2>

        <p className="text-gray-500 mb-6">
          Escaneaste el QR de la mesa
        </p>

        <input
          type="file"
          accept="image/*"
          multiple
          onChange={seleccionar}
          className="mb-4"
        />

        {/* PREVIEW */}

        <div className="grid grid-cols-3 gap-2 mb-4">

          {preview.map((img, i) => (

            <img
              key={i}
              src={img}
              className="w-full h-20 object-cover rounded"
            />

          ))}

        </div>

        <button
          onClick={subir}
          disabled={loading}
          className="bg-black text-white px-6 py-2 rounded w-full"
        >
          {loading ? "Subiendo..." : "Subir fotos"}
        </button>

        {/* PROGRESS BAR */}

        {loading && (

          <div className="w-full bg-gray-200 rounded mt-4">

            <div
              className="bg-green-500 text-xs text-white text-center p-1 rounded"
              style={{ width: `${progress}%` }}
            >
              {progress}%
            </div>

          </div>

        )}

        {ok && (

          <p className="mt-3 text-green-600">
            Fotos enviadas ❤️
          </p>

        )}

      </div>

    </div>

  );
};

export default SalonFotos;