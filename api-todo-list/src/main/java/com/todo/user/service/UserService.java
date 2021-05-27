package com.todo.user.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.user.model.User;
import com.todo.user.repository.UserRepository;

@Service
public class UserService implements IUser {
	@Autowired
	private UserRepository userRepository;

	@Override
	public List<User> findAll() {
		return userRepository.findAll();
	}

	@Override
	public Optional<User> findById(int id) {
		return userRepository.findById(id);
	}

	@Override
	public User findByEmail(String email) {
		return userRepository.findByEmail(email);
	}
	
	public User save(User newUser) {
		User user=userRepository.save(newUser);
		return user;
	}

	public User update(int id, User user) {
		Optional<User> retrieved=userRepository.findById(id);
		if(retrieved == null)
			try {
				throw new Exception("Usuario inexistente");
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		
		userRepository.save(user);
		return userRepository.findById(id).get();
	}
	
	public User delete(int userId) {
		Optional<User> retrieved = userRepository.findById(userId);
		if (retrieved == null)
			try {
				throw new Exception("Usuario inexistente");
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		
		userRepository.deleteById(userId);
		return retrieved.get();
	}
}
