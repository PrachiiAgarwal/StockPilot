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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="flex h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-700 p-6">
          <h2 className="text-2xl font-bold text-white">
            {product ? "Edit Product" : "Add Product"}
          </h2>

          <button
            onClick={onClose}
            className="text-3xl text-slate-400 hover:text-white"
          >
            ×
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
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