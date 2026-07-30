import api from "./api";
import type { AgentApplication } from "../types/agentApplications";

export const getAgentApplications = async (
  page = 1,
  limit = 20,
  status?: string
) => {
  const params: Record<string, string | number> = {
    page,
    limit,
  };

  if (status) {
    params.status = status;
  }

  const response = await api.get<{
    success: boolean;
    data: {
      applications: AgentApplication[];
      total: number;
      page: number;
      totalPages: number;
    };
  }>("/admin/agents/applications", {
    params,
  });

  return response.data;
};

export const approveAgentApplication = async (id: string) => {
  const response = await api.patch(
    `/admin/agents/applications/${id}/approve`
  );

  return response.data;
};

export const rejectAgentApplication = async (
  id: string,
  reviewNote: string
) => {
  const response = await api.patch(
    `/admin/agents/applications/${id}/reject`,
    {
      reviewNote,
    }
  );

  return response.data;
};