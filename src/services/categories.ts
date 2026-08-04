import api from "./api";
import type { CategoriesResponse } from "../types/category";

export const getCategories = async (
  category?: string,
  search?: string,
  sort?: string,
  limit = 20
): Promise<CategoriesResponse> => {
  const params: Record<string, any> = { limit };

  if (category) params.category = category;
  if (search) params.search = search;
  if (sort) params.sort = sort;

  const response = await api.get("/admin/services/all", {
    params,
  });

  return response.data.data;
};

export const getServiceCategories = async (): Promise<string[]> => {
  const response = await api.get("/services/categories");

  return response.data.data;
};