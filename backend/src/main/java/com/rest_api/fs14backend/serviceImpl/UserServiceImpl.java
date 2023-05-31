package com.rest_api.fs14backend.serviceImpl;

import com.rest_api.fs14backend.dto.AuthRequestDto;
import com.rest_api.fs14backend.entity.User;
import com.rest_api.fs14backend.repository.UserRepository;
import com.rest_api.fs14backend.service.UserService;
import com.rest_api.fs14backend.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtils jwtUtils;

    @Override
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    public String login(AuthRequestDto authRequestDto){
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authRequestDto.getUsername(),
                        authRequestDto.getPassword()
                )
        );
        User user = userRepository.findByUsername(authRequestDto.getUsername());
        return jwtUtils.generateToken(user);
    }

    @Override
    public User signup(User user) {
        // Check if the user already exists
        User existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser != null) {
            // User already registered, do nothing
            return existingUser;
        }

        // User is not registered, create a new user
        User newUser = new User(user.getUsername(), passwordEncoder.encode(user.getPassword()), user.getRole());
        userRepository.save(newUser);
        return newUser;
    }

    @Override
    public User getUserById(UUID userId) {
        System.out.println(userId);
        Optional<User> userOptional = userRepository.findById(userId);
        return userOptional.orElseThrow(() -> new NoSuchElementException("User not found"));
    }
}