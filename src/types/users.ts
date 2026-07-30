export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  roleName: string;
  banned: boolean;
  createdAt: string;
}

export interface UserQueryParams {
  page?: number;
  limit?: number;
  role?: string;
  banned?: string;
}