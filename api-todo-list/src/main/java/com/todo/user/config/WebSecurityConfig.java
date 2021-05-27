package com.todo.user.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
// import org.springframework.security.crypto.factory.PasswordEncoderFactories;
// import org.springframework.security.crypto.password.PasswordEncoder;



@Configuration
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
	UserDetailsService userDetailsService;
	
	@Override
	public AuthenticationManager authenticationManagerBean() throws Exception {
		return super.authenticationManagerBean();
	}
	
	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {	
		auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder());
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		return bCryptPasswordEncoder;
	}

	/*
	@Bean
	public PasswordEncoder passwordEncoder() {
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}
	*/
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {		
		http.authorizeRequests()
		.antMatchers(HttpMethod.POST, "/login").hasAnyRole("ADMIN","LIDER","USER")
        //.antMatchers(HttpMethod.POST).hasAnyRole("ADMIN")
        .antMatchers(HttpMethod.POST,"/api/v1/task").hasAnyRole("LIDER")
		.antMatchers(HttpMethod.GET,"/api/v1/users/{id}").access("@userSecurity.hasId(authentication,#id)")
        .antMatchers(HttpMethod.GET,"/api/v1/users").hasAnyRole("ADMIN","LIDER")
		.antMatchers(HttpMethod.GET,"/api/v1/projects").hasAnyRole("ADMIN","LIDER","USER")
        .antMatchers(HttpMethod.GET,"/api/v1/task").hasAnyRole("ADMIN","LIDER","USER")
		.antMatchers(HttpMethod.GET,"/api/v1/roles").hasAnyRole("ADMIN")
		.antMatchers(HttpMethod.PUT).hasAnyRole("ADMIN")
		.antMatchers(HttpMethod.DELETE).hasAnyRole("ADMIN");
		
		http.cors().disable();
		http.csrf().disable();
		http.headers().frameOptions().disable();
	
		super.configure(http);
	}
		
	@Override
    public void configure(WebSecurity web) throws Exception {
        web
        .ignoring()
        .antMatchers("/h2-console/**");
    }
}
