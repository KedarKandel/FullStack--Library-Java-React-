package com.rest_api.fs14backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@NoArgsConstructor
@Data
public class BorrowDto {
    private UUID borrowerId; // Add a field to hold the ID of the corresponding Borrower entity
    private UUID bookId;
    private UUID userId;
}