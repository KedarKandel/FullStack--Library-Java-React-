package com.rest_api.fs14backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.UuidGenerator;

import java.util.List;
import java.util.UUID;


@Entity
@Data
@NoArgsConstructor
public class BookCopy {
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;
    @ManyToOne(optional = false, fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JoinColumn(name = "book_id", referencedColumnName = "id")
    //@JsonIgnoreProperties("copies")
    @JsonIgnoreProperties({"copies","hibernateLazyInitializer", "handler"})
    private Book book;
    @Column(nullable = false)
    private boolean status;
    public boolean getStatus() {
        return status;
    }
    public void setStatus(boolean status) {
        this.status = status;
    }

    public BookCopy(Book book, boolean status) {
        this.book = book;
        this.status = status;
    }
}