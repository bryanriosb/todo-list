package com.todo.project.service;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.todo.project.model.Project;
import com.todo.project.repository.ProjectRepository;


@Service
public class ProjectService implements IProject {
	Instant instant = Instant.now();
	
	@Autowired
	private ProjectRepository projectRepository;

	@Override
	public List<Project> findAll() {
		return projectRepository.findAll();
	}

	@Override
	public Optional<Project> findById(Long id) {
		return projectRepository.findById(id);
	}
	
	public Project save(Project createProject) {
		Project project = projectRepository.save(createProject);
		return project;
	}

	public Project update(Long id, Project project) {
		Optional<Project> retrieved = projectRepository.findById(id);
		if(retrieved == null)
			try {
				throw new Exception("Usuario inexistent");
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		
		projectRepository.save(project);
		return projectRepository.findById(id).get();
	}
	
	public Project delete(Long id) {
		Optional<Project> retrieved = projectRepository.findById(id);
		if (retrieved == null)
			try {
				throw new Exception("Usuario inexistente");
				
			} catch (Exception e) {
				e.printStackTrace();
			}
		
		Project project = retrieved.get();
		project.setDeleted(true);
		project.setFinishDate(instant.toEpochMilli());
		projectRepository.save(project);
		
		return retrieved.get();
	}
}
