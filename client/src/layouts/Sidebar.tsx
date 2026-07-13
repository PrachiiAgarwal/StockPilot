import {
  LayoutDashboard,
  Package,
  History,
  LogOut,
  X,
} from "lucide-react";

import {
  NavLink,
  useNavigate,
} from "react-router-dom";

import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const menuItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    path: "/dashboard",
  },
  {
    title: "Products",
    icon: Package,
    path: "/products",
  },
  {
    title: "Stock History",
    icon: History,
    path: "/stock-history",
  },
];

function Sidebar({
  isOpen,
  closeSidebar,
}: SidebarProps) {
  const navigate = useNavigate();

  const { theme } = useTheme();

  const { logout } = useAuth();

  const handleLogout = () => {
    logout();

    navigate("/login", {
      replace: true,
    });

    closeSidebar();
  };

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col justify-between border-r transition-all duration-300 lg:static lg:translate-x-0 ${
        isOpen
          ? "translate-x-0"
          : "-translate-x-full"
      } ${
        theme === "dark"
          ? "border-slate-800 bg-slate-950"
          : "border-slate-300 bg-white"
      }`}
    >
      <div>

        <div
          className={`flex items-center justify-between border-b p-6 ${
            theme === "dark"
              ? "border-slate-800"
              : "border-slate-300"
          }`}
        >
          <h1 className="text-3xl font-bold text-blue-600">
            StockPilot
          </h1>

          <button
            onClick={closeSidebar}
            className="lg:hidden"
          >
            <X
              size={26}
              className={
                theme === "dark"
                  ? "text-white"
                  : "text-slate-900"
              }
            />
          </button>

        </div>

        <nav className="mt-6 px-3">
                      {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : theme === "dark"
                      ? "text-slate-300 hover:bg-slate-800 hover:text-white"
                      : "text-slate-700 hover:bg-slate-200 hover:text-slate-900"
                  }`
                }
              >
                <Icon size={20} />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div
        className={`border-t p-4 ${
          theme === "dark"
            ? "border-slate-800"
            : "border-slate-300"
        }`}
      >
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-500 transition hover:bg-red-600 hover:text-white"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;