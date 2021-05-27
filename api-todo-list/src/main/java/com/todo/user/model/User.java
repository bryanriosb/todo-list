package com.todo.user.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "usuario")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private  int id;
	private @Column(name = "cedula") String identityCard;
	private @Column(name = "nombre") String name;
	private @Column(name = "correo") String email;
	private @Column(name = "contrasena") String password;
	private @Column(name = "stado") Boolean state;
	private @Column(name = "eliminado") Boolean deleted;
	private @Column(name = "rol") String role;
	private @Column(name = "fecha_creacion") Long creationDate;
	private @Column(name = "fecha_actualizacion") Long updateDate;
	
	public User(Long id, String identityCard, String name, String email, String role, String password, Boolean state,
			Boolean deleted, Long creationDate, Long updateDate) {
		super();
		this.identityCard = identityCard;
		this.name = name;
		this.email = email;
		this.role = role;
		this.password = password;
		this.state = state;
		this.deleted = deleted;
		this.creationDate = creationDate;
		this.updateDate = updateDate;
	}

	public User() {
		super();
	}

	public User( int id,String email, String password) {
		super();
	
		this.email = email;
		this.password = password;
		this.id=id;
		
	}
	
	public int getId() {
		return id;
	}
	
	public void setId(int id) {
		this.id = id;
	}
	
	public String getIdentityCard() {
		return identityCard;
	}
	
	public void setIdentityCard(String identityCard) {
		this.identityCard = identityCard;
	}
	
	public String getName() {
		return name;
	}
	
	public void setName(String name) {
		this.name = name;
	}
	
	public String getEmail() {
		return email;
	}
	
	public void setEmail(String email) {
		this.email = email;
	}
	
	public String getRole() {
		return role;
	}
	
	public void setRole(String role) {
		this.role = role;
	}
	
	public String getPassword() {
		return password;
	}
	
	public void setPassword(String password) {
		this.password = password;
	}
	
	public Boolean getState() {
		return state;
	}
	
	public void setState(Boolean state) {
		this.state = state;
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

	@Override
	public int hashCode() {
		return this.id;
	}


	@Override
	public boolean equals(Object obj) {
		if(obj==null || !(obj instanceof User) )
			return false;
		return this.id==((User)obj).getId();
	}
}


