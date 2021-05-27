package com.todo.task.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.todo.project.model.Project;
import com.todo.user.model.User;


@Entity
@Table(name = "tarea")
public class Task {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "tarea_proyecto")
	private Project project;
	
	private @Column(name = "nombre") String name;
	private @Column(name = "descripcion") String description;
	private String alias;
	private @Column(name = "fecha_inicio") Long startDate;
	private @Column(name = "fecha_finalizacion") Long finishDate;
	
	@ManyToOne
	private @JoinColumn(name = "tarea_usuario") 
	User user;
	
	public Task(Project project, String name, String description, String alias, Long startDate, Long finishDate,
			User user) {
		super();
		this.project = project;
		this.name = name;
		this.description = description;
		this.alias = alias;
		this.startDate = startDate;
		this.finishDate = finishDate;
		this.user = user;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

	public Long getStartDate() {
		return startDate;
	}

	public void setStartDate(Long startDate) {
		this.startDate = startDate;
	}

	public Long getFinishDate() {
		return finishDate;
	}

	public void setFinishDate(Long finishDate) {
		this.finishDate = finishDate;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
