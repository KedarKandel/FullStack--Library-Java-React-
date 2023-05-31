package com.rest_api.fs14backend.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@NoArgsConstructor
@Data
public class BookDto {
    private UUID categoryId;
    private UUID authorId;
    private String title;
    private String description;
    private String isbn;
    private Date publishedDate;
    private String publisher;
    private String cover;
}