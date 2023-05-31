package com.rest_api.fs14backend.repository;

import com.rest_api.fs14backend.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface BookRepository extends JpaRepository<Book, UUID>{

}
