import jwt from "jsonwebtoken";

export default function (req, res, next) {
  const authHeader = req.header("Authorization");

  if (!authHeader) {
    return res.status(401).json({ msg: "Sin token" });
  }

  // Extraer token después de "Bearer "
  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ msg: "Formato de token inválido" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch {
    res.status(401).json({ msg: "Token inválido" });
  }
}