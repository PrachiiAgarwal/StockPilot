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

      {/* Header */}

      <div>

        <h1 className="text-2xl font-bold text-white sm:text-3xl">
          Stock Movement History
        </h1>

        <p className="mt-2 text-sm text-slate-400 sm:text-base">
          Track every inventory change.
        </p>

      </div>

      {/* Loading */}

      {loading ? (

        <div className="rounded-xl border border-slate-800 bg-slate-950 p-8 text-center text-slate-400 sm:p-10">
          Loading...
        </div>

      ) : (

        <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">

          <table className="min-w-[850px] w-full">

            <thead className="border-b border-slate-800 bg-slate-900">

              <tr>

                <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-semibold text-slate-300 lg:px-6">
                  Type
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-semibold text-slate-300 lg:px-6">
                  Product
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-semibold text-slate-300 lg:px-6">
                  Previous
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-semibold text-slate-300 lg:px-6">
                  New
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-semibold text-slate-300 lg:px-6">
                  Difference
                </th>

                <th className="whitespace-nowrap px-4 py-4 text-left text-sm font-semibold text-slate-300 lg:px-6">
                  Date
                </th>

              </tr>

            </thead>

            <tbody>

              {movements.map(
                (movement) => (
                  <tr
                    key={movement._id}
                    className="border-b border-slate-800 transition hover:bg-slate-900"
                  >

                    <td className="whitespace-nowrap px-4 py-4 lg:px-6">

                      <div className="flex items-center gap-2">

                        {getIcon(
                          movement.type
                        )}

                        <span className="font-medium text-white">
                          {movement.type}
                        </span>

                      </div>

                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-white lg:px-6">
                      {movement.productName}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-slate-300 lg:px-6">
                      {
                        movement.previousQuantity
                      }
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-slate-300 lg:px-6">
                      {movement.newQuantity}
                    </td>

                    <td
                      className={`whitespace-nowrap px-4 py-4 font-medium lg:px-6 ${
                        movement.quantity >= 0
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {movement.quantity > 0
                        ? `+${movement.quantity}`
                        : movement.quantity}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-slate-300 lg:px-6">
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