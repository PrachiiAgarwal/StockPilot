import { Pencil, Trash2 } from "lucide-react";
import type { Product } from "../types/product.types";

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
  onView: (product: Product) => void;
}

function ProductTable({
  products,
  onEdit,
  onDelete,
  onView,
}: ProductTableProps) {
  const getExpiryStatus = (
    expiryDate?: string
  ) => {
    if (!expiryDate)
      return {
        text: "N/A",
        color: "text-slate-400",
      };

    const today = new Date();

    const expiry = new Date(expiryDate);

    const diff =
      (expiry.getTime() -
        today.getTime()) /
      (1000 * 60 * 60 * 24);

    if (diff < 0) {
      return {
        text: "Expired",
        color: "text-red-500",
      };
    }

    if (diff <= 30) {
      return {
        text: "Expiring Soon",
        color: "text-yellow-400",
      };
    }

    return {
      text: "Good",
      color: "text-green-400",
    };
  };

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
      <table className="min-w-full">
        <thead className="border-b border-slate-800 bg-slate-900">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Product
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              SKU
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Category
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Quantity
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Price
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Expiry
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Status
            </th>

            <th className="px-6 py-4 text-center text-sm font-semibold text-slate-300">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => {
            const expiry =
              getExpiryStatus(
                product.expiryDate
              );

            return (
              <tr
                key={product._id}
                onClick={() =>
                  onView(product)
                }
                className="cursor-pointer border-b border-slate-800 transition hover:bg-slate-900"
              >
                <td className="px-6 py-4 text-white">
                  {product.productName}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {product.sku}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {product.category}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {product.quantity}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  ₹{product.unitPrice}
                </td>

                <td
                  className={`px-6 py-4 font-semibold ${expiry.color}`}
                >
                  {expiry.text}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      product.status ===
                      "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>

                <td
                  className="px-6 py-4"
                  onClick={(e) =>
                    e.stopPropagation()
                  }
                >
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() =>
                        onEdit(product)
                      }
                      className="rounded-lg p-2 text-blue-400 hover:bg-blue-500/10"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() =>
                        onDelete(
                          product._id
                        )
                      }
                      className="rounded-lg p-2 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;