package com.pgtrust.backend.controller;

import com.pgtrust.backend.dto.ApiResponse;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/pgs")
@Tag(name = "PG Discovery & Management Module", description = "Endpoints for PG search, filtering, geolocation commute calculation, and CRUD operations")
public class PGController {

    @GetMapping
    @Operation(summary = "Get All PGs with Filtering & Pagination", description = "Filter PGs by locality, price range, gender type, food options, and minimum ratings.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPgs(
            @RequestParam(required = false) String locality,
            @RequestParam(required = false) Integer maxPrice,
            @RequestParam(required = false) String gender,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size
    ) {
        List<Map<String, Object>> pgsList = List.of(
                Map.of(
                        "id", "pg-101",
                        "name", "Stanza Living - Skyline House",
                        "locality", "Madhapur",
                        "price", 11500,
                        "rating", 4.8,
                        "verifiedReviewsCount", 42,
                        "latitude", 17.4483,
                        "longitude", 78.3915,
                        "distanceToMindspaceKm", 1.2
                ),
                Map.of(
                        "id", "pg-102",
                        "name", "Sri Sai Luxury PG for Women",
                        "locality", "Gachibowli",
                        "price", 8500,
                        "rating", 4.7,
                        "verifiedReviewsCount", 28,
                        "latitude", 17.4401,
                        "longitude", 78.3489,
                        "distanceToDlfKm", 0.8
                )
        );

        Map<String, Object> data = Map.of(
                "content", pgsList,
                "totalElements", 24,
                "totalPages", 3,
                "currentPage", page
        );

        return ResponseEntity.ok(ApiResponse.success(data, "PG properties retrieved successfully."));
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get PG Details by ID", description = "Fetch full PG property overview, pricing, amenities, house rules, and owner details.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getPgById(@PathVariable String id) {
        Map<String, Object> pg = Map.of(
                "id", id,
                "name", "Stanza Living - Skyline House",
                "locality", "Madhapur",
                "address", "Plot 42, Near Mindspace IT Park, Madhapur, Hyderabad",
                "price", 11500,
                "deposit", 15000,
                "rating", 4.8,
                "safetyScore", 96,
                "amenities", List.of("300Mbps High-Speed Wi-Fi", "Attached Washroom", "AC Rooms", "3-Times Meals", "24/7 Security"),
                "owner", Map.of("name", "Rajesh Reddy", "phone", "+91 98765 43210")
        );
        return ResponseEntity.ok(ApiResponse.success(pg, "PG property details loaded."));
    }

    @PostMapping
    @Operation(summary = "Create New PG Listing", description = "Add a new PG property to the platform (PG Owner role required).")
    public ResponseEntity<ApiResponse<Map<String, Object>>> createPg(@RequestBody Map<String, Object> pgData) {
        Map<String, Object> created = Map.of("id", "pg-" + System.currentTimeMillis(), "name", pgData.getOrDefault("name", "New PG"));
        return ResponseEntity.ok(ApiResponse.success(created, "PG listing created successfully and submitted for verification."));
    }

    @PutMapping("/{id}")
    @Operation(summary = "Update PG Listing", description = "Update existing PG details, room vacancies, or pricing.")
    public ResponseEntity<ApiResponse<Map<String, Object>>> updatePg(@PathVariable String id, @RequestBody Map<String, Object> pgData) {
        Map<String, Object> updated = Map.of("id", id, "status", "UPDATED");
        return ResponseEntity.ok(ApiResponse.success(updated, "PG property updated successfully."));
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Delete PG Listing", description = "Soft-delete a PG property from search index.")
    public ResponseEntity<ApiResponse<String>> deletePg(@PathVariable String id) {
        return ResponseEntity.ok(ApiResponse.success("Deleted", "PG property listing removed."));
    }
}
