import api from "./api";

// GET ALL USERS
export const getUsers = async () => {
  const res = await api.get("/users");
  return res.data;
};

// GET SINGLE USER
export const getUser = async (id) => {
  const res = await api.get(`/users/${id}`);
  return res.data;
};

// BAN USER
export const banUser = async (id) => {
  const res = await api.patch(`/users/${id}/ban`);
  return res.data;
};

// UNBAN USER
export const unbanUser = async (id) => {
  const res = await api.patch(`/users/${id}/unban`);
  return res.data;
};