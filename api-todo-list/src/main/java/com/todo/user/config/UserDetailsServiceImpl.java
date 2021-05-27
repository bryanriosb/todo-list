package com.todo.user.config;

import org.springframework.security.core.userdetails.UserDetails;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.todo.user.model.User;
import com.todo.user.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
	private UserRepository userRepository;
    
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user = userRepository.findByEmail(username);
				
		if (user == null) {
			throw new UsernameNotFoundException(username + "No encontrado");
		}

        UserDetails userDet = new UserDetailsImpl(user);
		return userDet;
	}
    
}
