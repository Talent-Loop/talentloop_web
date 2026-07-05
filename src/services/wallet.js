import api from "./api";

export const getWalletDeposits = async () => {
  const response = await api.get("/wallet/deposits");
  return response.data;
};