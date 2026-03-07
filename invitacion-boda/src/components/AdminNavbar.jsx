import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AdminNavbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">

      <div className="font-bold text-lg">
        Panel Admin 💍
      </div>

      <div className="flex gap-6 text-sm">

        <Link to="/admin/panel" className="hover:text-blue-500">
          Dashboard
        </Link>

        <Link to="/admin/salon" className="hover:text-blue-500">
          Admin Salón
        </Link>

        <Link to="/salon" className="hover:text-blue-500">
          Ver Salón
        </Link>

        <Link to="/fotos" className="hover:text-blue-500">
          Fotos
        </Link>

        <button
          onClick={logout}
          className="text-red-500 hover:text-red-700"
        >
          Salir
        </button>

      </div>

    </nav>
  );
};

export default AdminNavbar;