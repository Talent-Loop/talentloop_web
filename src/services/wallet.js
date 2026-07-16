import api from "./api.js";

/**
 * Fetch all pending wallet deposits
 * GET /admin/wallet/deposits
 */
export const getWalletDeposits = async () => {
HEAD
  try {
    const response = await api.get("/admin/wallet/deposits");
    return response.data;
  } catch (error) {
    console.error("Error fetching pending deposits:", error);
    throw error;
  }
};

/**
 * Approve deposit and credit wallet
 * PATCH /admin/wallet/deposits/{id}/approve
 */
export const approveDeposit = async (depositId) => {
  try {
    const response = await api.patch(`/admin/wallet/deposits/${depositId}/approve`);
    return response.data;
  } catch (error) {
    console.error("Error approving deposit:", error);
    throw error;
  }
};

/**
 * Rejects a manual deposit request
 * PATCH /admin/wallet/deposits/{id}/reject
 */
export const rejectDeposit = async (depositId) => {
  try {
    const response = await api.patch(`/admin/wallet/deposits/${depositId}/reject`);
    return response.data;
  } catch (error) {
    console.error("Error rejecting deposit:", error);
    throw error;
  }

  const response = await api.get("/wallet/deposits");
  return response.data;

};