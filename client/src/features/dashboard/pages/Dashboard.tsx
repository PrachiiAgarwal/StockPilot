import {
  Package,
  IndianRupee,
  AlertTriangle,
  CalendarClock,
} from "lucide-react";

const stats = [
  {
    title: "Total Products",
    value: "24",
    icon: Package,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    title: "Inventory Value",
    value: "₹18,450",
    icon: IndianRupee,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    title: "Low Stock",
    value: "3",
    icon: AlertTriangle,
    color: "text-yellow-500",
    bg: "bg-yellow-500/10",
  },
  {
    title: "Expiring Soon",
    value: "5",
    icon: CalendarClock,
    color: "text-red-500",
    bg: "bg-red-500/10",
  },
];

function Dashboard() {
  return (
    <div className="space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Dashboard
        </h1>

        <p className="mt-1 text-slate-400">
          Welcome back! Here's an overview of your inventory.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-4">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-slate-800 bg-slate-950 p-6 shadow-lg"
            >
              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-400">
                    {item.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold text-white">
                    {item.value}
                  </h2>

                </div>

                <div
                  className={`rounded-xl p-3 ${item.bg}`}
                >
                  <Icon
                    size={28}
                    className={item.color}
                  />
                </div>

              </div>
            </div>
          );
        })}

      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">

        <h2 className="mb-4 text-xl font-semibold text-white">
          Recent Products
        </h2>

        <div className="rounded-lg border border-dashed border-slate-700 p-10 text-center text-slate-400">
          Product table will appear here after backend integration.
        </div>

      </div>

    </div>
  );
}

export default Dashboard;