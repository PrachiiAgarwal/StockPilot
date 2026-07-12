import { useForm } from "react-hook-form";
import { createProduct } from "../services/product.service";

interface ProductFormData {
  productName: string;
  sku: string;
  barcode: string;
  category: string;
  supplier: string;
  warehouse: string;
  quantity: number;
  unitPrice: number;
  reorderLevel: number;
  expiryDate: string;
  status: string;
}

interface ProductFormProps {
  onSuccess: () => void;
}

function ProductForm({ onSuccess }: ProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    defaultValues: {
      status: "Active",
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    try {
      await createProduct(data);

      reset();

      onSuccess();
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          "Failed to create product."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <div className="grid grid-cols-2 gap-4">

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Product Name
          </label>

          <input
            {...register("productName", {
              required: "Product Name is required",
            })}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
          />

          {errors.productName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.productName.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            SKU
          </label>

          <input
            {...register("sku", {
              required: "SKU is required",
            })}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
          />

          {errors.sku && (
            <p className="mt-1 text-sm text-red-500">
              {errors.sku.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Barcode
          </label>

          <input
            {...register("barcode")}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Category
          </label>

          <input
            {...register("category")}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Supplier
          </label>

          <input
            {...register("supplier")}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Warehouse
          </label>

          <input
            {...register("warehouse")}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Quantity
          </label>

          <input
            type="number"
            {...register("quantity", {
              required: true,
              valueAsNumber: true,
            })}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Unit Price
          </label>

          <input
            type="number"
            {...register("unitPrice", {
              required: true,
              valueAsNumber: true,
            })}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Reorder Level
          </label>

          <input
            type="number"
            {...register("reorderLevel", {
              required: true,
              valueAsNumber: true,
            })}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300">
            Expiry Date
          </label>

          <input
            type="date"
            {...register("expiryDate")}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div className="col-span-2">
          <label className="mb-2 block text-sm text-slate-300">
            Status
          </label>

          <select
            {...register("status")}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none focus:border-blue-500"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isSubmitting ? "Adding..." : "Add Product"}
        </button>
      </div>
    </form>
  );
}

export default ProductForm;