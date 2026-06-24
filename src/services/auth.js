import api from "./api";

// LOGIN
export const login = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};