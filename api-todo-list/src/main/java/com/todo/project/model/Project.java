package com.todo.project.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.todo.user.model.User;


@Entity
@Table(name = "proyecto")
public class Project {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	private @Column(name = "nombre") String name;
	private @Column(name = "descripcion") String description;
	private String alias;
	private @Column(name = "estado") Boolean state;
	private @Column(name = "fecha_inicio") Long startDate;
	private @Column(name = "fecha_finalizacion") Long finishDate;
	
	@ManyToOne
	private @JoinColumn(name = "proyecto_usuario")
	User user;
	
	private @Column(name="eliminado") Boolean deleted;
	private @Column(name="fecha_creacion") Long creationDate;
	private @Column(name="fecha_actualizacion") Long updateDate;
		
	public Project(String name, String description, String alias, Boolean state, Long startDate, Long finishDate,
			User user, Boolean deleted, Long creationDate, Long updateDate) {
		super();
		this.name = name;
		this.description = description;
		this.alias = alias;
		this.state = state;
		this.startDate = startDate;
		this.finishDate = finishDate;
		this.user = user;
		this.deleted = deleted;
		this.creationDate = creationDate;
		this.updateDate = updateDate;
	}

	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
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
	
	public Boolean getState() {
		return state;
	}
	
	public void setState(Boolean state) {
		this.state = state;
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
	
	public Boolean getDeleted() {
		return deleted;
	}
	
	public void setDeleted(Boolean deleted) {
		this.deleted = deleted;
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
	
}
