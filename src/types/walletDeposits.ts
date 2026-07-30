export interface WalletDepositUser {
  _id: string;
  name: string;
  email: string;
}

export interface WalletDeposit {
  _id: string;
  userId: WalletDepositUser;
  type: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  proofImageUrl: string | null;
  proofImagePublicId: string | null;
  note: string;
  pendingReference: string;
  paystackReference: string | null;
  reviewedBy: string | null;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
}