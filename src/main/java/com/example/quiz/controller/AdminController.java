package com.example.quiz.controller;

import com.example.quiz.model.Question;
import com.example.quiz.model.Option;
import com.example.quiz.model.User;
import com.example.quiz.repository.QuestionRepository;
import com.example.quiz.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired 
    private QuestionRepository questionRepo;

    @Autowired
    private UserRepository userRepo;

    // =======================
    // ✅ Question Management
    // =======================

    // Get all questions
    @GetMapping("/questions")
    public List<Question> listQuestions() {
        return questionRepo.findAll();
    }

    // Create new question
    @PostMapping("/questions")
    public ResponseEntity<Question> createQuestion(@RequestBody Question question) {
        if (question.getOptions() != null) {
            for (Option o : question.getOptions()) {
                o.setQuestion(question); // maintain relationship
            }
        }
        Question saved = questionRepo.save(question);
        return ResponseEntity.ok(saved);
    }

    // Update existing question
    @PutMapping("/questions/{id}")
    public ResponseEntity<Question> updateQuestion(@PathVariable Long id, @RequestBody Question updated) {
        return questionRepo.findById(id)
            .map(existing -> {
                existing.setText(updated.getText());
                existing.getOptions().clear();
                if (updated.getOptions() != null) {
                    for (Option o : updated.getOptions()) {
                        o.setQuestion(existing);
                        existing.getOptions().add(o);
                    }
                }
                Question saved = questionRepo.save(existing);
                return ResponseEntity.ok(saved);
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Delete question by ID
    @DeleteMapping("/questions/{id}")
    public ResponseEntity<Void> deleteQuestion(@PathVariable Long id) {
        if (!questionRepo.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        questionRepo.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    // =======================
    // ✅ User Management
    // =======================

    // Get all users
    @GetMapping("/users")
    public List<User> listUsers() {
        return userRepo.findAll();
    }

    // Delete user by ID (prevent deleting ADMIN)
    @DeleteMapping("/users/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        return userRepo.findById(id).map(user -> {
            if ("ADMIN".equalsIgnoreCase(user.getRole())) {
                return ResponseEntity.badRequest().body("❌ Cannot delete ADMIN user");
            }
            userRepo.deleteById(id);
            return ResponseEntity.ok("✅ User deleted successfully");
        }).orElse(ResponseEntity.notFound().build());
    }
}
