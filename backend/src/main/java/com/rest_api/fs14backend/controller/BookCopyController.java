package com.rest_api.fs14backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
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
    public List<BookCopy> findAll(){
        return bookCopyService.getAll();
    }
    @PostMapping("/add")
    public List<BookCopy> addCopies(@RequestBody BookCopyDto bookCopyDto){
        return bookCopyService.addCopies(bookCopyDto);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteOne(@PathVariable UUID id){
        bookCopyService.deleteOne(id);
    }
    @PutMapping("/update/{id}")
    public BookCopy updateOne(@PathVariable UUID id,@RequestBody BookCopyDto bookCopyDto){
        return bookCopyService.updateOne(id, bookCopyDto);
    }
    @GetMapping("/{id}")
    public List<BookCopy> findAllByBookId(@PathVariable UUID id){
        return bookCopyService.findAllByBookId(id);
    }
    @GetMapping("/countAll/{id}")
    public int countAllByBookId(@PathVariable UUID id){
        return bookCopyService.countAllByBookId(id);
    }
    @GetMapping("/available/{id}")
    public List<BookCopy> findAvailableByBookId(@PathVariable UUID id){
        return bookCopyService.findAvailableByBookId(id);
    }
    @GetMapping("/countAvailable/{id}")
    public int countAvailableByBookId(@PathVariable UUID id){
        return bookCopyService.countAvailableByBookId(id);
    }
}
