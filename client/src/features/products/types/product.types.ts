export interface Product {
  _id: string;
  productName: string;
  sku: string;
  category: string;
  supplier: string;
  warehouse: string;
  quantity: number;
  unitPrice: number;
  reorderLevel: number;
  expiryDate: string;
  status: string;
}

export interface ProductFormData {
  productName: string;
  sku: string;
  category: string;
  supplier: string;
  warehouse: string;
  quantity: number;
  unitPrice: number;
  reorderLevel: number;
  expiryDate: string;
  status: string;
}