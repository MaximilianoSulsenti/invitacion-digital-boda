import { Outlet } from "react-router-dom";
import AdminNavbar from "../AdminNavbar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />

      <div className="p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;