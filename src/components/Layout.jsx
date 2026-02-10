import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-800 text-gray-100 flex">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="flex-1 flex flex-col">
        {/* Top bar (mobile only) */}
        <header className="lg:hidden bg-gray-900 p-4 flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-white text-2xl"
          >
            ☰
          </button>
          <span className="ml-4 font-semibold">Expense App</span>
        </header>

        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
