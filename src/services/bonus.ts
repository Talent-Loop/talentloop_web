import api from "./api";

export const getBonusStats = async () => {
  const response = await api.get("/admin/bonus/admin/stats");
  return response.data;
};

export const getAllBonuses = async (
  page = 1,
  limit = 20,
  status?: string
) => {
  const params: Record<string, any> = {
    page,
    limit,
  };

  if (status) {
    params.status = status;
  }

  const response = await api.get("/admin/bonus/all", {
    params,
  });

  return response.data;
};

export const getAgents = async () => {
  const response = await api.get("/admin/users", {
    params: {
      role: "agent",
    },
  });

  return response.data;
};

export const assignBonus = async (data: {
  userId: string;
  type: string;
  amount: number;
  note: string;
}) => {
  const response = await api.post(
    "/admin/bonus/admin/assign",
    data
  );

  return response.data;
};