import api from "../../../lib/axios";
import type { Product, ProductFormData } from "../types/product.types";

export interface ProductsResponse {
  success: boolean;
  count: number;
  products: Product[];
}

export interface ProductResponse {
  success: boolean;
  product: Product;
}

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};

// ======================
// Get All Products
// ======================

export const getProducts = async (): Promise<ProductsResponse> => {
  const response = await api.get<ProductsResponse>("/products", {
    headers: getAuthHeader(),
  });

  return response.data;
};

// ======================
// Create Product
// ======================

export const createProduct = async (
  product: ProductFormData
): Promise<ProductResponse> => {
  const response = await api.post<ProductResponse>(
    "/products",
    product,
    {
      headers: getAuthHeader(),
    }
  );

  return response.data;
};

// ======================
// Update Product
// ======================

export const updateProduct = async (
  id: string,
  product: ProductFormData
): Promise<ProductResponse> => {
  const response = await api.put<ProductResponse>(
    `/products/${id}`,
    product,
    {
      headers: getAuthHeader(),
    }
  );

  return response.data;
};

// ======================
// Delete Product
// ======================

export const deleteProduct = async (
  id: string
): Promise<{ success: boolean; message: string }> => {
  const response = await api.delete(
    `/products/${id}`,
    {
      headers: getAuthHeader(),
    }
  );

  return response.data;
};