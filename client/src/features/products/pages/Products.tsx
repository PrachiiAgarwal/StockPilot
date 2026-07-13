import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import ProductTable from "../components/ProductTable";
import AddProductModal from "../components/AddProductModal";
import ProductDetailsDrawer from "../components/ProductDetailsDrawer";

import ConfirmModal from "../../../components/common/ConfirmModal";

import {
  getProducts,
  deleteProduct,
} from "../services/product.service";

import { downloadInventoryPDF } from "../services/pdf.service";

import type { Product } from "../types/product.types";

const PRODUCTS_PER_PAGE = 5;

function Products() {
  const [products, setProducts] =
    useState<Product[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [sortBy, setSortBy] =
    useState<
      "name" | "price" | "quantity"
    >("name");

  const [sortOrder, setSortOrder] =
    useState<"asc" | "desc">("asc");

  const [currentPage, setCurrentPage] =
    useState(1);

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState<Product | null>(null);

  const [isDrawerOpen, setIsDrawerOpen] =
    useState(false);

  const [viewProduct, setViewProduct] =
    useState<Product | null>(null);

  const [confirmOpen, setConfirmOpen] =
    useState(false);

  const [deleteId, setDeleteId] =
    useState<string | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchTerm,
    statusFilter,
    sortBy,
    sortOrder,
  ]);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data =
        await getProducts();

      setProducts(data.products);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load products."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleProductSuccess =
    async () => {
      setSelectedProduct(null);

      setIsModalOpen(false);

      setIsDrawerOpen(false);

      setViewProduct(null);

      await loadProducts();

      toast.success(
        "Product saved successfully."
      );
    };

  const handleAdd = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleView = (
    product: Product
  ) => {
    setViewProduct(product);
    setIsDrawerOpen(true);
  };

  const handleEdit = (
    product: Product
  ) => {
    setIsDrawerOpen(false);
    setViewProduct(null);

    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (
    id: string
  ) => {
    setDeleteId(id);
    setConfirmOpen(true);
  };

  const confirmDelete =
    async () => {
      if (!deleteId) return;

      try {
        await deleteProduct(deleteId);

        await loadProducts();

        setIsDrawerOpen(false);
        setViewProduct(null);

        toast.success(
          "Product deleted successfully."
        );
      } catch (error: any) {
        toast.error(
          error?.response?.data
            ?.message ??
            "Failed to delete product."
        );
      } finally {
        setDeleteId(null);
        setConfirmOpen(false);
      }
    };

  const filteredProducts =
    useMemo(() => {
      const query = searchTerm
        .toLowerCase()
        .trim();

      const filtered =
        products.filter(
          (product) => {
            const matchesSearch =
              product.productName
                .toLowerCase()
                .includes(query) ||
              product.sku
                .toLowerCase()
                .includes(query) ||
              product.category
                .toLowerCase()
                .includes(query);

            const matchesStatus =
              statusFilter === "All" ||
              product.status ===
                statusFilter;

            return (
              matchesSearch &&
              matchesStatus
            );
          }
        );

      filtered.sort((a, b) => {
        let comparison = 0;

        switch (sortBy) {
          case "name":
            comparison =
              a.productName.localeCompare(
                b.productName
              );
            break;

          case "price":
            comparison =
              a.unitPrice -
              b.unitPrice;
            break;

          case "quantity":
            comparison =
              a.quantity -
              b.quantity;
            break;
        }

        return sortOrder === "asc"
          ? comparison
          : -comparison;
      });

      return filtered;
    }, [
      products,
      searchTerm,
      statusFilter,
      sortBy,
      sortOrder,
    ]);

  const totalPages = Math.ceil(
    filteredProducts.length /
      PRODUCTS_PER_PAGE
  );

  const paginatedProducts =
    filteredProducts.slice(
      (currentPage - 1) *
        PRODUCTS_PER_PAGE,
      currentPage *
        PRODUCTS_PER_PAGE
    );

  return (
    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>

          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Products
          </h1>

          <p className="mt-2 text-sm text-slate-400 sm:text-base">
            Manage your inventory
          </p>

        </div>

        <div className="flex flex-col gap-3 sm:flex-row">

          <button
            onClick={() =>
              downloadInventoryPDF(
                filteredProducts
              )
            }
            className="w-full rounded-lg bg-emerald-600 px-5 py-3 text-white transition hover:bg-emerald-700 sm:w-auto"
          >
            Download PDF
          </button>

          <button
            onClick={handleAdd}
            className="w-full rounded-lg bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700 sm:w-auto"
          >
            + Add Product
          </button>

        </div>

      </div>

      {/* Filters */}

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">

        <input
          type="text"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          placeholder="Search..."
          className="rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none placeholder:text-slate-500 lg:col-span-2"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none"
        >
          <option value="All">
            All Status
          </option>

          <option value="Active">
            Active
          </option>

          <option value="Inactive">
            Inactive
          </option>
        </select>

        <div className="grid grid-cols-2 gap-3">

          <select
            value={sortBy}
            onChange={(e) =>
              setSortBy(
                e.target.value as
                  | "name"
                  | "price"
                  | "quantity"
              )
            }
            className="rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none"
          >
            <option value="name">
              Name
            </option>

            <option value="price">
              Price
            </option>

            <option value="quantity">
              Quantity
            </option>
          </select>

          <select
            value={sortOrder}
            onChange={(e) =>
              setSortOrder(
                e.target.value as
                  | "asc"
                  | "desc"
              )
            }
            className="rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none"
          >
            <option value="asc">
              Asc
            </option>

            <option value="desc">
              Desc
            </option>
          </select>

        </div>

      </div>
            {/* Product Table */}

      {loading ? (
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-10 text-center text-slate-400">
          Loading products...
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl">
          <ProductTable
            products={paginatedProducts}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            onView={handleView}
          />
        </div>
      )}

      {/* Pagination */}

      {!loading && totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2">

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.max(prev - 1, 1)
              )
            }
            disabled={currentPage === 1}
            className="rounded-lg border border-slate-700 px-4 py-2 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Previous
          </button>

          {Array.from(
            { length: totalPages },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() =>
                  setCurrentPage(index + 1)
                }
                className={`min-w-[42px] rounded-lg px-4 py-2 transition ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "border border-slate-700 text-white hover:bg-slate-800"
                }`}
              >
                {index + 1}
              </button>
            )
          )}

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(
                  prev + 1,
                  totalPages
                )
              )
            }
            disabled={
              currentPage === totalPages
            }
            className="rounded-lg border border-slate-700 px-4 py-2 text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>

        </div>
      )}

      {/* Add Product Modal */}

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onSuccess={
          handleProductSuccess
        }
        product={selectedProduct}
      />

      {/* Product Drawer */}

      <ProductDetailsDrawer
        isOpen={isDrawerOpen}
        product={viewProduct}
        onClose={() => {
          setIsDrawerOpen(false);
          setViewProduct(null);
        }}
        onEdit={handleEdit}
        onDelete={
          handleDeleteClick
        }
      />

      {/* Delete Confirmation */}

      <ConfirmModal
        isOpen={confirmOpen}
        title="Delete Product"
        message="Are you sure you want to delete this product? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={() => {
          setConfirmOpen(false);
          setDeleteId(null);
        }}
      />

    </div>
  );
}

export default Products;