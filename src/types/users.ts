export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
}
export interface UserQueryParams {
  page?: number;
  limit?: number;
  role?: string;
  banned?: string;
}