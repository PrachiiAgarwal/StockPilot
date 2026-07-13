import {
  Bell,
  Search,
  Moon,
  Sun,
} from "lucide-react";

import { useTheme } from "../contexts/ThemeContext";

function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const { theme, toggleTheme } =
    useTheme();

  return (
    <header
      className={`flex h-20 items-center justify-between border-b px-8 transition-all duration-300 ${
        theme === "dark"
          ? "border-slate-800 bg-slate-950"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="relative w-[420px]">
        <Search
          size={20}
          className={`absolute left-4 top-1/2 -translate-y-1/2 ${
            theme === "dark"
              ? "text-slate-400"
              : "text-slate-500"
          }`}
        />

        <input
          type="text"
          placeholder="Search products..."
          className={`w-full rounded-xl border py-3 pl-12 pr-4 outline-none transition ${
            theme === "dark"
              ? "border-slate-700 bg-slate-900 text-white focus:border-blue-500"
              : "border-slate-300 bg-slate-100 text-slate-900 focus:border-blue-500"
          }`}
        />
      </div>

      <div className="flex items-center gap-5">

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
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white">
            {user?.fullName
              ? user.fullName
                  .charAt(0)
                  .toUpperCase()
              : "U"}
          </div>

          <div>
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