package com.rest_api.fs14backend.controller;

import com.rest_api.fs14backend.dto.BorrowDto;
import com.rest_api.fs14backend.dto.ReturnDto;
import com.rest_api.fs14backend.entity.Borrower;
import com.rest_api.fs14backend.service.BorrowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/v1/borrow")
public class BorrowerController {
    @Autowired
    BorrowerService borrowerService;

    @GetMapping("/all")
    public ResponseEntity<List<Borrower>> findAll() {
        List<Borrower> borrowers = borrowerService.findAll();
        return new ResponseEntity<>(borrowers, HttpStatus.OK);
    }

    @PostMapping("/borrowOne")
    public ResponseEntity<Borrower> addBorrower(@RequestBody BorrowDto borrowDto) {
        Borrower borrower = borrowerService.createOne(borrowDto);
        return new ResponseEntity<>(borrower, HttpStatus.CREATED);
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<Borrower> updateBorrower(@PathVariable UUID id, @RequestBody Borrower borrower) {
        Borrower updatedBorrower = borrowerService.updateOne(id, borrower);
        return new ResponseEntity<>(updatedBorrower, HttpStatus.OK);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteOne(@PathVariable UUID id) {
        borrowerService.deleteOne(id);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Borrower> findOne(@PathVariable UUID id) {
        Borrower borrower = borrowerService.findOne(id);
        return new ResponseEntity<>(borrower, HttpStatus.OK);
    }

    @PostMapping("/returnOne")
    public ResponseEntity<UUID> returnOne(@RequestBody ReturnDto returnDto) {
        UUID userId = returnDto.getUserId();
        UUID bookCopyId = returnDto.getBookCopyId();
        UUID returnedBookId = borrowerService.returnOne(userId, bookCopyId);
        return new ResponseEntity<>(returnedBookId, HttpStatus.OK);
    }

    @GetMapping("/all/{userId}")
    public ResponseEntity<List<Borrower>> findAllBorrowedBooks(@PathVariable UUID userId) {
        List<Borrower> borrowedBooks = borrowerService.findAllBorrowedBooks(userId);
        return new ResponseEntity<>(borrowedBooks, HttpStatus.OK);
    }
}