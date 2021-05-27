package com.todo.project.service;

import java.util.List;
import java.util.Optional;

import com.todo.project.model.Project;


public interface IProject {
	public List<Project> findAll();

	public Optional<Project> findById(Long id);
	
}
