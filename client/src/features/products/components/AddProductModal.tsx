import ProductForm from "./ProductForm";
import type { Product } from "../types/product.types";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product: Product | null;
}

function AddProductModal({
  isOpen,
  onClose,
  onSuccess,
  product,
}: AddProductModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-5">

      <div className="flex h-[95vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl sm:h-[90vh]">

        {/* Header */}

        <div className="flex items-center justify-between border-b border-slate-700 p-4 sm:p-6">

          <h2 className="text-xl font-bold text-white sm:text-2xl">
            {product
              ? "Edit Product"
              : "Add Product"}
          </h2>

          <button
            onClick={onClose}
            className="rounded-lg p-2 text-2xl text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            ×
          </button>

        </div>

        {/* Form */}

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">

          <ProductForm
            product={product}
            onSuccess={onSuccess}
          />

        </div>

      </div>

    </div>
  );
}

export default AddProductModal;