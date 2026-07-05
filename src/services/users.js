import api from "./api";

export const getUsers = async (
  page = 1,
  limit = 20,
  role = "",
  banned = ""
) => {
  const params = {
    page,
    limit,
  };

  if (role) params.role = role;

  if (banned !== "") params.banned = banned;

  const response = await api.get("/admin/users", {
    params,
  });

  return response.data;
};

export const banUser = async (userId) => {
  const response = await api.patch(`/admin/users/${userId}/ban`);
  return response.data;
};