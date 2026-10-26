
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
  success: boolean;
  data: {
    data: ClientJob[];
    meta: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export async function getMyJobs(): Promise<ClientJob[]> {
  const response = await clientApi.get<MyJobsResponse>("/jobs/my-jobs", {
    params: {
      page: 1,
      limit: 20,
      sort: "-createdAt",
    },
  });

  return response.data.data.data;
}
