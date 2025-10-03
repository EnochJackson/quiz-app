package com.example.quiz.dto;

import lombok.Data;

@Data
public class AnswerResponse {
    private int totalQuestions;
    private int correctAnswers;
    private int score; // percentage
}
