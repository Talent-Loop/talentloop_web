import api from './api.js';

/**
 * GET ALL APPLICATIONS
 */
export const getAgentApplications = async () => {
  try {
    const response = await api.get('/admin/agents/applications');
    // Unwraps response data dynamically based on backend payload styles
    return response.data; 
  } catch (error) {
    console.error("Backend fetch failed directly:", error);
    throw error;
  }
};

export const approveAgentApplication = async (id) => {
  return (await api.patch(`/admin/agents/applications/${id}/approve`)).data;
};

export const rejectAgentApplication = async (id, reason) => {
  return (await api.patch(`/admin/agents/applications/${id}/reject`, { reason })).data;
};