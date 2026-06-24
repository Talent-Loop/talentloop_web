import api from "./api";

export const getWalletDeposits = async () => {
  const res = await api.get("/wallet/deposits");
  return res.data;
};