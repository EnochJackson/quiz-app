import React, { useState, useEffect } from "react";
import {
  addQuestion,
  updateQuestion,
  getQuestions,
  deleteQuestion,
  getUsers,
  deleteUser,
} from "../api/adminApi";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("questions"); // "questions" | "users"
  const [message, setMessage] = useState("");

  // ============================
  // Question State
  // ============================
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([
    { text: "", correct: false },
    { text: "", correct: false },
  ]);
  const [questions, setQuestions] = useState([]);
  const [editingId, setEditingId] = useState(null);

  // ============================
  // User State
  // ============================
  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (activeTab === "questions") loadQuestions();
    if (activeTab === "users") loadUsers();
  }, [activeTab]);

  // ====== Question Handlers ======
  const loadQuestions = async () => {
    const data = await getQuestions();
    setQuestions(data);
  };

  const handleOptionChange = (i, field, value) => {
    const updated = [...options];
    updated[i][field] = value;
    setOptions(updated);
  };

  const handleAddOption = () => {
    setOptions([...options, { text: "", correct: false }]);
  };

  const handleSubmitQuestion = async () => {
    try {
      const question = { text: questionText, options };
      if (editingId) {
        await updateQuestion(editingId, question);
        setMessage("✅ Question updated successfully!");
      } else {
        await addQuestion(question);
        setMessage("✅ Question added successfully!");
      }
      setQuestionText("");
      setOptions([{ text: "", correct: false }, { text: "", correct: false }]);
      setEditingId(null);
      loadQuestions();
    } catch {
      setMessage("❌ Failed to save question");
    }
  };

  const handleEditQuestion = (q) => {
    setEditingId(q.id);
    setQuestionText(q.text);
    setOptions(q.options || []);
  };

  const handleDeleteQuestion = async (id) => {
    await deleteQuestion(id);
    loadQuestions();
  };

  // ====== User Handlers ======
  const loadUsers = async () => {
    const data = await getUsers();
    setUsers(data);
  };

  const handleDeleteUser = async (id, role) => {
    if (role === "ADMIN") {
      setMessage("❌ Cannot delete ADMIN user");
      return;
    }
    await deleteUser(id);
    loadUsers();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-6">
        {/* Tabs */}
        <div className="flex justify-around mb-6 border-b">
          <button
            onClick={() => setActiveTab("questions")}
            className={`pb-2 px-4 ${
              activeTab === "questions"
                ? "border-b-2 border-indigo-600 font-bold text-indigo-600"
                : "text-gray-600"
            }`}
          >
            📋 Manage Questions
          </button>
          <button
            onClick={() => setActiveTab("users")}
            className={`pb-2 px-4 ${
              activeTab === "users"
                ? "border-b-2 border-indigo-600 font-bold text-indigo-600"
                : "text-gray-600"
            }`}
          >
            👥 Manage Users
          </button>
        </div>

        {message && (
          <p className="mb-4 px-4 py-2 rounded bg-blue-100 text-blue-700">
            {message}
          </p>
        )}

        {/* ===================== */}
        {/* Question Management */}
        {/* ===================== */}
        {activeTab === "questions" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              {editingId ? "✏️ Edit Question" : "➕ Add New Question"}
            </h2>

            <input
              type="text"
              placeholder="Question text"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              className="w-full border rounded-xl px-4 py-3 mb-4 focus:ring-2 focus:ring-indigo-500"
            />

            <h3 className="font-semibold text-gray-700 mb-2">Options</h3>
            {options.map((opt, i) => (
              <div key={i} className="flex items-center gap-2 mb-2">
                <input
                  type="text"
                  placeholder={`Option ${i + 1}`}
                  value={opt.text}
                  onChange={(e) => handleOptionChange(i, "text", e.target.value)}
                  className="flex-1 border rounded-xl px-4 py-2"
                />
                <label className="flex items-center gap-1 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    checked={opt.correct}
                    onChange={(e) =>
                      handleOptionChange(i, "correct", e.target.checked)
                    }
                  />
                  Correct
                </label>
              </div>
            ))}

            <button
              onClick={handleAddOption}
              className="text-indigo-600 hover:underline mb-4"
            >
              + Add Option
            </button>

            <button
              onClick={handleSubmitQuestion}
              className="w-full bg-indigo-600 text-white py-3 rounded-xl hover:bg-indigo-700 transition"
            >
              {editingId ? "Update Question" : "Save Question"}
            </button>

            <h2 className="text-xl font-bold mt-8 mb-4 text-gray-800">
              📋 All Questions
            </h2>
            <ul className="space-y-3">
              {questions.map((q) => (
                <li
                  key={q.id}
                  className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-xl"
                >
                  <span className="font-medium text-gray-700">{q.text}</span>
                  <div className="space-x-2">
                    <button
                      onClick={() => handleEditQuestion(q)}
                      className="px-3 py-1 bg-yellow-400 rounded-lg text-white hover:bg-yellow-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteQuestion(q.id)}
                      className="px-3 py-1 bg-red-500 rounded-lg text-white hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* ===================== */}
        {/* User Management */}
        {/* ===================== */}
        {activeTab === "users" && (
          <>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">👥 All Users</h2>
            <ul className="space-y-3">
              {users.map((u) => (
                <li
                  key={u.id}
                  className="flex justify-between items-center bg-gray-100 px-4 py-3 rounded-xl"
                >
                  <span className="font-medium text-gray-700">
                    {u.username}{" "}
                    <span className="text-sm text-gray-500">({u.role})</span>
                  </span>
                  <button
                    onClick={() => handleDeleteUser(u.id, u.role)}
                    className="px-3 py-1 bg-red-500 rounded-lg text-white hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
