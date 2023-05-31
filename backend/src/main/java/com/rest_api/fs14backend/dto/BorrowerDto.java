package com.rest_api.fs14backend.dto;

import com.rest_api.fs14backend.entity.BookCopy;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class BorrowerDto {
    private BookCopy bookCopy;
    public BorrowerDto(BookCopy bookCopy) {
        this.bookCopy = bookCopy;
    }
    public BookCopy getBookCopy() {
        return bookCopy;
    }
}
