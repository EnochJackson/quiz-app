package com.example.quiz.dto;

import lombok.Data;
import java.util.Map;

@Data
public class AnswerRequest {
    // key = questionId, value = selectedOptionId
    private Map<Long, Long> answers;
}
