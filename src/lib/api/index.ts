import axios from "axios";
import { urlKeys } from "@/constants";

const axiosConfig = {
  baseURL: urlKeys.baseUrlWithCors,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 8000,
};

const apiClient = axios.create(axiosConfig);

export async function get<T>(url: string): Promise<T> {
  const { data } = await apiClient.get<T>(url);
  return data;
}

export async function post<S, T>(url: string, body: S): Promise<T> {
  const { data } = await apiClient.post<T>(url, body);
  return data;
}
