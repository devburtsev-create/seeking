import axios from "axios";

export const apiClient = axios.create({
  baseURL: "https://seekingalpha.free.beeceptor.com",
  headers: { "Content-Type": "application/json" },
});
