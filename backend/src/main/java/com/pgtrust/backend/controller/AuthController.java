package com.pgtrust.backend.controller;

import com.pgtrust.backend.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth")
@Tag(name = "Authentication Module", description = "Endpoints for Registration, JWT Login, OTP Verification, and Password Management")
public class AuthController {

    @PostMapping("/register")
    @Operation(summary = "User Registration", description = "Register a new user account with full name, email, mobile, and password.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> register(@RequestBody Map<String, Object> request) {
        Map<String, Object> data = Map.of(
                "userId", 101L,
                "email", request.getOrDefault("email", "user@pgtrust.in"),
                "status", "OTP_VERIFICATION_REQUIRED",
                "message", "OTP sent to your registered mobile and email address."
        );
        return ResponseEntity.ok(ApiResponse.success(data, "User account created successfully. Please verify OTP."));
    }

    @PostMapping("/login")
    @Operation(summary = "User Login", description = "Authenticate user with email and password to receive JWT access and refresh tokens.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> login(@RequestBody Map<String, Object> request) {
        Map<String, Object> data = Map.of(
                "token", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaGFpdGFueWFAcGd0cnVzdC5pbiIsImlhdCI6MTY3MjUxOTIwMH0.sampleJwtAccessToken",
                "refreshToken", "sampleRefreshTokenKey_981245",
                "user", Map.of(
                        "id", 101L,
                        "name", "Chaitanya Kumar",
                        "email", request.getOrDefault("email", "chaitanya@pgtrust.in"),
                        "role", "ROLE_WORKING_PROFESSIONAL"
                )
        );
        return ResponseEntity.ok(ApiResponse.success(data, "Login successful. Welcome back to PGTrust!"));
    }

    @PostMapping("/verify-otp")
    @Operation(summary = "Verify OTP", description = "Verify 6-digit OTP code sent during onboarding or password reset.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> verifyOtp(@RequestBody Map<String, Object> request) {
        Map<String, Object> data = Map.of("verified", true, "redirect", "/select-role");
        return ResponseEntity.ok(ApiResponse.success(data, "OTP verified successfully. Account activated!"));
    }

    @PostMapping("/resend-otp")
    @Operation(summary = "Resend OTP", description = "Resend a new 6-digit OTP code.")
    public ResponseEntity<ApiResponse<String>> resendOtp(@RequestBody Map<String, Object> request) {
        return ResponseEntity.ok(ApiResponse.success("OTP resent successfully.", "New OTP sent to registered phone number."));
    }

    @PostMapping("/refresh-token")
    @Operation(summary = "Refresh Access Token", description = "Exchange a valid refresh token for a new JWT access token.")
    public ResponseEntity<ApiResponse<Map<String, String>>> refreshToken(@RequestBody Map<String, String> request) {
        Map<String, String> data = Map.of(
                "accessToken", "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjaGFpdGFueWFAcGd0cnVzdC5pbiJ9.newRefreshedAccessToken"
        );
        return ResponseEntity.ok(ApiResponse.success(data, "Token refreshed successfully."));
    }

    @PostMapping("/logout")
    @Operation(summary = "User Logout", description = "Invalidate JWT session and revoke refresh token.")
    public ResponseEntity<ApiResponse<String>> logout() {
        return ResponseEntity.ok(ApiResponse.success("Logged out successfully.", "User session terminated."));
    }

    @PostMapping("/forgot-password")
    @Operation(summary = "Forgot Password Request", description = "Request password reset OTP via registered email.")
    public ResponseEntity<ApiResponse<String>> forgotPassword(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(ApiResponse.success("Reset link sent.", "Password reset instructions sent to your email."));
    }

    @PostMapping("/reset-password")
    @Operation(summary = "Reset Password", description = "Set a new password using reset token or OTP.")
    public ResponseEntity<ApiResponse<String>> resetPassword(@RequestBody Map<String, String> request) {
        return ResponseEntity.ok(ApiResponse.success("Password updated.", "Your password has been reset successfully."));
    }
}
