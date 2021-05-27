package com.todo.task.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PostFilter;
import org.springframework.security.core.Authentication;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;

import org.springframework.web.bind.annotation.PathVariable;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import com.todo.task.model.Task;
import com.todo.task.service.TaskService;


@RestController
@RequestMapping("/api/v1")
public class TaskRestController {
    @Autowired
	TaskService taskService;
    
	@GetMapping("/tasks")
	public List<Task> getAllTasks(Authentication authentication) {
		return taskService.findAll();
	}

    @GetMapping("/tasks/assigned")
	@PostFilter("filterObject.email==authentication.name")
	public List<Task> getTaskOwnedBy() {
		return taskService.findAll();
	}

    @PostMapping("/tasks")
	public ResponseEntity<Task> saveTasks(@RequestBody Task createTask, Authentication auth) {
		System.out.println(createTask.getName()+"  "+auth.getName());
		return ResponseEntity.status(HttpStatus.CREATED).body((taskService.save(createTask)));
	}

	@GetMapping("/tasks/{id}")
	public ResponseEntity<Task> getTaskById(@PathVariable("id") Long id) {
		return ResponseEntity.ok().body(taskService.findById(id).get());
	}

    @PutMapping("/tasks/{id}")
	public ResponseEntity<Task> updateTask(@PathVariable("id") Long id, @RequestBody Task updateTask) {
		return ResponseEntity.ok().body(taskService.update(id, updateTask));	
	}

    @DeleteMapping("/tasks/{id}")
	public ResponseEntity<Object> deleteTask(@PathVariable("id") Long id) {
        taskService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

	/*
    @GetMapping("/tasks/search")
	public ResponseEntity<Task> taskDetails(Authentication authentication, @RequestParam("taskName") String taskName) throws Exception {
		System.out.println(authentication.getName().toString());
		Task task = taskService.findByTaskName(taskName);
		if (task == null) {
			ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tarea inexistente");
		}
		return ResponseEntity.ok().body(task);
	}
	*/
}