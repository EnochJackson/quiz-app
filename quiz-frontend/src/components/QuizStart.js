import React, { useState } from "react";
import quizApi from "../api/quizApi";

const res = await quizApi.get("/quiz/start?count=3");


function QuizStart({ onStart }) {
  const [count, setCount] = useState(3);

  return (
    <div>
      <h2>Start Quiz</h2>
      <input
        type="number"
        value={count}
        min="1"
        max="10"
        onChange={(e) => setCount(e.target.value)}
      />
      <button onClick={() => onStart(count)}>Start</button>
    </div>
  );
}

export default QuizStart;
