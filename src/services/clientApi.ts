
import axios, {
  type AxiosError,
  type InternalAxiosRequestConfig,
} from "axios";

const API_URL = "https://backend-talentloop.onrender.com/api/v1";

const clientApi = axios.create({
  baseURL: API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

type RetryableRequest = InternalAxiosRequestConfig & {
  _retry?: boolean;
};

let refreshPromise: Promise<string | null> | null = null;

clientApi.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
);

clientApi.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as
      | RetryableRequest
      | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry ||
      originalRequest.url?.includes("/auth/login") ||
      originalRequest.url?.includes("/auth/refresh-token")
    ) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      window.location.href = "/login";

      return Promise.reject(error);
    }

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .patch(
            `${API_URL}/auth/refresh-token`,
            { refreshToken },
            {
              headers: {
                "Content-Type": "application/json",
              },
              timeout: 15000,
            },
          )
          .then((response) => {
            const tokens = response.data?.data ?? response.data;

            const newAccessToken = tokens?.accessToken;
            const newRefreshToken = tokens?.refreshToken;

            if (!newAccessToken || !newRefreshToken) {
              throw new Error(
                "Refresh response did not include both tokens.",
              );
            }

            localStorage.setItem("accessToken", newAccessToken);
            localStorage.setItem("refreshToken", newRefreshToken);

            return newAccessToken as string;
          })
          .catch((refreshError: unknown) => {
            const refreshStatus = axios.isAxiosError(refreshError)
              ? refreshError.response?.status
              : undefined;

            if (refreshStatus === 401 || refreshStatus === 403) {
              localStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");

              if (
                window.location.pathname.startsWith("/dashboard")
              ) {
                window.location.href = "/login";
              }
            }

            return null;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccessToken = await refreshPromise;

      if (!newAccessToken) {
        return Promise.reject(error);
      }

      originalRequest.headers.Authorization =
        `Bearer ${newAccessToken}`;

      console.log("RETRYING JOB REQUEST WITH REFRESHED TOKEN");

      return clientApi(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  },
);

export default clientApi;
