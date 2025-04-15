/* eslint-disable react-refresh/only-export-components */
import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
const URL = axios.create({
  baseURL: BASE_URL,
});

// ✅ Add Bearer token from localStorage to every request
URL.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default URL;
