import { useState } from "react";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

import { useTheme } from "../contexts/ThemeContext";

function MainLayout() {
  const { theme } = useTheme();

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  return (
    <div
      className={`flex h-screen overflow-hidden transition-all duration-300 ${
        theme === "dark"
          ? "bg-slate-950"
          : "bg-slate-100"
      }`}
    >
      {/* Mobile Overlay */}

      {sidebarOpen && (
        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
        />
      )}

      {/* Sidebar */}

      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() =>
          setSidebarOpen(false)
        }
      />

      {/* Main Content */}

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">

        <Navbar
          openSidebar={() =>
            setSidebarOpen(true)
          }
        />

        <main
          className={`flex-1 overflow-y-auto p-4 transition-all duration-300 sm:p-6 lg:p-8 ${
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