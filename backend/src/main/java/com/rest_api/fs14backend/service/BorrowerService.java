package com.rest_api.fs14backend.service;


import com.rest_api.fs14backend.dto.BorrowDto;
import com.rest_api.fs14backend.entity.Borrower;

import java.util.List;
import java.util.UUID;

public interface BorrowerService {

    public List<Borrower> findAll();
    public Borrower findOne (UUID id);
    public Borrower createOne(BorrowDto borrowDto);
    public Borrower updateOne(UUID id, Borrower borrower);
    public void deleteOne(UUID id);
    public UUID returnOne(UUID userId, UUID bookCopyId);
    public List<Borrower> findAllBorrowedBooks(UUID userId);
}
