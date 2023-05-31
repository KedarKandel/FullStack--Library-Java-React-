package com.rest_api.fs14backend.service;


import com.rest_api.fs14backend.dto.BookCopyDto;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import com.rest_api.fs14backend.entity.BookCopy;


@Service
public interface BookCopyService {
    public List<BookCopy> getAll();
    public BookCopy findOne(UUID id);
    public List<BookCopy> addCopies(BookCopyDto bookCopyDto);
    public void deleteOne(UUID id);
    public List<BookCopy> findAllByBookId(UUID id);
    public List<BookCopy> findAvailableByBookId(UUID id);
    public BookCopy updateOne( UUID id, BookCopyDto bookCopyDto);
    public int countAllByBookId( UUID id);
    public int countAvailableByBookId(UUID id);

}
