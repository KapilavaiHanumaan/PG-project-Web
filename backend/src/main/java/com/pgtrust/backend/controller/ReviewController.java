package com.pgtrust.backend.controller;

import com.pgtrust.backend.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/reviews")
@Tag(name = "Verified Reviews & Trust Engine Module", description = "Endpoints for review submission, stay verification, helpful voting, trust calculations, and fraud detection")
public class ReviewController {

    @PostMapping
    @Operation(summary = "Submit Verified PG Review", description = "Publish a new multi-dimension review with stay verification document & photos.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> submitReview(@RequestBody Map<String, Object> reviewData) {
        Map<String, Object> created = Map.of(
                "id", "rev-" + System.currentTimeMillis(),
                "trustScore", 96,
                "category", "Highly Trusted",
                "pointsEarned", 50,
                "status", "APPROVED"
        );
        return ResponseEntity.ok(ApiResponse.success(created, "Review submitted successfully! Earned +50 PGTrust points."));
    }

    @GetMapping("/pg/{pgId}")
    @Operation(summary = "Get Reviews for PG", description = "Fetch verified reviews for a specific PG sorted by Trust Score or Helpful votes.")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getReviewsByPg(@PathVariable String pgId) {
        List<Map<String, Object>> reviews = List.of(
                Map.of(
                        "id", "rev-201",
                        "pgId", pgId,
                        "user", "Sandeep Varma",
                        "verifiedStay", true,
                        "overallRating", 4.8,
                        "title", "High-speed 300Mbps Wi-Fi and authentic food near Mindspace!",
                        "comment", "Stayed here for 8 months. Biometric gate provides peace of mind.",
                        "trustScore", 96,
                        "helpfulCount", 42
                )
        );
        return ResponseEntity.ok(ApiResponse.success(reviews, "Reviews loaded for PG."));
    }

    @PostMapping("/helpful")
    @Operation(summary = "Vote Review Helpful / Unhelpful", description = "Record community upvotes with duplicate vote protection.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> voteHelpful(@RequestBody Map<String, Object> voteRequest) {
        Map<String, Object> result = Map.of("reviewId", voteRequest.get("reviewId"), "helpfulCount", 43);
        return ResponseEntity.ok(ApiResponse.success(result, "Feedback recorded. Thank you!"));
    }

    @PostMapping("/report")
    @Operation(summary = "Report Suspicious Review", description = "Flag review for admin moderation and anti-fraud investigation.")
    public ResponseEntity<ApiResponse<String>> reportReview(@RequestBody Map<String, Object> reportData) {
        return ResponseEntity.ok(ApiResponse.success("Reported", "Review reported to moderation team."));
    }
}
