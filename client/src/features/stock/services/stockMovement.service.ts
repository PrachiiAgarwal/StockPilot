import api from "../../../lib/axios";

export interface StockMovement {
  _id: string;
  productName: string;
  type: string;
  quantity: number;
  previousQuantity: number;
  newQuantity: number;
  createdAt: string;
}

export interface StockMovementResponse {
  success: boolean;
  count: number;
  movements: StockMovement[];
}

const getAuthHeader = () => {
  const token = localStorage.getItem("token");

  return {
    Authorization: `Bearer ${token}`,
  };
};

export const getStockMovements =
  async (): Promise<StockMovementResponse> => {
    const response =
      await api.get<StockMovementResponse>(
        "/stock-movements",
        {
          headers: getAuthHeader(),
        }
      );

    return response.data;
  };