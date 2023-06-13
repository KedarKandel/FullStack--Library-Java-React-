package com.rest_api.fs14backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

import com.rest_api.fs14backend.dto.BookCopyDto;
import com.rest_api.fs14backend.entity.BookCopy;
import com.rest_api.fs14backend.service.BookCopyService;
import com.rest_api.fs14backend.service.BookService;


@RestController
@RequestMapping("/api/v1/bookCopy")
public class BookCopyController {
    @Autowired
    BookCopyService bookCopyService;
    @Autowired
    BookService bookService;

    @GetMapping("/all")
    public ResponseEntity<List<BookCopy>> findAll() {
        List<BookCopy> bookCopies = bookCopyService.getAll();
        return new ResponseEntity<>(bookCopies, HttpStatus.OK);
    }

    @PostMapping("/add")
    public ResponseEntity<List<BookCopy>> addCopies(@RequestBody BookCopyDto bookCopyDto) {
        List<BookCopy> bookCopies = bookCopyService.addCopies(bookCopyDto);
        return new ResponseEntity<>(bookCopies, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteOne(@PathVariable UUID id) {
        bookCopyService.deleteOne(id);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BookCopy> updateOne(@PathVariable UUID id, @RequestBody BookCopyDto bookCopyDto) {
        BookCopy updatedBookCopy = bookCopyService.updateOne(id, bookCopyDto);
        return new ResponseEntity<>(updatedBookCopy, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<List<BookCopy>> findAllByBookId(@PathVariable UUID id) {
        List<BookCopy> bookCopies = bookCopyService.findAllByBookId(id);
        return new ResponseEntity<>(bookCopies, HttpStatus.OK);
    }

    @GetMapping("/countAll/{id}")
    public ResponseEntity<Integer> countAllByBookId(@PathVariable UUID id) {
        int count = bookCopyService.countAllByBookId(id);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }

    @GetMapping("/available/{id}")
    public ResponseEntity<List<BookCopy>> findAvailableByBookId(@PathVariable UUID id) {
        List<BookCopy> availableCopies = bookCopyService.findAvailableByBookId(id);
        return new ResponseEntity<>(availableCopies, HttpStatus.OK);
    }

    @GetMapping("/countAvailable/{id}")
    public ResponseEntity<Integer> countAvailableByBookId(@PathVariable UUID id) {
        int count = bookCopyService.countAvailableByBookId(id);
        return new ResponseEntity<>(count, HttpStatus.OK);
    }
}
