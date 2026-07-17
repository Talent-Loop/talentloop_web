import api from "./api";
import type { Category } from "../types/categories";

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get("/categories");
  return response.data;
};