export interface AgentApplication {
  _id: string;

  userId: {
    _id: string;
    name: string;
    email: string;
    phone: string;
    roleName?: string;
  };

  city: string;
  state: string;

  location: {
    type: string;
    coordinates: number[];
  };

  whyYouWantToBeAgent: string;
  experience: string;

  status: "pending" | "approved" | "rejected";

  reviewedBy?: {
    _id: string;
    name: string;
    email: string;
  } | null;

  reviewNote?: string | null;
  reviewedAt?: string | null;

  createdAt: string;
  updatedAt: string;
}