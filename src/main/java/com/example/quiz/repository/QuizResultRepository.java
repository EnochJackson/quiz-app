package com.example.quiz.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.quiz.model.QuizResult;
import java.util.List;

public interface QuizResultRepository extends JpaRepository<QuizResult, Long> {
  List<QuizResult> findByUserId(Long userId);
}
