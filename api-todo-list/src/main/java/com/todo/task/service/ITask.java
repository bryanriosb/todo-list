package com.todo.task.service;

import java.util.List;
import java.util.Optional;

import com.todo.task.model.Task;

public interface ITask {
    public List<Task> findAll();

	public Optional <Task> findById(Long id);
	
	public List<Task> findAllByProject(Long id);
}
