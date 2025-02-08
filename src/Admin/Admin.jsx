import React, { useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react"; // ✅ Import Icons for Sidebar Toggle

function Admin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const menuItems = [
    { name: "Dashboard", path: "/admin" },
    { name: "Users", path: "/admin/users" },
    { name: "Products", path: "/admin/products" },
    { name: "Orders", path: "/admin/orders" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ✅ Sidebar */}
      <div
        className={`bg-gray-800 text-white w-64 p-4 space-y-6 fixed top-0 left-0 h-full transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Admin Panel</h2>
          <button
            className="lg:hidden text-white"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X size={24} />
          </button>
        </div>
        <ul className="space-y-4">
          {menuItems.map(({ name, path }) => (
            <li key={name}>
              <Link
                to={path}
                className={`block text-white px-4 py-2 rounded-md ${
                  location.pathname === path ? "bg-gray-700" : "hover:bg-gray-700"
                }`}
              >
                {name}
              </Link>
            </li>
          ))}
          <li>
            <button
              className="block w-full text-white px-4 py-2 rounded-md hover:bg-gray-700 mt-auto"
              onClick={handleLogout}
            >
              LogOut
            </button>
          </li>
        </ul>
      </div>

      {/* ✅ Main Content Area */}
      <div
        className={`flex-1 p-6 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}
      >
        {/* ✅ Toggle Sidebar Button */}
        <button
          className="lg:hidden p-2 rounded-md bg-gray-800 text-white mb-4"
          onClick={() => setIsSidebarOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* ✅ Nested Components (Users, Products, Orders, etc.) */}
        <Outlet />
      </div>
    </div>
  );
}

export default Admin;






        
        
        
        
        
        
        
        
        
        
