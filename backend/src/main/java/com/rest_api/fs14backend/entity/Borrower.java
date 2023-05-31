package com.rest_api.fs14backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.rest_api.fs14backend.dto.BorrowerDto;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.UUID;

@Entity
@Table (name = "transaction")
@NoArgsConstructor
@Data

public class Borrower {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;
    @ManyToOne
    @JoinColumn(name="user_id", referencedColumnName = "id")
    private User user;
    @JoinColumn(name = "book_copy_id", referencedColumnName = "id")
    @ManyToOne(fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private BookCopy bookCopy;
    @Column(nullable = false)
    private Date borrowDate;
    @Column(nullable = false)
    private Date returnDate;
    private boolean isReturned;

    private Date returnedDate;

    public Borrower(User user, BookCopy bookCopy, Date borrowDate, Date returnDate, boolean isReturned, Date returnedDate) {
        this.user = user;
        this.bookCopy = bookCopy;
        this.borrowDate = borrowDate;
        this.returnDate = returnDate;
        this.isReturned = isReturned;
        this.returnedDate = returnedDate;
    }


    public BorrowerDto toDTO() {
        return new BorrowerDto(bookCopy);
    }
}