import axios, { AxiosError } from "axios";
import type { ErrorResponse } from "~/types/services";
import { getErrorMessageByStatus } from "~/utilities/error_utilities";

const BASE_URL_DEV = "http://localhost:3000/api/v1";
// const BASE_URL_PROD = "https://arxatec-service-production.up.railway.app/api/v1";

export const axiosInstance = axios.create({
  baseURL: BASE_URL_DEV,
});

axiosInstance.interceptors.request.use((config) => {
  const token = window.sessionStorage.getItem("TOKEN_AUTH");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ErrorResponse>) => {
    const status = error.response?.status;
    const message = getErrorMessageByStatus(status, error);

    return Promise.reject(new Error(message));
  }
);
