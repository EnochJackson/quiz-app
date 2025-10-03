import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/authApi";

export default function RegisterPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const data = await registerUser(username, password);
      if (data.error) {
        setError(data.error);
      } else {
        // ✅ Save token + role in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("role", data.role);

        // ✅ Redirect to dashboard/home directly (no need to login again)
        navigate("/");
      }
    } catch {
      setError("❌ Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          📝 Register
        </h2>
        {error && (
          <p className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4">
            {error}
          </p>
        )}
        <input
          className="w-full border rounded-xl px-4 py-3 mb-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full border rounded-xl px-4 py-3 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
        >
          Register
        </button>
      </div>
    </div>
  );
}
