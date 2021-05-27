package com.todo.user.service;

import java.util.List;
import java.util.Optional;

import com.todo.user.model.User;

public interface IUser {
	public List<User> findAll() ;

	public Optional<User> findById(int id);
	
	public User findByEmail(String email);
	
}
