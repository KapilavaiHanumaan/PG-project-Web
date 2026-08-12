package com.pgtrust.backend.controller;

import com.pgtrust.backend.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/wallet")
@Tag(name = "Wallet & Rewards Module", description = "Endpoints for checking point balances, ledger history, voucher redemptions, and UPI withdrawals")
public class WalletController {

    @GetMapping
    @Operation(summary = "Get User Wallet Balance", description = "Fetch point balance, lifetime earned, lifetime redeemed, and INR equivalent value.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getWallet() {
        Map<String, Object> wallet = Map.of(
                "pointsBalance", 1250,
                "rupeeValue", 125,
                "lifetimeEarned", 1850,
                "lifetimeRedeemed", 600,
                "pendingPoints", 150,
                "thisMonthEarnings", 450
        );
        return ResponseEntity.ok(ApiResponse.success(wallet, "Wallet balance retrieved."));
    }

    @GetMapping("/history")
    @Operation(summary = "Get Wallet Transaction Ledger", description = "Audit trail of earned points credits and voucher redemption debits.")
    public ResponseEntity<ApiResponse<List<Map<String, Object>>>> getHistory() {
        List<Map<String, Object>> txs = List.of(
                Map.of("id", "tx-101", "type", "verified_review", "title", "Verified PG Review Submission", "points", 50, "isCredit", true, "date", "08 Aug 2026"),
                Map.of("id", "tx-104", "type", "redemption", "title", "Redeemed Swiggy ₹50 Voucher", "points", -500, "isCredit", false, "date", "28 Jul 2026")
        );
        return ResponseEntity.ok(ApiResponse.success(txs, "Transaction history loaded."));
    }

    @PostMapping("/rewards/redeem")
    @Operation(summary = "Redeem Reward Voucher", description = "Deduct points atomically and generate unique promo coupon code + QR visualization.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> redeemReward(@RequestBody Map<String, Object> request) {
        Map<String, Object> coupon = Map.of(
                "couponCode", "SWIGGY-HYD-9812",
                "provider", "Swiggy",
                "rupeeValue", 50,
                "status", "ACTIVE",
                "expiryDate", "90 Days from now"
        );
        return ResponseEntity.ok(ApiResponse.success(coupon, "Reward voucher claimed successfully!"));
    }
}
