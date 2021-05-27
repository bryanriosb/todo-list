package com.todo.user.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.todo.user.service.RoleService;
import com.todo.user.model.Role;


@RestController
@RequestMapping("/api/v1")
public class RoleRestController {
	@Autowired
	RoleService roleService;

	@GetMapping("/roles")
	public List<Role> getAllRoles(Authentication authentication) {
		return roleService.findAll();
	}
}
