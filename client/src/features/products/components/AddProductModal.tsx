import ProductForm from "./ProductForm";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddProductModal({
  isOpen,
  onClose,
}: AddProductModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-4xl rounded-xl border border-slate-700 bg-slate-900 shadow-2xl">

        <div className="flex items-center justify-between border-b border-slate-700 p-6">

          <h2 className="text-2xl font-bold text-white">
            Add Product
          </h2>

          <button
            onClick={onClose}
            className="text-3xl text-slate-400 transition hover:text-white"
          >
            ×
          </button>

        </div>

        <div className="p-6">
          <ProductForm />
        </div>

      </div>
    </div>
  );
}

export default AddProductModal;