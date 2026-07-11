import { useEffect, useState } from "react";
import { getProducts } from "../services/product.service";

function Products() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.products);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-3xl font-bold text-white">
          Products
        </h1>

        <p className="text-slate-400">
          Manage your inventory
        </p>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-950 p-6">

        {products.length === 0 ? (
          <p className="text-slate-400">
            No products found.
          </p>
        ) : (
          <table className="w-full text-left">

            <thead>

              <tr className="border-b border-slate-700">

                <th className="py-3 text-slate-300">
                  Product
                </th>

                <th className="text-slate-300">
                  SKU
                </th>

                <th className="text-slate-300">
                  Quantity
                </th>

                <th className="text-slate-300">
                  Price
                </th>

              </tr>

            </thead>

            <tbody>

              {products.map((product) => (
                <tr
                  key={product._id}
                  className="border-b border-slate-800"
                >
                  <td className="py-4 text-white">
                    {product.productName}
                  </td>

                  <td className="text-slate-300">
                    {product.sku}
                  </td>

                  <td className="text-slate-300">
                    {product.quantity}
                  </td>

                  <td className="text-slate-300">
                    ₹{product.unitPrice}
                  </td>
                </tr>
              ))}

            </tbody>

          </table>
        )}

      </div>

    </div>
  );
}

export default Products;