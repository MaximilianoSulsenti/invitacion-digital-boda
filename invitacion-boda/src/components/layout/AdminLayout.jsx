import { Outlet } from "react-router-dom";
import AdminNavbar from "../AdminNavbar"; // Asegúrate de que AdminNavbar también sea responsive

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#FDFCF0]/50 flex flex-col">
      {/* Navbar Superior */}
      <AdminNavbar />

      {/* Contenedor del Contenido Dinámico */}
      <main className="flex-1 w-full max-w-7xl mx-auto p-4 md:p-8">
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <Outlet />
        </div>
      </main>

      {/* Un pequeño pie de página para el panel */}
      <footer className="py-6 text-center border-t border-[#B8860B]/5">
        <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400">
          Wedding Admin System &copy; 2026
        </p>
      </footer>
    </div>
  );
};

export default AdminLayout;