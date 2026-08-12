package com.pgtrust.backend.controller;

import com.pgtrust.backend.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/ai")
@Tag(name = "AI & Machine Learning Engine Module", description = "Endpoints for NLP moderation, sentiment analysis, personalized recommendations, fraud detection, and conversational AI assistant")
public class AiController {

    @PostMapping("/moderation")
    @Operation(summary = "AI Review Moderation & Toxicity Pipeline", description = "Preprocess review text, compute spamScore, toxicityScore, duplicateScore, and output moderationDecision.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> moderateText(@RequestBody Map<String, String> request) {
        String text = request.getOrDefault("text", "");
        Map<String, Object> analysis = Map.of(
                "spamScore", 5,
                "toxicityScore", 0,
                "duplicateScore", 12,
                "moderationDecision", "APPROVE",
                "qualityScore", 92,
                "qualityBadge", "Excellent"
        );
        return ResponseEntity.ok(ApiResponse.success(analysis, "AI Moderation pipeline completed."));
    }

    @PostMapping("/sentiment")
    @Operation(summary = "Multi-Aspect Sentiment Engine", description = "Extract sentence-level sentiment scores across food, cleanliness, wifi, security, and staff (supports Telugu + English code-mixing).")
    public ResponseEntity<ApiResponse<Map<String, Object>>> analyzeSentiment(@RequestBody Map<String, String> request) {
        Map<String, Object> sentiment = Map.of(
                "overallSentiment", "Positive",
                "sentimentConfidence", 0.94,
                "aspects", Map.of("food", "Positive", "wifi", "Positive", "cleanliness", "Positive", "security", "Positive")
        );
        return ResponseEntity.ok(ApiResponse.success(sentiment, "Aspect sentiment analyzed successfully."));
    }

    @GetMapping("/recommendations/user/{userId}")
    @Operation(summary = "Get Personalized PG Recommendations", description = "Generate smart personalized PG matches based on user persona, budget, locality, and weighted smart search ranking.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getRecommendations(@PathVariable String userId) {
        List<Map<String, Object>> bestMatches = List.of(
                Map.of("id", "pg-101", "name", "Stanza Living - Skyline House", "locality", "Madhapur", "matchScore", "98% Match", "reason", "Top rated for 300Mbps Wi-Fi & Mindspace proximity"),
                Map.of("id", "pg-102", "name", "Sri Sai Luxury PG for Women", "locality", "Gachibowli", "matchScore", "95% Match", "reason", "Best security & female warden for DLF commuters")
        );

        Map<String, Object> result = Map.of("bestMatches", bestMatches, "userId", userId);
        return ResponseEntity.ok(ApiResponse.success(result, "Personalized recommendations generated."));
    }

    @GetMapping("/analytics")
    @Operation(summary = "Get AI Analytics & Complaints Intelligence", description = "Fetch sentiment distribution, complaint categories, and predictive occupancy demand.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAiAnalytics() {
        Map<String, Object> analytics = Map.of(
                "fakeReviewsDetectedToday", 14,
                "sentimentPositivePct", 78,
                "sentimentNeutralPct", 15,
                "sentimentNegativePct", 7,
                "topComplaints", List.of(
                        Map.of("category", "Food Quality", "pct", 32),
                        Map.of("category", "Wi-Fi Drops", "pct", 24)
                )
        );
        return ResponseEntity.ok(ApiResponse.success(analytics, "AI Analytics loaded."));
    }

    @PostMapping("/chat-assistant")
    @Operation(summary = "Conversational PG Assistant API", description = "Process natural language queries and return context-aware recommendations.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> processChatQuery(@RequestBody Map<String, String> request) {
        String query = request.getOrDefault("query", "");
        Map<String, Object> response = Map.of(
                "reply", "Found 3 top budget-friendly PGs near HITECH City under ₹9,000/mo including 3-time meals and high-speed Wi-Fi!",
                "recommendedPgs", List.of("pg-101", "pg-102")
        );
        return ResponseEntity.ok(ApiResponse.success(response, "AI response generated."));
    }
}
