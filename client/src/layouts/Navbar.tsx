import { Bell, Search } from "lucide-react";

function Navbar() {
  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  return (
    <header className="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950 px-8">

      <div className="relative w-[420px]">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search products..."
          className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white outline-none transition focus:border-blue-500"
        />

      </div>

      <div className="flex items-center gap-6">

        <button className="relative rounded-lg p-2 transition hover:bg-slate-800">

          <Bell
            size={22}
            className="text-slate-300"
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

            <p className="font-semibold text-white">
              {user?.fullName || "User"}
            </p>

            <p className="text-sm text-slate-400">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;