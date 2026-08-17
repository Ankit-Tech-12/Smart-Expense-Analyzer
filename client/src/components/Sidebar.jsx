import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md transition ${
      isActive
        ? "bg-blue-600 text-white"
        : "text-gray-300 hover:bg-gray-700 hover:text-white"
    }`;

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
        lg:translate-x-0 lg:static lg:min-h-screen`}
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
      </aside>
    </>
  );
};

export default Sidebar;
