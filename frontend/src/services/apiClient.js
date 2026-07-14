import axios from "axios";
import { clearAuthSession, getAuthSession } from "../utils/authStorage";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api/v1",
  timeout: 15000,
  headers: {
    "Content-Type": "application/json"
  }
});

export const setAuthToken = (token) => {
  if (token) {
    apiClient.defaults.headers.common.Authorization = `Bearer ${token}`;
    return;
  }

  delete apiClient.defaults.headers.common.Authorization;
};

apiClient.interceptors.request.use((config) => {
  const session = getAuthSession();

  if (session?.token) {
    config.headers.Authorization = `Bearer ${session.token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      clearAuthSession();
      setAuthToken(null);
      window.dispatchEvent(new Event("auth:logout"));
    }

    const message = error.response?.data?.message || error.message || "Request failed";
    const apiError = new Error(message);
    apiError.status = error.response?.status;
    apiError.statusCode = error.response?.data?.statusCode || error.response?.status;
    apiError.requestId = error.response?.data?.requestId;
    apiError.data = error.response?.data;
    apiError.errors = error.response?.data?.errors || [];
    apiError.response = error.response;
    return Promise.reject(apiError);
  }
);

export default apiClient;
