import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { startQuiz, submitQuiz } from "../api/quizApi";

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const data = await startQuiz(3);
        setQuestions(data);
      } catch {
        setError("⚠️ Failed to load quiz.");
      }
    };
    fetchQuiz();
  }, []);

  const handleChange = (qid, oid) => {
    setAnswers((prev) => ({ ...prev, [qid]: oid }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please log in first!");
      navigate("/login");
      return;
    }
    try {
      const result = await submitQuiz(answers);
      navigate("/result", { state: { result } });
    } catch {
      alert("⚠️ Failed to submit quiz.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">📝 Take the Quiz</h2>

        {error && (
          <div className="bg-red-100 text-red-600 px-4 py-2 rounded mb-4">
            {error}
          </div>
        )}

        <div className="space-y-6">
          {questions.map((q) => (
            <div key={q.id} className="bg-white shadow rounded-xl p-4 border">
              <h3 className="text-lg font-semibold text-gray-700 mb-3">{q.text}</h3>
              <div className="space-y-2">
                {q.options.map((opt) => (
                  <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={opt.id}
                      checked={answers[q.id] === opt.id}
                      onChange={() => handleChange(q.id, opt.id)}
                      className="h-4 w-4 text-indigo-600 border-gray-300"
                    />
                    <span className="text-gray-600">{opt.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-8 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 rounded-xl shadow transition"
        >
          Submit Quiz
        </button>
      </div>
    </div>
  );
}
