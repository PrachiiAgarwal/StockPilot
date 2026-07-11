import { Bell, Search } from "lucide-react";

function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950 px-6">

      {/* Search Box */}
      <div className="relative w-96">

        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search products..."
          className="w-full rounded-lg border border-slate-700 bg-slate-900 py-2 pl-10 pr-4 text-white outline-none transition-all placeholder:text-slate-500 focus:border-blue-500"
        />

      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        <button className="relative text-slate-300 transition hover:text-white">

          <Bell size={22} />

          <span className="absolute -right-1 -top-1 h-2 w-2 rounded-full bg-red-500"></span>

        </button>

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
            P
          </div>

          <div>

            <p className="text-sm font-medium text-white">
              Prachi Agarwal
            </p>

            <p className="text-xs text-slate-400">
              Administrator
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;