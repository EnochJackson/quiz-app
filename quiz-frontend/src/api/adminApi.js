// src/api/adminApi.js
import axios from "axios";

const adminApi = axios.create({
  baseURL: "http://localhost:8080/api/admin",
});

adminApi.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// ================== Questions API ==================
export const addQuestion = async (question) => {
  const res = await adminApi.post("/questions", question);
  return res.data;
};

export const updateQuestion = async (id, question) => {
  const res = await adminApi.put(`/questions/${id}`, question);
  return res.data;
};

export const getQuestions = async () => {
  const res = await adminApi.get("/questions");
  return res.data;
};

export const deleteQuestion = async (id) => {
  return adminApi.delete(`/questions/${id}`);
};

// ================== Users API ==================
export const getUsers = async () => {
  const res = await adminApi.get("/users");
  return res.data;
};

export const deleteUser = async (id) => {
  return adminApi.delete(`/users/${id}`);
};

export default adminApi;
