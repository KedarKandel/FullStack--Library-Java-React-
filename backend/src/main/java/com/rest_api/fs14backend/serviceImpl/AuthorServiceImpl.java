package com.rest_api.fs14backend.serviceImpl;

import com.rest_api.fs14backend.entity.Author;
import com.rest_api.fs14backend.repository.AuthorRepository;
import com.rest_api.fs14backend.service.AuthorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthorServiceImpl implements AuthorService {
    @Autowired
    private AuthorRepository authorRepository;

    @Override
    public Author createAuthor(Author author) {

        author.setName(author.getName());
        author.setEmail(author.getEmail());
        author.setPhone(author.getPhone());
        return authorRepository.save(author);
    }
    public Author getAuthorById(UUID id) {
        Optional<Author> userOptional = authorRepository.findById(id);
        return userOptional.orElse(null);
    }

    @Override
    public List<Author> getAllAuthors() {
        return authorRepository.findAll();
    }

    @Override
    public Author updateAuthor(UUID id,Author author) {
        Author existingAuthor = authorRepository.findById(id).orElse(null);
        if(existingAuthor != null) {
            existingAuthor.setEmail(author.getEmail());
            existingAuthor.setName(author.getName());
            existingAuthor.setPhone(author.getPhone());
            return authorRepository.save(existingAuthor);
        }
        return null;
    }


    @Override
    public UUID deleteAuthor(UUID authorId) {
        Optional<Author> authorOptional = authorRepository.findById(authorId);
        if (authorOptional.isPresent()) {
            Author deletedAuthor = authorOptional.get();
            authorRepository.delete(deletedAuthor);
            return deletedAuthor.getId();
        }
        return null; // Author not found or deletion failed
    }
}
