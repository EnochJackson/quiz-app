package com.example.quiz.service;

import com.example.quiz.model.Option;
import com.example.quiz.model.Question;
import com.example.quiz.model.QuizResult;
import com.example.quiz.repository.QuestionRepository;
import com.example.quiz.repository.QuizResultRepository;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Map;

@Service
public class QuizService {

    private final QuestionRepository questionRepository;
    private final QuizResultRepository quizResultRepository;

    public QuizService(QuestionRepository questionRepository,
                       QuizResultRepository quizResultRepository) {
        this.questionRepository = questionRepository;
        this.quizResultRepository = quizResultRepository;
    }

    // ✅ Fix: fetch all, shuffle, and return without saving duplicates
    public List<Question> getRandomQuestions(int count) {
        List<Question> allQuestions = questionRepository.findAll();
        Collections.shuffle(allQuestions); // random order
        return allQuestions.stream()
                .limit(count)
                .toList();
    }

    public QuizResult evaluateQuiz(Long userId, Map<Long, Long> answers) {
        int total = answers.size();
        int correct = 0;

        for (Map.Entry<Long, Long> entry : answers.entrySet()) {
            Long questionId = entry.getKey();
            Long selectedOptionId = entry.getValue();

            Question q = questionRepository.findById(questionId).orElse(null);
            if (q != null) {
                for (Option opt : q.getOptions()) {
                    if (opt.getId().equals(selectedOptionId) && opt.isCorrect()) {
                        correct++;
                    }
                }
            }
        }

        int score = (int) (((double) correct / total) * 100);

        QuizResult result = new QuizResult();
        result.setUserId(userId);
        result.setTotalQuestions(total);
        result.setCorrectAnswers(correct);
        result.setScore(score);

        return quizResultRepository.save(result);
    }
}
