package com.rest_api.fs14backend.serviceImpl;

import com.rest_api.fs14backend.dto.BookCopyDto;
import com.rest_api.fs14backend.dto.BorrowDto;
import com.rest_api.fs14backend.entity.*;
import com.rest_api.fs14backend.mapper.BorrowMapper;
import com.rest_api.fs14backend.repository.BookCopyRepository;
import com.rest_api.fs14backend.repository.BorrowerRepository;
import com.rest_api.fs14backend.service.BookService;
import com.rest_api.fs14backend.service.BorrowerService;
import com.rest_api.fs14backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.*;

@Service
public class BorrowerServiceImpl implements BorrowerService {
    @Autowired
    private BorrowerRepository borrowerRepository;
    @Autowired
    private BookCopyRepository bookCopyRepository;
    @Autowired
    BookCopyServiceImpl bookCopyService;
    @Autowired
    BookService bookService;
    @Autowired
    UserService userService;

    @Autowired
    BorrowMapper borrowMapper;

    @Override
    public List<Borrower> findAll() {
        return borrowerRepository.findAll();
    }

    @Override
    public Borrower findOne(UUID id) {
        return borrowerRepository.findById(id).orElse(null);
    }




    @Override
    public Borrower createOne(BorrowDto borrowDto) {
        User user = userService.getUserById(borrowDto.getUserId());
        UUID bookId = borrowDto.getBookId();

        // Retrieve the book with the given ID
        Book book = bookService.findOne(bookId);

        // Find an available book copy for the book
        BookCopy firstAvailableCopy = null;

        for (BookCopy copy : book.getCopies()) {
            if (copy.getStatus()) {
                copy.setStatus(false);
                firstAvailableCopy = copy;
                bookCopyService.updateOne(copy.getId(), new BookCopyDto(copy.getBook().getId(), copy.getStatus()));
                break;
            }
        }

        if (firstAvailableCopy == null) {
            // Handle the case when there are no available copies of the book
            throw new IllegalStateException("No available copies of the book");
        }

        Calendar calendar = Calendar.getInstance();
        Date currentDate = calendar.getTime();

        // Add 3 weeks to the current date
        calendar.add(Calendar.WEEK_OF_YEAR, 3);
        Date threeWeeksAhead = calendar.getTime();
        boolean isReturned = false; // Set isReturned to false when the book is borrowed
        Date returnedDate = null;
        // Create the borrower entity and set the user, book copy, borrow date, and return date
        Borrower borrower = new Borrower(user, firstAvailableCopy, currentDate, threeWeeksAhead, isReturned, returnedDate);

        return borrowerRepository.save(borrower);
    }


    @Override
    public UUID returnOne(UUID userId, UUID bookCopyId) {
        Optional<Borrower> borrowedBookOptional = borrowerRepository.findByUserIdAndBookCopyIdAndIsReturned(userId, bookCopyId, false);

        Calendar calendar = Calendar.getInstance();
        Date currentDate = calendar.getTime();

        if (borrowedBookOptional.isPresent()) {
            Borrower borrowedBook = borrowedBookOptional.get();
            if (borrowedBook.getBookCopy() != null) {
                borrowedBook.getBookCopy().setStatus(true);
                borrowedBook.setReturned(true);
                borrowedBook.setReturnedDate(currentDate);
                borrowerRepository.save(borrowedBook);
                return borrowedBook.getBookCopy().getBook().getId();
            }
            throw new IllegalStateException("Book copy not found");
        }

        throw new IllegalStateException("No borrowed book found");
    }

    @Override
    public List<Borrower> findAllBorrowedBooks(UUID userId) {
        List<Borrower> borrowedBooks = borrowerRepository.findAll();
        List<Borrower> foundBooks = new ArrayList<>();
        for (Borrower book : borrowedBooks) {
            if (book.getUser().getId().equals(userId) && book.getBookCopy() != null && !book.getBookCopy().getStatus() && !book.isReturned()) {
                foundBooks.add(book);
            }
        }
        return foundBooks;
    }


    @Override
    public Borrower updateOne(UUID id, Borrower borrower) {
        Borrower foundBorrower = borrowerRepository.findById(id).orElse(null);
        if (foundBorrower != null) {
            foundBorrower.setBookCopy(bookCopyService.findOne(borrower.getBookCopy().getId()));
            foundBorrower.setUser(userService.getUserById(borrower.getUser().getId()));
            foundBorrower.setBorrowDate(borrower.getBorrowDate());
            foundBorrower.setReturnDate(borrower.getReturnDate());
            return borrowerRepository.save(foundBorrower);
        }
        return null;
    }

    @Override
    public void deleteOne(UUID id) {
        // Delete the borrowing
        borrowerRepository.deleteById(id);
        // Find the corresponding book copy
        Optional<BookCopy> bookCopyOptional = bookCopyRepository.findById(id);
        if (bookCopyOptional.isPresent()) {
            BookCopy bookCopy = bookCopyOptional.get();
            // Update the status of the book copy to true
            bookCopy.setStatus(true);
            bookCopyRepository.save(bookCopy);
        }
    }

}
