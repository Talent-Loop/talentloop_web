import axios from "axios";
import { API_BASE_URL } from "../config/env.js";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

export default api;