import { v2 as cloudinary } from "cloudinary";

let cloudinaryConfigurado = false;

export const obtenerCloudinary = () => {
  if (cloudinaryConfigurado) return cloudinary;

  const cloudName = (process.env.CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME || "").trim();
  const apiKey = (process.env.CLOUD_API_KEY || process.env.CLOUDINARY_API_KEY || "").trim();
  const apiSecret = (process.env.CLOUD_API_SECRET || process.env.CLOUDINARY_API_SECRET || "").trim();

  const cloudNameValido = /^[a-z0-9-]+$/i.test(cloudName);

  if (!cloudName || !apiKey || !apiSecret || !cloudNameValido) {
    throw new Error(
      "Configuracion Cloudinary invalida. Verifica CLOUD_NAME/CLOUDINARY_CLOUD_NAME (sin espacios), CLOUD_API_KEY y CLOUD_API_SECRET."
    );
  }

  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });

  cloudinaryConfigurado = true;
  return cloudinary;
};

export default obtenerCloudinary;