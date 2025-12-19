import React from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";


export default function Navbar() {
  const navigate = useNavigate();
  const { totalItems } = useCart();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex h-16 items-center justify-between">
           
          <div
            className="text-xl font-bold text-blue-600 cursor-pointer"
            onClick={() => navigate("/products")}
          >
            MyStore
          </div> 
          <div className="flex items-center gap-6">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }
            >
              Products
            </NavLink>

            <NavLink
              to="/products/cart"
              className={({ isActive }) =>
                isActive
                  ? "font-semibold text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              }
            >
              Cart ({totalItems})
            </NavLink>
          </div>
 
          <button
            onClick={handleLogout}
            className="rounded-md bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}