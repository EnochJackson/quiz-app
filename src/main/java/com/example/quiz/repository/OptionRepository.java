package com.example.quiz.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.quiz.model.Option;

public interface OptionRepository extends JpaRepository<Option, Long> {}
