import api from "./api";
import type { UserQueryParams } from "../types/users";

export const getUsers = async ({
  page = 1,
  limit = 20,
  role = "",
  banned = "",
}: UserQueryParams = {}) => {
  const params: UserQueryParams = {
    page,
    limit,
  };

  if (role) {
    params.role = role;
  }

  if (banned !== "") {
    params.banned = banned;
  }

  const response = await api.get("/admin/users", {
    params,
  });

  return response.data;
};

export const banUser = async (userId: string) => {
  const response = await api.patch(
    `/admin/users/${userId}/ban`
  );

  return response.data;
};