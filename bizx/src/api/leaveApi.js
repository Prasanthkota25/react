// src/api/leaveApi.js
import axios from "axios";

const BASE = "http://localhost:8080/api";

export const applyLeave = (data, token) =>
  axios.post(`${BASE}/leave/apply`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getLeaveBalance = (year, token) =>
  axios.get(`${BASE}/leave/balance?year=${year}`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const getMyTeamLeave = (token) =>
  axios.get(`${BASE}/leave/team`, {
    headers: { Authorization: `Bearer ${token}` }
  });

export const approveRejectLeave = (leaveId, status, token) =>
  axios.put(`${BASE}/leave/${leaveId}/status`, { status }, {
    headers: { Authorization: `Bearer ${token}` }
  });