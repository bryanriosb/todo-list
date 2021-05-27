package com.todo.user.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.todo.user.repository.UserRepository;

@Component("userSecurity")
public class UserSecurity {

    @Autowired
	UserRepository userRepository;

    public boolean hasId(Authentication authentication, int id) {
		int userId = userRepository.findByEmail(authentication.getName()).getId();
        
        if(userId == id)
            return true;
        return false;
    }
}
