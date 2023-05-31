package com.rest_api.fs14backend.repository;

import com.rest_api.fs14backend.entity.BookCopy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface BookCopyRepository extends JpaRepository<BookCopy, UUID> {
}
