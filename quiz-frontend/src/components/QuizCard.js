import React from "react";

const QuizCard = ({ question, onAnswer }) => {
  return (
    <div>
      <h3>{question.text}</h3>
      {question.options.map((opt) => (
        <label key={opt.id}>
          <input
            type="radio"
            name={`q-${question.id}`}
            value={opt.id}
            onChange={() => onAnswer(question.id, opt.id)}
          />
          {opt.text}
        </label>
      ))}
    </div>
  );
};

export default QuizCard;
