import axios from "axios";
import { urlKeys } from "@/constants";

const axiosConfig = {
  baseURL: urlKeys.baseUrl,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 15000,
};

const apiClient = axios.create(axiosConfig);

export async function get<T>(url: string): Promise<T> {
  const { data } = await apiClient.get<T>(url);
  return data;
}
