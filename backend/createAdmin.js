import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/Admin.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const createAdmin = async () => {
  const hash = await bcrypt.hash("mateo2020", 10);

  const admin = new Admin({
    email: "nataliifernandez@gmail.com",
    password: hash,
  });

  await admin.save();
  console.log("Admin creado correctamente");
  process.exit();
};

createAdmin();