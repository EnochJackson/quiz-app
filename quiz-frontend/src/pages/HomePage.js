import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-6">⚡ Quiz App</h1>

        <div className="space-y-4">
          {token ? (
            <>
              <Link
                to="/quiz"
                className="block w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
              >
                Start Quiz
              </Link>

              {role === "ADMIN" && (
                <Link
                  to="/admin"
                  className="block w-full py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition"
                >
                  Admin Dashboard
                </Link>
              )}

              <button
                onClick={handleLogout}
                className="block w-full py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="block w-full py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
