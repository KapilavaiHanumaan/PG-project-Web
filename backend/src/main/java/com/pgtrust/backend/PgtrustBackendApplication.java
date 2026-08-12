package com.pgtrust.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class PgtrustBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(PgtrustBackendApplication.class, args);
        System.out.println("=================================================================");
        System.out.println("🚀 PGTRUST HYDERABAD BACKEND STARTED SUCCESSFULLY ON PORT 8080");
        System.out.println("📖 Swagger API Docs: http://localhost:8080/api/v1/swagger-ui.html");
        System.out.println("=================================================================");
    }
}
