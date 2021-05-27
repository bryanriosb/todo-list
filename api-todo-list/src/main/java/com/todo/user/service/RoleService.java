package com.todo.user.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.user.model.Role;
import com.todo.user.repository.RoleRepository;

@Service
public class RoleService implements IRole {
	@Autowired
	private RoleRepository roleRepository;

	@Override
	public List<Role> findAll() {
		return roleRepository.findAll();
	}
}
