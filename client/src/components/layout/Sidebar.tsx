import {
  LayoutDashboard,
  Package,
  FolderOpen,
  Truck,
  Warehouse,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

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
];

function Sidebar() {
  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between">

      <div>

        <div className="p-6 border-b border-slate-800">

          <h1 className="text-2xl font-bold text-blue-500">
            StockPilot
          </h1>

        </div>

        <nav className="mt-6 px-3">

          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.title}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-lg px-4 py-3 mb-2 transition-all
                  ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-800 hover:text-white"
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

      <div className="p-4 border-t border-slate-800">

        <button
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-300 hover:bg-red-500 hover:text-white transition-all"
        >
          <LogOut size={20} />

          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;