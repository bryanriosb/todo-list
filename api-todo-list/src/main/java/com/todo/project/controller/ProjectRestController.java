package com.todo.project.controller;

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

import com.todo.project.model.Project;
import com.todo.project.service.ProjectService;

@RestController
@RequestMapping("/api/v1")
public class ProjectRestController {
    @Autowired
	ProjectService projectService;
    
	@GetMapping("/projects")
	public List<Project> getAllProjects(Authentication authentication) {
		return projectService.findAll();
	}

    @GetMapping("/projects/assigned")
	@PostFilter("filterObject.email==authentication.name")
	public List<Project> getProjectOwnedBy() {
		return projectService.findAll();
	}

	@GetMapping("/projects/{id}")
	public ResponseEntity<Project> getProjectById(@PathVariable("id") Long id) {
		return ResponseEntity.ok().body(projectService.findById(id).get());
	}

    @PostMapping("/projects")
	public ResponseEntity<Project> saveProjects(@RequestBody Project createTask, Authentication auth) {
		System.out.println(createTask.getName()+"  "+auth.getName());
		return ResponseEntity.status(HttpStatus.CREATED).body((projectService.save(createTask)));
	}

    @PutMapping("/projects/{id}")
	public ResponseEntity<Project> updateProject(@PathVariable("id") Long id, @RequestBody Project updateProject) {
		return ResponseEntity.ok().body(projectService.update(id, updateProject));	
	}

    @DeleteMapping("/projects/{id}")
	public ResponseEntity<Object> deleteProject(@PathVariable("id") Long id) {
        projectService.delete(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	}

    /*
    @GetMapping("/projects/search")
	public ResponseEntity<Project> taskDetails(Authentication authentication, @RequestParam("taskName") String taskName) throws Exception {
		System.out.println(authentication.getName().toString());
		Project project = projectService.findByTaskName(taskName);
		if (project == null) {
			ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tarea inexistente");
		}
		return ResponseEntity.ok().body(project);
	}
    */
}
