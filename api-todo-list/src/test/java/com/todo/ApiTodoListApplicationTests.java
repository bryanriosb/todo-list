package com.todo;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.Instant;

import com.todo.user.model.User;
import com.todo.user.model.Role;
import com.todo.user.repository.RoleRepository;
import com.todo.user.repository.UserRepository;

@SpringBootTest
class ApiTodoListApplicationTests {
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private BCryptPasswordEncoder encoder;

	Instant instant = Instant.now();
	
	/* Creación de Usuarios principales */
	
	@Test
	void createAdminUser() {
		User user = new User();
		user.setIdentityCard("1145029741");
		user.setName("Administrador");
		user.setEmail("admin@todolist.com");
		user.setPassword(encoder.encode("12345678"));
		user.setState(true);
		user.setDeleted(false);
		user.setRole("ADMIN");
		user.setCreationDate(instant.toEpochMilli());
		user.setUpdateDate(null);
		
		User created = userRepository.save(user);

		assertTrue(created.getPassword().equalsIgnoreCase(user.getPassword()));
	}

	@Test
	void createLiderUser() {
		User user = new User();
		user.setIdentityCard("1125502041");
		user.setName("Lider");
		user.setEmail("lider@todolist.com");
		user.setPassword(encoder.encode("12345678"));
		user.setState(true);
		user.setDeleted(false);
		user.setRole("LIDER");
		user.setCreationDate(instant.toEpochMilli());
		user.setUpdateDate(null);
		
		User created = userRepository.save(user);

		assertTrue(created.getPassword().equalsIgnoreCase(user.getPassword()));
	}

	@Test
	void createUser() {
		User user = new User();
		user.setIdentityCard("1114685951");
		user.setName("User");
		user.setEmail("user@todolist.com");
		user.setPassword(encoder.encode("12345678"));
		user.setState(true);
		user.setDeleted(false);
		user.setRole("USER");
		user.setCreationDate(instant.toEpochMilli());
		user.setUpdateDate(null);
		
		User created = userRepository.save(user);

		assertTrue(created.getPassword().equalsIgnoreCase(user.getPassword()));
	}
	
	/* Creación de Roles */
	
	@Test
	void createAdminRole() {
		Role role = new Role();
		role.setName("ADMIN");
		
		Role created = roleRepository.save(role);

		assertTrue(created.getName().equalsIgnoreCase(role.getName()));
	}
	
	@Test
	void createLiderRole() {
		Role role = new Role();
		role.setName("LIDER");
		
		Role created = roleRepository.save(role);

		assertTrue(created.getName().equalsIgnoreCase(role.getName()));
	}
	
	@Test
	void createUserRole() {
		Role role = new Role();
		role.setName("USER");
		
		Role created = roleRepository.save(role);

		assertTrue(created.getName().equalsIgnoreCase(role.getName()));
	}
}
