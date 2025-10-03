import React, { useState } from "react";
import quizApi from "../api/quizApi";

const res = await quizApi.get("/quiz/start?count=3");

function QuizQuestion({ questions, onSubmit }) {
  const [answers, setAnswers] = useState({});

  const handleSelect = (qId, optId) => {
    setAnswers({ ...answers, [qId]: optId });
  };

  return (
    <div>
      <h2>Quiz</h2>
      {questions.map((q) => (
        <div key={q.id}>
          <h4>{q.text}</h4>
          {q.options.map((opt) => (
            <label key={opt.id} style={{ display: "block" }}>
              <input
                type="radio"
                name={`q-${q.id}`}
                value={opt.id}
                onChange={() => handleSelect(q.id, opt.id)}
              />
              {opt.text}
            </label>
          ))}
        </div>
      ))}
      <button onClick={() => onSubmit(answers)}>Submit</button>
    </div>
  );
}

export default QuizQuestion;
