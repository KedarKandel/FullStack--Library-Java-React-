package com.rest_api.fs14backend.service;

import com.rest_api.fs14backend.entity.Book;
import com.rest_api.fs14backend.dto.BookDto;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;



@Service
public interface BookService {
    public List<Book> findAll();
    public Book findOne(UUID id);
    public Book createOne(BookDto bookDto);
    public Book updateOne(UUID id, BookDto bookDto);
    public UUID deleteOne(UUID id);
    public Book getBookByCopyId(UUID bookCopyId);
}
