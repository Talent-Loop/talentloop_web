export interface ServiceCategory {
  _id: string;
  name: string;
  description: string;
  workersCount: number;
  isPopular?: boolean;
}

export interface CategoriesResponse {
  popular: ServiceCategory[];
  all: ServiceCategory[];
  total: number;
}