package com.todo.task.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.task.model.Task;
import com.todo.task.repository.TaskRepository;

@Service
public class TaskService  implements ITask {
	@Autowired
	private TaskRepository taskRepository;

	@Override
	public List<Task> findAll() {
		return taskRepository.findAll();
	}

	@Override
	public Optional<Task> findById(Long id) {
		return taskRepository.findById(id);
	}

	public Task findByTaskName(String name) {
		Task task = taskRepository.findByName(name);
		return task;
	}
	
	public Task save(Task createTask) {
		Task task=taskRepository.save(createTask);
		return task;
	}

	public Task update(Long id, Task task) {
		Optional<Task> retrieved=taskRepository.findById(id);
		if(retrieved == null)
			try {
				throw new Exception("Usuario inexistent");
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		
		taskRepository.save(task);
		return taskRepository.findById(id).get();
	}
	
	public Task delete(Long id) {
		Optional<Task> retrieved=taskRepository.findById(id);
		if (retrieved == null)
			try {
				throw new Exception("Usuario inexistente");
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		
		taskRepository.deleteById(id);
		return retrieved.get();
	}

}
