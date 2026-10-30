
import clientApi from "./clientApi";

export interface ClientJob {
  _id?: string;
  id?: string;
  title: string;
  category?: string | { name?: string };
  service?: string | { name?: string };
  status: string;
  jobLocation?: string;
  location?: string;
  createdAt?: string;
  updatedAt?: string;

  providerId?: string | { _id?: string; id?: string };
  provider?:
    | string
    | {
        _id?: string;
        id?: string;
        name?: string;
        fullName?: string;
      };
}

interface MyJobsResponse {
  success?: boolean;
  data?: {
    data?: ClientJob[];
    meta?: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  } | ClientJob[];
}

export async function getMyJobs(): Promise<ClientJob[]> {
  const response = await clientApi.get<MyJobsResponse>("/jobs/my-jobs", {
    params: {
      page: 1,
      limit: 20,
      sort: "-createdAt",
    },
  });

  const payload = response.data?.data;

  // Handle either a direct array or a paginated response.
  if (Array.isArray(payload)) {
    return payload;
  }

  if (payload && Array.isArray(payload.data)) {
    return payload.data;
  }

  console.warn("Unexpected /jobs/my-jobs response:", response.data);
  return [];
}
