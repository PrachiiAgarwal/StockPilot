import api from "../../../lib/axios";

type LoginData = {
  email: string;
  password: string;
};

type LoginResponse = {
  success: boolean;
  message: string;
  token: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
  };
};

export const login = async (
  data: LoginData
): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    data
  );

  return response.data;
};