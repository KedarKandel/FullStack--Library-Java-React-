package com.rest_api.fs14backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.UuidGenerator;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@Table(name="book")
public class Book {
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;
    @Column(nullable = false)
    private String title;
    @Column(nullable = false)
    private String description;
    @Column
    private String isbn;
    @ManyToOne
    @JoinColumn(name = "author_id", referencedColumnName = "id")
    private Author author;
    @ManyToOne
    @JoinColumn(name = "category_id",referencedColumnName = "id")
    private Category category;
    @Column(nullable = false)
    private Date publishedDate;
    @Column(nullable = false)
    private String publisher;
    @Column(nullable = false)
    private String cover;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonManagedReference
    @ToString.Exclude
    private List<BookCopy> copies;
    public Book(String title, String description, String isbn, Author author, Category category, Date publishedDate, String publisher, String cover) {
        this.title = title;
        this.description = description;
        this.isbn = isbn;
        this.author = author;
        this.category = category;
        this.publishedDate = publishedDate;
        this.publisher = publisher;
        this.cover = cover;
        this.copies = new ArrayList<>();
    }
}