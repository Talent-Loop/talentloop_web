export interface Transaction {
  _id: string;

  jobId: {
    _id: string;
    title: string;
    status: string;
    agreedPrice: number | null;
  };

  providerId: {
    _id: string;
    name?: string;
    email: string;
  };

  clientId: {
    _id: string;
    name?: string;
    email: string;
  };

  agentId: {
    _id: string;
    email: string;
  } | null;

  agreedPrice: number;
  commissionRate: number;
  commissionAmount: number;
  agentFee: number;
  platformNet: number;

  status: "paid" | "pending" | "waived";

  paidAt: string | null;
  paidBy: string | null;

  paymentReference: string | null;
  pendingReference: string | null;

  waivedAt: string | null;
  waivedBy: string | null;
  waivedReason: string | null;

  createdAt: string;
  updatedAt: string;
}