package com.rest_api.fs14backend.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.UuidGenerator;

import java.util.UUID;

@Entity
@Table(name="author")
@NoArgsConstructor
@Data
public class Author {
    @Id
    @GeneratedValue
    @UuidGenerator
    private UUID id;
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String name;
    @Column(nullable = false, columnDefinition = "varchar(50)")
    private String email;
    @Column(nullable = true, columnDefinition = "varchar(50)")
    private String phone;
}