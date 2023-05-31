package com.rest_api.fs14backend.serviceImpl;

import com.rest_api.fs14backend.entity.*;
import com.rest_api.fs14backend.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.rest_api.fs14backend.repository.BookCopyRepository;
import com.rest_api.fs14backend.service.BookCopyService;
import com.rest_api.fs14backend.dto.BookCopyDto;
import com.rest_api.fs14backend.mapper.BookCopyMapper;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;


@Service
public class BookCopyServiceImpl implements BookCopyService {
    @Autowired
    BookService bookService;
    @Autowired
    BookCopyRepository bookCopyRepository;
    @Autowired
    BookCopyMapper bookCopyMapper;

    @Override
    public List<BookCopy> getAll(){
        return bookCopyRepository.findAll();
    }

    @Override
    public BookCopy findOne(UUID id){
        return bookCopyRepository.findById(id).orElse(null);
    }

    @Override
    public List<BookCopy> addCopies(BookCopyDto bookCopyDto){
        UUID bookId = bookCopyDto.getBookId();
        Book book = bookService.findOne(bookId);
        List<BookCopy> bookCopy = new ArrayList<>();
        for (int i=0; i< bookCopyDto.quantity;i++){
            BookCopy mappedCopy= bookCopyMapper.toBookCopy(book, bookCopyDto.status);
            bookCopy.add(mappedCopy);
        }
        return bookCopyRepository.saveAll(bookCopy);
    }

    @Override
    public void deleteOne(UUID id){

        // Query the database to get all book copies
        List<BookCopy> allBookCopies = bookCopyRepository.findAll();

        // Iterate over the book copies and filter based on the bookId
        for (BookCopy bookCopy : allBookCopies) {
            if (bookCopy.getBook().getId().equals(id)){
                bookCopyRepository.deleteById(bookCopy.getId());
                break;
            }
        }
    }

    @Override
    public List<BookCopy> findAllByBookId(UUID id) {
        List<BookCopy> filteredBookCopies = new ArrayList<>();

        List<BookCopy> allBookCopies = bookCopyRepository.findAll();
        for (BookCopy bookCopy : allBookCopies) {
            if (bookCopy.getBook().getId().equals(id) ) {
                filteredBookCopies.add(bookCopy);
            }
        }
        return filteredBookCopies;
    }

    @Override
    public List<BookCopy> findAvailableByBookId(UUID id){
        List<BookCopy> filteredBookCopies = new ArrayList<>();

        List<BookCopy> allBookCopies = bookCopyRepository.findAll();

        for (BookCopy bookCopy : allBookCopies) {
            if (bookCopy.getBook().getId().equals(id) && bookCopy.getStatus()) {
                filteredBookCopies.add(bookCopy);
            }
        }
        return filteredBookCopies;
    }
    @Override
    public BookCopy updateOne(UUID id,BookCopyDto bookCopyDto){
        BookCopy foundBookCopy =  bookCopyRepository.findById(id).orElse(null);
        Book foundBook = bookService.findOne(bookCopyDto.bookId);

        if(foundBookCopy != null){
            foundBookCopy.setBook(foundBook);
            foundBookCopy.setStatus(bookCopyDto.status);
            return bookCopyRepository.save(foundBookCopy);
        }
        return null;

    }
    public int countAllByBookId(UUID id){
        List<BookCopy> filteredBookCopies = new ArrayList<>();

        // Query the database to get all book copies
        List<BookCopy> allBookCopies = bookCopyRepository.findAll();

        // Iterate over the book copies and filter based on the bookId
        for (BookCopy bookCopy : allBookCopies) {
            if (bookCopy.getBook().getId().equals(id) ) {
                filteredBookCopies.add(bookCopy);
            }
        }
        return filteredBookCopies.size();
    }
    @Override
    public int countAvailableByBookId(UUID id){
        List<BookCopy> filteredBookCopies = new ArrayList<>();

        // Query the database to get all book copies
        List<BookCopy> allBookCopies = bookCopyRepository.findAll();

        // Iterate over the book copies and filter based on the bookId
        for (BookCopy bookCopy : allBookCopies) {
            if (bookCopy.getBook().getId().equals(id) && bookCopy.getStatus()) {
                filteredBookCopies.add(bookCopy);
            }
        }
        return filteredBookCopies.size();
    }
}
