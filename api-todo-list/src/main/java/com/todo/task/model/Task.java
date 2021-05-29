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
	
	private @Column(length = 50, name = "nombre") String name;
	private @Column(length = 300, name = "descripcion") String description;
	private @Column(length = 50, unique = true)String alias;
	private @Column(name = "Avance") int advance;
	private @Column(name = "fecha_inicio") Long startDate;
	private @Column(name = "fecha_finalizacion") Long finishDate;
	private @Column(name = "tiempo_ejecución") String time;
	private @Column(name="fecha_creacion") Long creationDate;
	private @Column(name="fecha_actualizacion") Long updateDate;
	private @Column(name="eliminado") Boolean deleted;
	
	@ManyToOne
	private @JoinColumn(name = "tarea_usuario") 
	User user;
	
	
	public Task(){}
	
	
	public Task(Project project, String name, String description, String alias, int advance, Long startDate,
			Long finishDate, String time, Long creationDate, Long updateDate, Boolean deleted, User user) {
		super();
		this.project = project;
		this.name = name;
		this.description = description;
		this.alias = alias;
		this.advance = advance;
		this.startDate = startDate;
		this.finishDate = finishDate;
		this.time = time;
		this.creationDate = creationDate;
		this.updateDate = updateDate;
		this.deleted = deleted;
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
	
	public int getAdvance() {
		return advance;
	}

	public void setAdvance(int advance) {
		this.advance = advance;
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

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}
	
	public Long getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Long creationDate) {
		this.creationDate = creationDate;
	}

	public Long getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(Long updateDate) {
		this.updateDate = updateDate;
	}
	
	public Boolean getDeleted() {
		return deleted;
	}

	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
	}



	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}
	
}
