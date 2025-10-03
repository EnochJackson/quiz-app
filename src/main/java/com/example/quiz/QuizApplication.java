package com.example.quiz;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.example.quiz.model.User;
import com.example.quiz.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class QuizApplication {

    public static void main(String[] args) {
        SpringApplication.run(QuizApplication.class, args);
    }

    // ✅ Insert default admin user at startup
    @Bean
    public CommandLineRunner dataLoader(UserRepository userRepo, PasswordEncoder encoder) {
        return args -> {
            if (!userRepo.existsByUsername("admin")) {
                User admin = new User("admin", encoder.encode("admin123"), "ADMIN");
                userRepo.save(admin);
            }
        };
    }
}
