package com.example.quiz.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "quiz_results")
public class QuizResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;          // ✅ who took the quiz
    private int totalQuestions;   // ✅ total questions attempted
    private int correctAnswers;   // ✅ number of correct answers
    private int score;            // ✅ percentage score
}
