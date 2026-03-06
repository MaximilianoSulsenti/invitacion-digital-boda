import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Invitacion from "../pages/Invitacion";
import LoginAdmin from "../auth/LoginAdmin";
import AdminDashboard from "../admin/AdminDashboard";
import Galeria from "../pages/Galeria";
import Salon from "../pages/Salon";
import AdminSalon from "../pages/AdminSalon";
import ProtectedRoute from "../components/ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      {/* 🌍 Invitación pública */}
      <Route path="/" element={<Home />} />
      <Route path="/i/:linkUnico" element={<Invitacion />} />

      {/* 🔐 Admin */}
      <Route path="/admin/login" element={<LoginAdmin />} />

      <Route
        path="/admin/panel"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/admin/salon" element= {<ProtectedRoute><AdminSalon /></ProtectedRoute>} /> 
      <Route path="/galeria/:linkUnico" element={<Galeria />} />
      <Route path="/salon" element={<Salon />} />


    </Routes>
  );
};

export default AppRouter;