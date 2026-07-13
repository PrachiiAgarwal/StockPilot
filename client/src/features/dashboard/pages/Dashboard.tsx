import { useEffect, useState } from "react";

import {
  Package,
  IndianRupee,
  AlertTriangle,
  CalendarClock,
} from "lucide-react";

import { getDashboardStats } from "../services/dashboard.service";

function Dashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();

      setStats(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      title: "Total Products",
      value: stats?.totalProducts ?? 0,
      icon: Package,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Inventory Value",
      value: `₹${stats?.inventoryValue ?? 0}`,
      icon: IndianRupee,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Low Stock",
      value: stats?.lowStockProducts ?? 0,
      icon: AlertTriangle,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Expiring Soon",
      value: stats?.expiringSoon ?? 0,
      icon: CalendarClock,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
  ];

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

      {loading ? (
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-10 text-center text-slate-400">
          Loading Dashboard...
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 2xl:grid-cols-4">
            {cards.map((item) => {
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

                    <div className={`rounded-xl p-3 ${item.bg}`}>
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

          {stats?.expiringSoon > 0 && (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-5">
              <div className="flex items-center gap-3">
                <AlertTriangle
                  className="text-red-400"
                  size={24}
                />

                <div>
                  <h2 className="text-lg font-semibold text-red-300">
                    Expiry Alert
                  </h2>

                  <p className="text-slate-300">
                    {stats.expiringSoon} product
                    {stats.expiringSoon > 1 ? "s are" : " is"} expiring within the next 30 days.
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">
            <h2 className="mb-4 text-xl font-semibold text-white">
              Recent Products
            </h2>

            {stats?.recentProducts?.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-700 p-10 text-center text-slate-400">
                No recent products found.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="border-b border-slate-800">
                    <tr>
                      <th className="px-4 py-3 text-left text-slate-300">
                        Product
                      </th>

                      <th className="px-4 py-3 text-left text-slate-300">
                        SKU
                      </th>

                      <th className="px-4 py-3 text-left text-slate-300">
                        Category
                      </th>

                      <th className="px-4 py-3 text-left text-slate-300">
                        Quantity
                      </th>

                      <th className="px-4 py-3 text-left text-slate-300">
                        Price
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {stats.recentProducts.map((product: any) => (
                      <tr
                        key={product._id}
                        className="border-b border-slate-800"
                      >
                        <td className="px-4 py-3 text-white">
                          {product.productName}
                        </td>

                        <td className="px-4 py-3 text-slate-300">
                          {product.sku}
                        </td>

                        <td className="px-4 py-3 text-slate-300">
                          {product.category}
                        </td>

                        <td className="px-4 py-3 text-slate-300">
                          {product.quantity}
                        </td>

                        <td className="px-4 py-3 text-slate-300">
                          ₹{product.unitPrice}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;