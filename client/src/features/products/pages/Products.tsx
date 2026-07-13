import { useEffect, useMemo, useState } from "react";

import ProductTable from "../components/ProductTable";
import AddProductModal from "../components/AddProductModal";
import ProductDetailsDrawer from "../components/ProductDetailsDrawer";

import {
  getProducts,
  deleteProduct,
} from "../services/product.service";

import type { Product } from "../types/product.types";

const PRODUCTS_PER_PAGE = 5;

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

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

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  const loadProducts = async () => {
    try {
      setLoading(true);

      const data = await getProducts();

      setProducts(data.products);
    } catch (error) {
      console.error(error);
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

  const handleDelete = async (
    id: string
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this product?"
      );

    if (!confirmDelete) return;

    try {
      await deleteProduct(id);

      setIsDrawerOpen(false);

      setViewProduct(null);

      await loadProducts();

      alert(
        "Product deleted successfully."
      );
    } catch (error: any) {
      alert(
        error?.response?.data?.message ||
          "Failed to delete product."
      );
    }
  };

  const filteredProducts =
    useMemo(() => {
      const query = searchTerm
        .toLowerCase()
        .trim();

      return products.filter(
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
    }, [
      products,
      searchTerm,
      statusFilter,
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

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-3xl font-bold text-white">
            Products
          </h1>

          <p className="mt-1 text-slate-400">
            Manage your inventory
          </p>

        </div>

        <button
          onClick={handleAdd}
          className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
        >
          + Add Product
        </button>

      </div>

      <div className="flex gap-4">

        <input
          type="text"
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(
              e.target.value
            )
          }
          placeholder="Search by Product, SKU or Category..."
          className="flex-1 rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none placeholder:text-slate-500"
        />

        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(
              e.target.value
            )
          }
          className="rounded-lg border border-slate-700 bg-slate-900 px-4 text-white outline-none"
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

      </div>
            {loading ? (
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-10 text-center text-slate-400">
          Loading products...
        </div>
      ) : (
        <ProductTable
          products={paginatedProducts}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      )}

      {!loading && totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">

          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.max(prev - 1, 1)
              )
            }
            disabled={currentPage === 1}
            className="rounded-lg border border-slate-700 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
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
                className={`rounded-lg px-4 py-2 transition ${
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
            className="rounded-lg border border-slate-700 px-4 py-2 text-white disabled:cursor-not-allowed disabled:opacity-50"
          >
            Next
          </button>

        </div>
      )}

      <AddProductModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProduct(null);
        }}
        onSuccess={handleProductSuccess}
        product={selectedProduct}
      />

      <ProductDetailsDrawer
        isOpen={isDrawerOpen}
        product={viewProduct}
        onClose={() => {
          setIsDrawerOpen(false);
          setViewProduct(null);
        }}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

    </div>
  );
}

export default Products;