import axios, { InternalAxiosRequestConfig } from "axios";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
    const token = localStorage.getItem("EEWAtoken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}

export const api = axios.create({
  baseURL: "/api",
});

api.interceptors.request.use(authRequestInterceptor);
