package com.pgtrust.backend.controller;

import com.pgtrust.backend.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/admin")
@Tag(name = "Admin & Moderation Backend Module", description = "Endpoints for fraud investigation queues, review approvals, user suspensions, and SaaS platform analytics")
public class AdminController {

    @GetMapping("/fraud-queue")
    @Operation(summary = "Get Anti-Fraud Investigation Queue", description = "Fetch reviews flagged for IP clustering, duplicate content, or suspicious rating patterns.")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getFraudQueue() {
        List<Map<String, Object>> flagged = List.of(
                Map.of(
                        "reviewId", "rev-901",
                        "user", "Unknown Account",
                        "pgName", "Sri Sai PG",
                        "riskScore", 75,
                        "status", "SUSPICIOUS",
                        "reason", "Multiple reviews submitted from identical IP address within 5 minutes"
                )
        );
        return ResponseEntity.ok(ApiResponse.success(flagged, "Fraud queue retrieved."));
    }

    @PostMapping("/moderate-review")
    @Operation(summary = "Moderate Review Action", description = "Approve, reject, or purge a flagged review (Admin role required).")
    public ResponseEntity<ApiResponse<String>> moderateReview(@RequestBody Map<String, Object> request) {
        String action = (String) request.getOrDefault("action", "APPROVE");
        return ResponseEntity.ok(ApiResponse.success("Success", "Review moderation action completed: " + action));
    }

    @GetMapping("/analytics")
    @Operation(summary = "Get System Platform Analytics", description = "Fetch overall platform metrics: total users, verified PGs, review verification rate %, and reward redemptions.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAnalytics() {
        Map<String, Object> metrics = Map.of(
                "totalUsers", 14280,
                "verifiedPgs", 384,
                "totalReviewsSubmitted", 8920,
                "verificationSuccessRate", "96.4%",
                "totalRewardRedemptions", 2450
        );
        return ResponseEntity.ok(ApiResponse.success(metrics, "Platform analytics loaded."));
    }
}
