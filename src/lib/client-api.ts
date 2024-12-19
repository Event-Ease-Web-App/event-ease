import { API_ENV } from "@/constants/env";
import axios, { InternalAxiosRequestConfig } from "axios";

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
  }
  return config;
}

export const api = axios.create({
  baseURL: API_ENV.baseURL + "/api",
});
api.interceptors.request.use(authRequestInterceptor);
