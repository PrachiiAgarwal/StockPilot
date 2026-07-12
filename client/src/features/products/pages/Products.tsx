import { useEffect, useState } from "react";

import ProductTable from "../components/ProductTable";
import { getProducts } from "../services/product.service";
import type { Product } from "../types/product.types";

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Products
          </h1>

          <p className="mt-1 text-slate-400">
            Manage your inventory
          </p>
        </div>

        <button className="rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700">
          + Add Product
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        className="w-full rounded-lg border border-slate-700 bg-slate-900 p-3 text-white outline-none placeholder:text-slate-500"
      />

      {/* Product Table */}
      {loading ? (
        <div className="rounded-xl border border-slate-800 bg-slate-950 p-10 text-center text-slate-400">
          Loading products...
        </div>
      ) : (
        <ProductTable products={products} />
      )}
    </div>
  );
}

export default Products;