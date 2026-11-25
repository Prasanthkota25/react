// src/api/authApi.js
import axios from "axios";

const BASE = "http://localhost:8080/api";  // your Spring Boot URL

export const registerUser = (data) => axios.post(`${BASE}/auth/register`, data);
export const loginUser = (data) => axios.post(`${BASE}/auth/login`, data);
export const forgotPassword = (data) => axios.post(`${BASE}/auth/forgot-password`, data);