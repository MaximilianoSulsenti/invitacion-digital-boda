import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Invitacion from "../pages/Invitacion";
import LoginAdmin from "../auth/LoginAdmin";
import AdminDashboard from "../admin/AdminDashboard";
import Galeria from "../pages/Galeria";
import Salon from "../pages/Salon";
import AdminSalon from "../pages/AdminSalon";
import ProtectedRoute from "../components/ProtectedRoute";
import SalonFotos from "../pages/SalonFotos";
import AdminLayout from "../components/layout/AdminLayout";

const AppRouter = () => {
  return (
    <Routes>

      {/* 🌍 Público */}
      <Route path="/" element={<Home />} />
      <Route path="/i/:linkUnico" element={<Invitacion />} />
      <Route path="/galeria/:linkUnico" element={<Galeria />} />
      <Route path="/salon" element={<Salon />} />
      <Route path="/fotos" element={<SalonFotos />} />

      {/* 🔐 Login */}
      <Route path="/admin/login" element={<LoginAdmin />} />

      {/* 🔐 Panel Admin */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="panel" element={<AdminDashboard />} />
        <Route path="salon" element={<AdminSalon />} />
      </Route>

    </Routes>
  );
};

export default AppRouter;