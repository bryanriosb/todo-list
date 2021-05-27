package com.todo.task.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.todo.task.model.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    Task findByName(String name);
}
