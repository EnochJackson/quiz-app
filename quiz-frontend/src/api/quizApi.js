// src/api/quizApi.js
import axios from "axios";

const quizApi = axios.create({
  baseURL: "http://localhost:8080/api/quiz", // backend base
});

// 🔑 Attach token automatically from localStorage
quizApi.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


// --- API functions ---

// ✅ Start quiz
export const startQuiz = async (count) => {
  const res = await quizApi.get(`/start?count=${count}`);
  return res.data;
};

// ✅ Submit quiz (correct endpoint now!)
export const submitQuiz = async (answers) => {
  const res = await quizApi.post("/submit", answers); // ✅ no userId param
  return res.data;
};

export default quizApi;
