import api from "../../../lib/axios";

export const getProducts = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};