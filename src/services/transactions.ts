import api from "./api";

export const getTransactions = async () => {
  const response = await api.get("/admin/transactions");
  return response.data;
};

export const getTransactionSummary = async () => {
  const response = await api.get("/admin/transactions/summary");
  return response.data;
};