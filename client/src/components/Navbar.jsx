import { NavLink } from "react-router-dom";

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? "text-blue-400 font-semibold"
      : "text-gray-300 hover:text-white";

  return (
    <nav className="bg-gray-900 px-6 py-4 flex gap-6">
      <NavLink to="/" className={linkClass}>
        Dashboard
      </NavLink>
      <NavLink to="/add" className={linkClass}>
        Add Expense
      </NavLink>
      <NavLink to="/expenses" className={linkClass}>
        Expenses
      </NavLink>
      <NavLink to="/analytics" className={linkClass}>
        Analytics
      </NavLink>
    </nav>
  );
};

export default Navbar;
