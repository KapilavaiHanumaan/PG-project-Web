package com.pgtrust.backend.controller;

import com.pgtrust.backend.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/gamification")
@Tag(name = "Achievement & Gamification Module", description = "Endpoints for daily streaks, achievement badges, referral invites, and resident leaderboards")
public class GamificationController {

    @GetMapping("/streaks")
    @Operation(summary = "Get Daily Streak Data", description = "Fetch daily active login streak, calendar matrix, and streak freeze status.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getStreaks() {
        Map<String, Object> streak = Map.of(
                "streakCount", 7,
                "streakFreezeActive", true,
                "nextMilestone", Map.of("days", 15, "rewardPoints", 50)
        );
        return ResponseEntity.ok(ApiResponse.success(streak, "Streak data retrieved."));
    }

    @GetMapping("/leaderboard")
    @Operation(summary = "Get Resident Community Leaderboard", description = "Fetch ranked leaderboard by time period (Weekly, Monthly, All-Time).")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getLeaderboard(@RequestParam(defaultValue = "monthly") String period) {
        List<Map<String, Object>> rankings = List.of(
                Map.of("rank", 1, "name", "Sandeep Varma", "title", "Elite Reviewer", "points", 4850, "trustScore", 98, "badge", "🥇 Winner"),
                Map.of("rank", 2, "name", "Ananya Roy", "title", "Expert Reviewer", "points", 3920, "trustScore", 95, "badge", "🥈 2nd Place"),
                Map.of("rank", 4, "name", "Chaitanya Kumar", "title", "Expert Reviewer", "points", 1250, "trustScore", 94, "isCurrentUser", true)
        );
        return ResponseEntity.ok(ApiResponse.success(rankings, "Leaderboard retrieved for " + period));
    }

    @PostMapping("/referral")
    @Operation(summary = "Generate & Share Referral Invite", description = "Send referral invite and trigger points bonus upon friend signup.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> sendReferral(@RequestBody Map<String, String> request) {
        Map<String, Object> data = Map.of(
                "referralCode", "PGTRUST-CHAITANYA-99",
                "inviteSentTo", request.getOrDefault("destination", "friend@gmail.com"),
                "potentialBonus", "+300 Pts"
        );
        return ResponseEntity.ok(ApiResponse.success(data, "Referral invite sent successfully!"));
    }
}
