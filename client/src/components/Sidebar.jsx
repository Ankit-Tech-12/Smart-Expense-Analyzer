import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { logout } from "../features/auth/authSlice.js";
import { logoutUser } from "../api/auth.api.js";
import ConfirmModal from "./ConfirmModal.jsx";

const Sidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md transition ${isActive
      ? "bg-blue-600 text-white"
      : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

  const handleLogout = async () => {
    try {
      await logoutUser();

      dispatch(logout());

      setShowLogoutModal(false);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Overlay (mobile only) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed z-50 inset-y-0 left-0 w-64 bg-gray-900 p-4
        transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:fixed lg:min-h-screen`}
      >
        <h1 className="text-xl font-bold text-white mb-6">
          💰 Expense Analyzer
        </h1>

        <nav className="space-y-2">
          <NavLink to="/" onClick={onClose} className={linkClass}>
            Dashboard
          </NavLink>

          <NavLink to="/add" onClick={onClose} className={linkClass}>
            Add Expense
          </NavLink>

          <NavLink to="/expenses" onClick={onClose} className={linkClass}>
            Expenses
          </NavLink>

          <NavLink to="/analytics" onClick={onClose} className={linkClass}>
            Analytics
          </NavLink>
        </nav>

        <button
          onClick={() => setShowLogoutModal(true)}
          className="block w-full text-left px-4 py-2 rounded-md
          text-red-400 hover:bg-red-500/10 hover:text-red-300 transition"
        >
          Logout
        </button>
      </aside>

      {/* Logout Confirmation Modal */}
      <ConfirmModal
        show={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Sidebar;