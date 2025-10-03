package com.example.quiz.model;

import com.fasterxml.jackson.annotation.JsonBackReference;  // ✅ add this import
import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "options")
public class Option {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String text;
    private boolean correct;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "question_id", nullable = false)
    @JsonBackReference   // ✅ prevents recursion
    private Question question;

    public Option() {}
}
