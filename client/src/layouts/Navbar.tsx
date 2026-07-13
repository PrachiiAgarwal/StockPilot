import {
  Bell,
  Menu,
  Moon,
  Sun,
} from "lucide-react";

import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

interface NavbarProps {
  openSidebar: () => void;
}

function Navbar({
  openSidebar,
}: NavbarProps) {
  const { theme, toggleTheme } =
    useTheme();

  const { user } = useAuth();

  return (
    <header
      className={`flex h-20 items-center justify-between border-b px-4 transition-all duration-300 sm:px-6 lg:px-8 ${
        theme === "dark"
          ? "border-slate-800 bg-slate-950"
          : "border-slate-200 bg-white"
      }`}
    >
      {/* Left */}

      <div className="flex items-center gap-4">

        <button
          onClick={openSidebar}
          className={`rounded-lg p-2 lg:hidden ${
            theme === "dark"
              ? "hover:bg-slate-800"
              : "hover:bg-slate-200"
          }`}
        >
          <Menu
            size={24}
            className={
              theme === "dark"
                ? "text-white"
                : "text-slate-900"
            }
          />
        </button>

        <h2
          className={`hidden text-2xl font-bold sm:block ${
            theme === "dark"
              ? "text-white"
              : "text-slate-900"
          }`}
        >
          StockPilot
        </h2>

      </div>

      {/* Right */}

      <div className="flex items-center gap-3 sm:gap-5">

        <button
          onClick={toggleTheme}
          className={`rounded-xl p-2 transition ${
            theme === "dark"
              ? "hover:bg-slate-800"
              : "hover:bg-slate-200"
          }`}
        >
          {theme === "dark" ? (
            <Sun
              size={22}
              className="text-yellow-400"
            />
          ) : (
            <Moon
              size={22}
              className="text-slate-700"
            />
          )}
        </button>

        <button
          className={`relative rounded-xl p-2 transition ${
            theme === "dark"
              ? "hover:bg-slate-800"
              : "hover:bg-slate-200"
          }`}
        >
          <Bell
            size={22}
            className={
              theme === "dark"
                ? "text-slate-300"
                : "text-slate-700"
            }
          />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-base font-semibold text-white sm:h-12 sm:w-12 sm:text-lg">
            {user?.fullName
              ? user.fullName
                  .charAt(0)
                  .toUpperCase()
              : "U"}
          </div>

          <div className="hidden sm:block">

            <p
              className={`font-semibold ${
                theme === "dark"
                  ? "text-white"
                  : "text-slate-900"
              }`}
            >
              {user?.fullName || "User"}
            </p>

            <p
              className={`text-sm ${
                theme === "dark"
                  ? "text-slate-400"
                  : "text-slate-500"
              }`}
            >
              Administrator
            </p>

          </div>

        </div>

      </div>
    </header>
  );
}

export default Navbar;