import api from "./api.js";

/**
 * Fetch transaction metrics summary (Total, Pending, Paid)
 * GET /admin/transactions/summary
 */
export const getTransactionsSummary = async () => {
  try {
    const response = await api.get("/admin/transactions/summary");
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction summary:", error);
    throw error;
  }
};

/**
 * Fetch all main ledger transactions
 * GET /admin/transactions
 */
export const getAllTransactions = async () => {
  try {
    const response = await api.get("/admin/transactions");
    return response.data;
  } catch (error) {
    console.error("Error fetching transaction list:", error);
    throw error;
  }
};

/**
 * Mark a transaction record as paid
 * PATCH /admin/transactions/{id}/mark-paid
 */
export const markTransactionPaid = async (id) => {
  try {
    const response = await api.patch(`/admin/transactions/${id}/mark-paid`);
    return response.data;
  } catch (error) {
    console.error("Error marking transaction as paid:", error);
    throw error;
  }
};

/**
 * Waive a transaction/commission fee
 * PATCH /admin/transactions/{id}/waive
 */
export const waiveTransaction = async (id) => {
  try {
    const response = await api.patch(`/admin/transactions/${id}/waive`);
    return response.data;
  } catch (error) {
    console.error("Error waiving transaction:", error);
    throw error;
  }
};

/* export const getTransactions = async () => {
  const response = await api.get("/transactions");
  return response.data;
}
*/