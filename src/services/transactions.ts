import api from "./api";
import type { Transaction } from "../types/transactions";

export const getTransactions = async (): Promise<Transaction[]> => {
  const response = await api.get("/transactions");
  return response.data;
};