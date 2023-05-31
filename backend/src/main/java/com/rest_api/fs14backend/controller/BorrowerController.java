package com.rest_api.fs14backend.controller;

import com.rest_api.fs14backend.dto.BorrowDto;
import com.rest_api.fs14backend.dto.ReturnDto;
import com.rest_api.fs14backend.entity.Borrower;
import com.rest_api.fs14backend.service.BorrowerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;


@RestController
@RequestMapping("/api/v1/borrow")
public class BorrowerController {
    @Autowired
    BorrowerService borrowerService;
    @GetMapping("/all")
    public List<Borrower> findAll() {
        return borrowerService.findAll();
    }
    @PostMapping("/borrowOne")
    public Borrower addBorrower(@RequestBody BorrowDto borrowDto) {
        return  borrowerService.createOne(borrowDto);
    }
    @PutMapping("/update/{id}")
    public Borrower updateBorrower(@PathVariable UUID id, @RequestBody Borrower borrower) {
        return  borrowerService.updateOne(id,borrower);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteOne(@PathVariable UUID id){
        borrowerService.deleteOne(id);
    }
    @GetMapping("/{id}")
    public Borrower findOne(@PathVariable UUID id){
        return borrowerService.findOne(id);
    }


    @PostMapping("/returnOne")
    public UUID returnOne(@RequestBody ReturnDto returnDto) {
        UUID userId = returnDto.getUserId();
        UUID bookCopyId = returnDto.getBookCopyId();
        System.out.println(userId);
        System.out.println(bookCopyId);
        return borrowerService.returnOne(userId, bookCopyId);
    }




    @GetMapping("/all/{userId}")
    public List<Borrower> findAllBorrowedBooks(@PathVariable UUID userId){
        return borrowerService.findAllBorrowedBooks(userId);

    }
}
