import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
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
      <Route path="/" element={<Home />} />
      <Route path="/:linkUnico" element={<Home />} /> {/* <-- Cambia Invitacion por Home */}
      <Route path="/salon" element={<Salon />} />
      <Route path="/fotos" element={<SalonFotos />} />
      <Route path="/admin/login" element={<LoginAdmin />} />
      <Route path="/galeria/:linkUnico" element={<Galeria />} />
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