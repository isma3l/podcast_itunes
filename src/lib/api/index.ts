import axios from "axios";

const CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
const BASE_URL = "https://itunes.apple.com";

const axiosConfig = {
  baseURL: `${CORS_PROXY}${BASE_URL}`,
  headers: {
    "Content-type": "application/json",
  },
  timeout: 5000,
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
