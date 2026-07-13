import { useEffect } from "react";
import { useForm } from "react-hook-form";

import {
  createProduct,
  updateProduct,
} from "../services/product.service";

import type {
  Product,
  ProductFormData,
} from "../types/product.types";

interface ProductFormProps {
  product?: Product | null;
  onSuccess: () => void;
}

function ProductForm({
  product,
  onSuccess,
}: ProductFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<ProductFormData>({
    defaultValues: {
      productName: "",
      sku: "",
      category: "",
      supplier: "",
      warehouse: "",
      quantity: undefined,
      unitPrice: undefined,
      reorderLevel: undefined,
      expiryDate: "",
      status: "Active",
    },
  });

  useEffect(() => {
    if (product) {
      reset({
        productName:
          product.productName,
        sku: product.sku,
        category:
          product.category,
        supplier:
          product.supplier,
        warehouse:
          product.warehouse,
        quantity:
          product.quantity,
        unitPrice:
          product.unitPrice,
        reorderLevel:
          product.reorderLevel,
        expiryDate:
          product.expiryDate
            ? product.expiryDate.substring(
                0,
                10
              )
            : "",
        status: product.status,
      });
    } else {
      reset({
        productName: "",
        sku: "",
        category: "",
        supplier: "",
        warehouse: "",
        quantity: undefined,
        unitPrice: undefined,
        reorderLevel:
          undefined,
        expiryDate: "",
        status: "Active",
      });
    }
  }, [product, reset]);

  const onSubmit = async (
    data: ProductFormData
  ) => {
    try {
      if (product) {
        await updateProduct(
          product._id,
          data
        );
      } else {
        await createProduct(data);
      }

      reset();

      onSuccess();
    } catch (error: any) {
      alert(
        error?.response?.data
          ?.message ??
          "Something went wrong."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-5"
    >

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

        <div>

          <label className="mb-2 block text-sm text-slate-300">
            Product Name
          </label>

          <input
            {...register(
              "productName",
              {
                required:
                  "Product Name is required",
              }
            )}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-blue-500"
          />

          {errors.productName && (
            <p className="mt-1 text-sm text-red-500">
              {
                errors.productName
                  .message
              }
            </p>
          )}

        </div>

        <div>

          <label className="mb-2 block text-sm text-slate-300">
            SKU
          </label>

          <input
            {...register("sku", {
              required:
                "SKU is required",
            })}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-blue-500"
          />

          {errors.sku && (
            <p className="mt-1 text-sm text-red-500">
              {errors.sku.message}
            </p>
          )}

        </div>


        <div>

          <label className="mb-2 block text-sm text-slate-300">
            Category
          </label>

          <input
            {...register(
              "category"
            )}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-blue-500"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm text-slate-300">
            Supplier
          </label>

          <input
            {...register(
              "supplier"
            )}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-blue-500"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm text-slate-300">
            Warehouse
          </label>

          <input
            {...register(
              "warehouse"
            )}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-blue-500"
          />

        </div>
                <div>

          <label className="mb-2 block text-sm text-slate-300">
            Quantity
          </label>

          <input
            type="number"
            {...register("quantity", {
              valueAsNumber: true,
              required: true,
            })}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-blue-500"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm text-slate-300">
            Unit Price
          </label>

          <input
            type="number"
            {...register("unitPrice", {
              valueAsNumber: true,
              required: true,
            })}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-blue-500"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm text-slate-300">
            Reorder Level
          </label>

          <input
            type="number"
            {...register("reorderLevel", {
              valueAsNumber: true,
              required: true,
            })}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-blue-500"
          />

        </div>

        <div>

          <label className="mb-2 block text-sm text-slate-300">
            Expiry Date
          </label>

          <input
            type="date"
            {...register("expiryDate")}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-blue-500"
          />

        </div>

        <div className="md:col-span-2">

          <label className="mb-2 block text-sm text-slate-300">
            Status
          </label>

          <select
            {...register("status")}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 p-3 text-white outline-none transition focus:border-blue-500"
          >
            <option value="Active">
              Active
            </option>

            <option value="Inactive">
              Inactive
            </option>

          </select>

        </div>

      </div>

      <div className="flex justify-end">

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {isSubmitting
            ? product
              ? "Updating..."
              : "Adding..."
            : product
            ? "Update Product"
            : "Add Product"}
        </button>

      </div>

    </form>
  );
}

export default ProductForm;