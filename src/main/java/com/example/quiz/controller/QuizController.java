package com.example.quiz.controller;

import com.example.quiz.model.Question;
import com.example.quiz.model.QuizResult;
import com.example.quiz.model.User;
import com.example.quiz.repository.UserRepository;
import com.example.quiz.service.QuizService;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/quiz")
public class QuizController {

    private final QuizService quizService;
    private final UserRepository userRepository;

    public QuizController(QuizService quizService, UserRepository userRepository) {
        this.quizService = quizService;
        this.userRepository = userRepository;
    }

    // ✅ Start quiz with random questions (open)
    @GetMapping("/start")
    public List<Question> startQuiz(@RequestParam int count) {
        return quizService.getRandomQuestions(count);
    }

    // ✅ Submit quiz (requires JWT)
    @PostMapping("/submit")
    public QuizResult submitQuiz(@RequestBody Map<Long, Long> answers) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String username = auth.getName();

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return quizService.evaluateQuiz(user.getId(), answers);
    }
}
