import api from "../../../lib/axios";

export interface DashboardStats {
  success: boolean;
  totalProducts: number;
  activeProducts: number;
  inactiveProducts: number;
  inventoryValue: number;
  lowStockProducts: number;
  expiringSoon: number;
  recentProducts: any[];
}

export const getDashboardStats = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get<DashboardStats>(
    "/dashboard/stats",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};