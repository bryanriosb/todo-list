package com.todo.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.todo.user.model.User;


@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
	User findByEmail(String email);
}
