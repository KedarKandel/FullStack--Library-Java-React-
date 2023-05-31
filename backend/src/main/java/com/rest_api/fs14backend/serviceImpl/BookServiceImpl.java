package com.rest_api.fs14backend.serviceImpl;

import com.rest_api.fs14backend.dto.BookDto;
import com.rest_api.fs14backend.entity.*;
import com.rest_api.fs14backend.mapper.BookMapper;
import com.rest_api.fs14backend.repository.BookCopyRepository;
import com.rest_api.fs14backend.repository.BorrowerRepository;
import com.rest_api.fs14backend.service.AuthorService;
import com.rest_api.fs14backend.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.acls.model.NotFoundException;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

import com.rest_api.fs14backend.repository.BookRepository;
import com.rest_api.fs14backend.service.BookService;


@Service
public class BookServiceImpl implements BookService {
    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookCopyRepository bookCopyRepository;

    @Autowired
    BorrowerRepository borrowerRepository;
    @Autowired
    AuthorService authorService;

    @Autowired
    CategoryService categoryService;

    @Autowired
    BookMapper bookMapper;

    @Override
    public List<Book> findAll(){
        return bookRepository.findAll();
    }

    @Override
    public Book findOne (UUID id){
        return bookRepository.findById(id).orElse(null);
    }
    @Override
    public Book getBookByCopyId(UUID bookCopyId) {
        BookCopy bookCopy = bookCopyRepository.findById(bookCopyId)
                .orElseThrow(() -> new NotFoundException("BookCopy not found"));
        return bookCopy.getBook();
    }
    @Override
    public Book createOne(BookDto bookDto) {
        UUID authorId = bookDto.getAuthorId();
        Author foundAuthor = authorService.getAuthorById(authorId);
        UUID categoryId = bookDto.getCategoryId();
        Category foundCategory = categoryService.findCategoryById(categoryId);

        Book newBook = bookMapper.toBook(bookDto, foundCategory, foundAuthor);

        // Create a new book copy and set its status to true
        BookCopy bookCopy = new BookCopy(newBook, true);

        // Set the book copy's book reference
        bookCopy.setBook(newBook);

        // Add the book copy to the copies list of the new book
        newBook.getCopies().add(bookCopy);

        // Save the new book (including the book copy) in the repository
        return bookRepository.save(newBook);
    }



    @Override
    public Book updateOne(UUID id, BookDto bookDto) {
        Book foundBook = bookRepository.findById(id).orElse(null);
        UUID authorId = bookDto.getAuthorId();
        Author foundAuthor = authorService.getAuthorById(authorId);
        UUID categoryId = bookDto.getCategoryId();
        Category foundCategory = categoryService.findCategoryById(categoryId);

        if (foundBook != null) {
            foundBook.setIsbn(bookDto.getIsbn());
            foundBook.setTitle(bookDto.getTitle());
            foundBook.setAuthor(foundAuthor);
            foundBook.setDescription(bookDto.getDescription());
            foundBook.setCategory(foundCategory);
            foundBook.setPublishedDate(bookDto.getPublishedDate());
            foundBook.setPublisher(bookDto.getPublisher());
            foundBook.setCover(bookDto.getCover());

            // Update the book copies
            List<BookCopy> bookCopies = foundBook.getCopies();
            for (BookCopy bookCopy : bookCopies) {
                bookCopy.setStatus(true);  // Update the status of each book copy to true
            }

            // Save the updated book (including the updated book copies) in the repository
            return bookRepository.save(foundBook);
        }
        return null;
    }


    /*@Override
    public UUID deleteOne(UUID id) {
        Optional<Book> bookOptional = bookRepository.findById(id);
        if (bookOptional.isPresent()) {
            Book book = bookOptional.get();
            List<BookCopy> bookCopies = book.getCopies();

            // Delete all book copies
            bookCopyRepository.deleteAll(bookCopies);

            // Delete the book
            bookRepository.delete(book);
        }
        return bookOptional.get().getId();
    }*/

    @Override
    public UUID deleteOne(UUID id) {
        Optional<Book> bookOptional = bookRepository.findById(id);
        if (bookOptional.isPresent()) {
            Book book = bookOptional.get();
            List<BookCopy> bookCopies = book.getCopies();

            boolean allReturned = true;
            for (BookCopy copy : bookCopies) {
                if (!copy.getStatus()) {
                    allReturned = false;
                    break;
                }
            }

            if (allReturned) {
                // Retrieve the transactions referencing the book copies
                List<Borrower> transactions = borrowerRepository.findByBookCopyIn(bookCopies);

                // Remove the references to the book copies from the transactions
                for (Borrower transaction : transactions) {
                    transaction.setBookCopy(null);
                }

                // Delete all the book copies
                bookCopyRepository.deleteAll(bookCopies);

                // Delete the book
                bookRepository.delete(book);
                System.out.println(book.getId());
                return book.getId(); // Return the ID of the deleted book
            } else {
                throw new IllegalStateException("Cannot delete the book. Some book copies are still on loan.");
            }
        } else {
            throw new NoSuchElementException("Book not found."); // Handle the case when the book with the given ID is not found
        }
    }





}
