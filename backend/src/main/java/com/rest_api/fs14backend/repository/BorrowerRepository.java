package com.rest_api.fs14backend.repository;

import com.rest_api.fs14backend.dto.BorrowDto;
import com.rest_api.fs14backend.entity.BookCopy;
import com.rest_api.fs14backend.entity.Borrower;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface BorrowerRepository extends JpaRepository<Borrower, UUID> {
    Optional<Borrower> findByUserIdAndBookCopyIdAndIsReturned(UUID userId, UUID bookCopyId, boolean isReturned);
    List<Borrower> findByBookCopyIn(List<BookCopy> bookCopies);
}
