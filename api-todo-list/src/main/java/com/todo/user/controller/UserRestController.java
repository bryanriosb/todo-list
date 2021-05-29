package com.todo.user.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.todo.user.model.User;
import com.todo.user.service.UserService;

@RestController
@RequestMapping("/api/v1")
@EnableGlobalMethodSecurity(prePostEnabled=true)
public class UserRestController {
    @Autowired
	UserService service;
    
    @Autowired
    private BCryptPasswordEncoder encoder;

	@PostMapping("/login")
	public ResponseEntity<User> signIn(@RequestBody User user, Authentication auth) {
		User loginUser = service.findByEmail(auth.getName());
		return ResponseEntity.status(HttpStatus.ACCEPTED).body((loginUser));
	}

    @PreAuthorize("hasRole('ROLE_ADMIN') or hasRole('ROLE_LIDER')")
	@GetMapping("/users")
	public List<User> getAllUsers(Authentication authentication) {
		return service.findAll();
	}

    @PostMapping("/users")
	public ResponseEntity<User> saveUsers(@RequestBody User createUser, Authentication auth) {
		String pass = encoder.encode(createUser.getPassword());
		createUser.setPassword(pass);
		return ResponseEntity.status(HttpStatus.CREATED).body((service.save(createUser)));
	}

    @PreAuthorize("@userSecurity.hasId(authentication,#id)")
	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable("id") int id, Authentication authentication) {
		System.out.println("Entró a getUserById");
		return ResponseEntity.ok().body(service.findById(id).get());
	}

    @PutMapping("/users/{id}")
	public ResponseEntity<User> updateUser(@PathVariable("id") int id, @RequestBody User updateUser) {
		return ResponseEntity.ok().body(service.update(id, updateUser));	
	}

    @DeleteMapping("/users/{id}")
	public ResponseEntity<Object> deleteUser(@PathVariable("id") int id) {
        service.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

}
