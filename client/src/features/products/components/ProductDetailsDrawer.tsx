import {
  X,
  Package,
  Tag,
  Building2,
  Warehouse,
  Boxes,
  IndianRupee,
  CalendarClock,
  Pencil,
  Trash2,
  AlertTriangle,
} from "lucide-react";

import type { Product } from "../types/product.types";

interface ProductDetailsDrawerProps {
  isOpen: boolean;
  product: Product | null;
  onClose: () => void;
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

function ProductDetailsDrawer({
  isOpen,
  product,
  onClose,
  onEdit,
  onDelete,
}: ProductDetailsDrawerProps) {
  if (!isOpen || !product) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50"
        onClick={onClose}
      />

      <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-md flex-col border-l border-slate-700 bg-slate-950 shadow-2xl">

        <div className="flex items-center justify-between border-b border-slate-800 p-6">

          <h2 className="text-2xl font-bold text-white">
            Product Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={22} />
          </button>

        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-6">

          <div className="flex items-center gap-3">

            <Package
              className="text-blue-400"
              size={22}
            />

            <div>
              <p className="text-sm text-slate-400">
                Product
              </p>

              <p className="font-semibold text-white">
                {product.productName}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <Tag
              className="text-green-400"
              size={22}
            />

            <div>
              <p className="text-sm text-slate-400">
                SKU
              </p>

              <p className="text-white">
                {product.sku}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <Building2
              className="text-purple-400"
              size={22}
            />

            <div>
              <p className="text-sm text-slate-400">
                Category
              </p>

              <p className="text-white">
                {product.category}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <Warehouse
              className="text-yellow-400"
              size={22}
            />

            <div>
              <p className="text-sm text-slate-400">
                Warehouse
              </p>

              <p className="text-white">
                {product.warehouse}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <Boxes
              className="text-cyan-400"
              size={22}
            />

            <div>
              <p className="text-sm text-slate-400">
                Supplier
              </p>

              <p className="text-white">
                {product.supplier}
              </p>
            </div>

          </div>
                    <div className="flex items-center gap-3">

            <Boxes
              className="text-orange-400"
              size={22}
            />

            <div>
              <p className="text-sm text-slate-400">
                Quantity
              </p>

              <p className="text-white">
                {product.quantity}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <IndianRupee
              className="text-emerald-400"
              size={22}
            />

            <div>
              <p className="text-sm text-slate-400">
                Unit Price
              </p>

              <p className="text-white">
                ₹{product.unitPrice}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <AlertTriangle
              className="text-red-400"
              size={22}
            />

            <div>
              <p className="text-sm text-slate-400">
                Reorder Level
              </p>

              <p className="text-white">
                {product.reorderLevel}
              </p>
            </div>

          </div>

          <div className="flex items-center gap-3">

            <CalendarClock
              className="text-pink-400"
              size={22}
            />

            <div>
              <p className="text-sm text-slate-400">
                Expiry Date
              </p>

              <p className="text-white">
                {product.expiryDate
                  ? new Date(
                      product.expiryDate
                    ).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>

          </div>

          <div>

            <p className="mb-2 text-sm text-slate-400">
              Status
            </p>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                product.status === "Active"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {product.status}
            </span>

          </div>

        </div>

        <div className="flex gap-3 border-t border-slate-800 p-6">

          <button
            onClick={() => onEdit(product)}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            <Pencil size={18} />
            Edit
          </button>

          <button
            onClick={() =>
              onDelete(product._id)
            }
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 py-3 font-medium text-white transition hover:bg-red-700"
          >
            <Trash2 size={18} />
            Delete
          </button>

        </div>

      </div>
    </>
  );
}

export default ProductDetailsDrawer;