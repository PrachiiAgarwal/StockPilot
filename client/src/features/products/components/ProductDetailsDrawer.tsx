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
import type { ReactNode } from "react";

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
      {/* Overlay */}

      <div
        className="fixed inset-0 z-40 bg-black/60"
        onClick={onClose}
      />

      {/* Drawer */}

      <div className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-full flex-col border-l border-slate-700 bg-slate-950 shadow-2xl sm:max-w-md lg:max-w-lg">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-800 p-4 sm:p-6">

          <h2 className="text-xl font-bold text-white sm:text-2xl">
            Product Details
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="flex-1 space-y-6 overflow-y-auto p-4 sm:p-6">

          <InfoRow
            icon={
              <Package
                className="text-blue-400"
                size={22}
              />
            }
            label="Product"
            value={product.productName}
          />

          <InfoRow
            icon={
              <Tag
                className="text-green-400"
                size={22}
              />
            }
            label="SKU"
            value={product.sku}
          />

          <InfoRow
            icon={
              <Building2
                className="text-purple-400"
                size={22}
              />
            }
            label="Category"
            value={product.category}
          />

          <InfoRow
            icon={
              <Warehouse
                className="text-yellow-400"
                size={22}
              />
            }
            label="Warehouse"
            value={product.warehouse}
          />

          <InfoRow
            icon={
              <Boxes
                className="text-cyan-400"
                size={22}
              />
            }
            label="Supplier"
            value={product.supplier}
          />

          <InfoRow
            icon={
              <Boxes
                className="text-orange-400"
                size={22}
              />
            }
            label="Quantity"
            value={String(
              product.quantity
            )}
          />

          <InfoRow
            icon={
              <IndianRupee
                className="text-emerald-400"
                size={22}
              />
            }
            label="Unit Price"
            value={`₹${product.unitPrice}`}
          />

          <InfoRow
            icon={
              <AlertTriangle
                className="text-red-400"
                size={22}
              />
            }
            label="Reorder Level"
            value={String(
              product.reorderLevel
            )}
          />

          <InfoRow
            icon={
              <CalendarClock
                className="text-pink-400"
                size={22}
              />
            }
            label="Expiry Date"
            value={
              product.expiryDate
                ? new Date(
                    product.expiryDate
                  ).toLocaleDateString()
                : "N/A"
            }
          />

          <div>

            <p className="mb-2 text-sm text-slate-400">
              Status
            </p>

            <span
              className={`rounded-full px-3 py-1 text-sm font-medium ${
                product.status ===
                "Active"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {product.status}
            </span>

          </div>

        </div>

        {/* Footer */}

        <div className="flex flex-col gap-3 border-t border-slate-800 p-4 sm:flex-row sm:p-6">

          <button
            onClick={() =>
              onEdit(product)
            }
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

interface InfoRowProps {
  icon: ReactNode;
  label: string;
  value: string;
}

function InfoRow({
  icon,
  label,
  value,
}: InfoRowProps) {
  return (
    <div className="flex items-center gap-3">

      {icon}

      <div>

        <p className="text-sm text-slate-400">
          {label}
        </p>

        <p className="break-words text-white">
          {value}
        </p>

      </div>

    </div>
  );
}

export default ProductDetailsDrawer;