import { useEffect, useState } from "react";

import {
  ArrowDownCircle,
  ArrowUpCircle,
  Pencil,
  Trash2,
  Package,
} from "lucide-react";

import {
  getStockMovements,
  type StockMovement,
} from "../services/stockMovement.service";

function StockHistory() {
  const [loading, setLoading] =
    useState(true);

  const [movements, setMovements] =
    useState<StockMovement[]>([]);

  useEffect(() => {
    loadMovements();
  }, []);

  const loadMovements = async () => {
    try {
      const data =
        await getStockMovements();

      setMovements(data.movements);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case "CREATE":
        return (
          <Package
            size={18}
            className="text-blue-400"
          />
        );

      case "UPDATE":
        return (
          <Pencil
            size={18}
            className="text-yellow-400"
          />
        );

      case "DELETE":
        return (
          <Trash2
            size={18}
            className="text-red-400"
          />
        );

      case "IN":
        return (
          <ArrowUpCircle
            size={18}
            className="text-green-400"
          />
        );

      case "OUT":
        return (
          <ArrowDownCircle
            size={18}
            className="text-orange-400"
          />
        );

      default:
        return (
          <Package
            size={18}
            className="text-slate-400"
          />
        );
    }
  };

  return (
    <div className="space-y-6">

      <div>

        <h1 className="text-3xl font-bold text-white">
          Stock Movement History
        </h1>

        <p className="mt-1 text-slate-400">
          Track every inventory change.
        </p>

      </div>

      {loading ? (
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-10 text-center text-slate-400">
          Loading...
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">

          <table className="min-w-full">

            <thead className="border-b border-slate-800 bg-slate-900">

              <tr>

                <th className="px-6 py-4 text-left text-slate-300">
                  Type
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  Product
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  Previous
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  New
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  Difference
                </th>

                <th className="px-6 py-4 text-left text-slate-300">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {movements.map(
                (movement) => (
                  <tr
                    key={movement._id}
                    className="border-b border-slate-800"
                  >
                    <td className="px-6 py-4">

                      <div className="flex items-center gap-2">

                        {getIcon(
                          movement.type
                        )}

                        <span className="text-white">
                          {movement.type}
                        </span>

                      </div>

                    </td>

                    <td className="px-6 py-4 text-white">
                      {movement.productName}
                    </td>

                    <td className="px-6 py-4 text-slate-300">
                      {
                        movement.previousQuantity
                      }
                    </td>

                    <td className="px-6 py-4 text-slate-300">
                      {movement.newQuantity}
                    </td>

                    <td className="px-6 py-4 text-slate-300">
                      {movement.quantity > 0
                        ? `+${movement.quantity}`
                        : movement.quantity}
                    </td>

                    <td className="px-6 py-4 text-slate-300">
                      {new Date(
                        movement.createdAt
                      ).toLocaleString()}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </div>
      )}
    </div>
  );
}

export default StockHistory;