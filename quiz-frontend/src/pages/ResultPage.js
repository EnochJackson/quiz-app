import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const result = location.state?.result;

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white shadow-lg rounded-2xl p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">⚠️ No result available</h2>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🏆 Quiz Result</h2>
        <p className="text-gray-700 text-lg mb-2">
          Total Questions: <span className="font-semibold">{result.totalQuestions}</span>
        </p>
        <p className="text-gray-700 text-lg mb-2">
          Correct Answers: <span className="font-semibold">{result.correctAnswers}</span>
        </p>
        <p className="text-gray-700 text-lg mb-6">
          Score: <span className="font-semibold">{result.score}%</span>
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-700 transition"
        >
          Go Home
        </button>
      </div>
    </div>
  );
}
