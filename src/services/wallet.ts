import api from "./api";
import type { WalletDeposit } from "../types/wallet";


export const getWalletDeposits = async (): Promise<
  WalletDeposit[]
> => {
  const response = await api.get("/wallet/deposits");
  return response.data;
};