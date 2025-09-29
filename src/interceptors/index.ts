import axios, { type AxiosError } from "axios";
import { API_URL } from "@/config";
import type { Response } from "@/types";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("TOKEN_AUTH");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,

  (error: AxiosError<Response<unknown>>) => {
    const message = error.response?.data.description;
    return Promise.reject(new Error(message));
  }
);
