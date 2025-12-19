package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository repo;

    private BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    @Override
    public User saveUser(User user) {
        user.setPassword(encoder.encode(user.getPassword()));
        if (user.getRole() == null) user.setRole("ROLE_USER");
        return repo.save(user);
    }

    @Override
    public User findByUsername(String username) {
        return repo.findByUsername(username);
    }
}
