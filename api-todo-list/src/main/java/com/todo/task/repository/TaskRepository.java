package com.todo.task.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.todo.task.model.Task;

import java.util.List;


@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    Task findByName(String name);
    
    @Query("SELECT t FROM Task t WHERE t.project.id = ?1")
   // @Query(
   // 		value = "SELECT * FROM tarea WHERE tarea.tarea_proyecto LIKE %:filtro%",
    //		nativeQuery = true
   // )
    List<Task> findAllTaskByProject(long filtro);
}
