package com.rest_api.fs14backend.controller;

import com.rest_api.fs14backend.entity.Author;
import com.rest_api.fs14backend.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/author")
public class AuthorController {
    @Autowired
    private AuthorService authorService;
    @PostMapping("/add")
    public Author createAuthor(@RequestBody Author author) {
        return authorService.createAuthor(author);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Author>> getAllAuthor() {
        List<Author> author = authorService.getAllAuthors();
        return new ResponseEntity<>(author, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public void getAuthorById(@PathVariable UUID authorId) {
        Author author = authorService.getAuthorById(authorId);
    }
    @PutMapping("/update/{id}")
    public Author updateAuthor(@PathVariable UUID id, @RequestBody Author author){
        return authorService.updateAuthor(id,author);
    }

    @DeleteMapping("/delete/{authorId}")
    public void deleteAuthor(@PathVariable UUID authorId) {
        authorService.deleteAuthor(authorId);
    }

}

