import api from "../../../lib/axios";
import type { Product } from "../types/product.types";

interface ProductsResponse {
  success: boolean;
  count: number;
  products: Product[];
}

export const getProducts = async (): Promise<ProductsResponse> => {
  const token = localStorage.getItem("token");

  const response = await api.get<ProductsResponse>("/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};