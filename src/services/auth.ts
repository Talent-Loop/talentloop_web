import api from "./api";
import type {
  LoginData,
  ResetPasswordData,
} from "../types/auth";

export const loginUser = async (data: LoginData) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/auth/logout");
  return response.data;
};

export const forgotPassword = async (email: string) => {
  const response = await api.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

export const resetPassword = async (
  data: ResetPasswordData
) => {
  const response = await api.patch(
    "/auth/reset-password",
    data
  );

  return response.data;
};