package com.rest_api.fs14backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.UUID;
@Data
@NoArgsConstructor
public class BookCopyDto {
    public UUID bookId;
    public boolean status;
    public int quantity;

    public BookCopyDto(UUID bookId, boolean status) {
        this.bookId = bookId;
        this.status = status;

    }
}