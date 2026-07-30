import api from "./api";

export const getWalletDeposits = () =>
  api.get("/admin/wallet/deposits");

export const approveWalletDeposit = (id: string) =>
  api.patch(`/admin/wallet/deposits/${id}/approve`);

export const rejectWalletDeposit = (
  id: string,
  reason: string
) =>
  api.patch(`/admin/wallet/deposits/${id}/reject`, {
    reason,
  });