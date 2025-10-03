import React from "react";
import quizApi from "../api/quizApi";

const res = await quizApi.get("/quiz/start?count=3");


function QuizResult({ result }) {
  return (
    <div>
      <h2>Result</h2>
      <p>Total Questions: {result.totalQuestions}</p>
      <p>Correct Answers: {result.correctAnswers}</p>
      <p>Score: {result.score}%</p>
    </div>
  );
}

export default QuizResult;
