package com.todo.project.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.todo.project.model.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {}
