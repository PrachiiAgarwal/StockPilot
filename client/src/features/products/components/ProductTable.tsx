import type { Product } from "../types/product.types";

interface ProductTableProps {
  products: Product[];
}

function ProductTable({ products }: ProductTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-slate-800 bg-slate-950">
      <table className="min-w-full">
        <thead className="border-b border-slate-800 bg-slate-900">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Product
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              SKU
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Category
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Quantity
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Price
            </th>

            <th className="px-6 py-4 text-left text-sm font-semibold text-slate-300">
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td
                colSpan={6}
                className="px-6 py-10 text-center text-slate-400"
              >
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr
                key={product._id}
                className="border-b border-slate-800 hover:bg-slate-900 transition-colors"
              >
                <td className="px-6 py-4 text-white">
                  {product.productName}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {product.sku}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {product.category}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {product.quantity}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  ₹{product.unitPrice}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      product.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {product.status}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ProductTable;