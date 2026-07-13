import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { useTheme } from "../contexts/ThemeContext";

function MainLayout() {
  const { theme } = useTheme();

  return (
    <div
      className={`flex h-screen transition-all duration-300 ${
        theme === "dark"
          ? "bg-slate-950"
          : "bg-slate-100"
      }`}
    >
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />

        <main
          className={`flex-1 overflow-y-auto p-8 transition-all duration-300 ${
            theme === "dark"
              ? "bg-slate-900"
              : "bg-slate-100"
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;