import axios from "axios";
import { BASE_API_URL } from "../config.js";

const API = axios.create({
  baseURL: BASE_API_URL, // URL base centralizada
  headers: { "Content-Type": "application/json" },
});

export default API;
