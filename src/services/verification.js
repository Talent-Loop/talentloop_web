import api from "./api";

export const getVerifications = async () => {
  const response = await api.get("/verification");
  return response.data;
};