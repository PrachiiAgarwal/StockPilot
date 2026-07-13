import {
  LayoutDashboard,
  Package,
  History,
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
  {
    title: "Stock History",
    icon: History,
    path: "/stock-history",
  },
];

function Sidebar() {
  return (
    <aside className="flex w-64 flex-col justify-between border-r border-slate-800 bg-slate-950">
      <div>
        <div className="border-b border-slate-800 p-6">
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
                  `mb-2 flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
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

      <div className="border-t border-slate-800 p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-slate-300 transition-all hover:bg-red-500 hover:text-white">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;