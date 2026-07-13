import { useEffect, useState } from "react";

import {
  Package,
  IndianRupee,
  AlertTriangle,
  CalendarClock,
} from "lucide-react";

import { getDashboardStats } from "../services/dashboard.service";

function Dashboard() {
  const [loading, setLoading] =
    useState(true);

  const [stats, setStats] =
    useState<any>(null);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data =
        await getDashboardStats();

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
      value:
        stats?.totalProducts ?? 0,
      icon: Package,
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Inventory Value",
      value: `₹${
        stats?.inventoryValue ?? 0
      }`,
      icon: IndianRupee,
      color: "text-green-500",
      bg: "bg-green-500/10",
    },
    {
      title: "Low Stock",
      value:
        stats?.lowStockProducts ?? 0,
      icon: AlertTriangle,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
    },
    {
      title: "Expiring Soon",
      value:
        stats?.expiringSoon ?? 0,
      icon: CalendarClock,
      color: "text-red-500",
      bg: "bg-red-500/10",
    },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">

      {/* Heading */}

      <div>

        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Dashboard
        </h1>

        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Welcome back!
          Here's an overview of
          your inventory.
        </p>

      </div>

      {loading ? (

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-8 text-center text-slate-400 lg:p-10">
          Loading Dashboard...
        </div>

      ) : (

        <>

          {/* Dashboard Cards */}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

            {cards.map((item) => {

              const Icon = item.icon;

              return (

                <div
                  key={item.title}
                  className="rounded-xl border border-slate-800 bg-slate-950 p-5 shadow-lg transition hover:border-blue-500"
                >

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm text-slate-400">
                        {item.title}
                      </p>

                      <h2 className="mt-3 break-words text-2xl font-bold text-white sm:text-3xl">
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
                    {/* Expiry Alert */}

          {stats?.expiringSoon > 0 && (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-4 sm:p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle
                  className="mt-1 text-red-400"
                  size={24}
                />

                <div>
                  <h2 className="text-base font-semibold text-red-300 sm:text-lg">
                    Expiry Alert
                  </h2>

                  <p className="mt-1 text-sm text-slate-300 sm:text-base">
                    {stats.expiringSoon} product
                    {stats.expiringSoon > 1
                      ? "s are"
                      : " is"}{" "}
                    expiring within the next
                    30 days.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Recent Products */}

          <div className="rounded-xl border border-slate-800 bg-slate-950 p-4 sm:p-6">

            <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

              <h2 className="text-lg font-semibold text-white sm:text-xl">
                Recent Products
              </h2>

              <span className="text-sm text-slate-400">
                {stats?.recentProducts?.length ?? 0} Products
              </span>

            </div>

            {stats?.recentProducts?.length ===
            0 ? (

              <div className="rounded-lg border border-dashed border-slate-700 p-8 text-center text-slate-400 sm:p-10">
                No recent products found.
              </div>

            ) : (

              <div className="overflow-x-auto">

                <table className="min-w-[700px] w-full">

                  <thead className="border-b border-slate-800">

                    <tr>

                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">
                        Product
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">
                        SKU
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">
                        Category
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">
                        Quantity
                      </th>

                      <th className="px-4 py-3 text-left text-sm font-medium text-slate-300">
                        Price
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {stats.recentProducts.map(
                      (product: any) => (

                        <tr
                          key={product._id}
                          className="border-b border-slate-800 transition hover:bg-slate-900"
                        >

                          <td className="px-4 py-4 font-medium text-white">
                            {product.productName}
                          </td>

                          <td className="px-4 py-4 text-slate-300">
                            {product.sku}
                          </td>

                          <td className="px-4 py-4 text-slate-300">
                            {product.category}
                          </td>

                          <td className="px-4 py-4 text-slate-300">
                            {product.quantity}
                          </td>

                          <td className="px-4 py-4 text-slate-300">
                            ₹{product.unitPrice}
                          </td>

                        </tr>

                      )
                    )}

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