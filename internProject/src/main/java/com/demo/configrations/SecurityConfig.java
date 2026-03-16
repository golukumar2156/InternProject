package com.demo.configrations;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import jakarta.servlet.http.HttpServletRequest;


@Configuration
public class SecurityConfig {
	
	@Autowired
	private CustomAuthenticationEntryPoint customAuthenticationEntryPoint;
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {

	    return http

	            .csrf(AbstractHttpConfigurer::disable)

	            .httpBasic(AbstractHttpConfigurer::disable)

	            .sessionManagement(session ->
	                    session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

	            .authorizeHttpRequests(auth -> auth

	            		.requestMatchers(
	            		        "/v3/api-docs/**",
	            		        "/swagger-ui/**",
	            		        "/swagger-ui.html"
	            		).permitAll()


	                    .requestMatchers("/api/public/**").permitAll()

	                    .requestMatchers("/api/admin/**").hasRole("ADMIN")

	                    .requestMatchers("/api/user/**").hasRole("USER")

	                    .anyRequest().authenticated()
	            )

	            .addFilterBefore(new JwtValidator(), UsernamePasswordAuthenticationFilter.class)

	            .cors(cors -> cors.configurationSource(corsConfigurationSource()))

	            .exceptionHandling(exception ->
	                    exception.authenticationEntryPoint(customAuthenticationEntryPoint)
	            )

	            .build();
	}

	
	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	private CorsConfigurationSource corsConfigurationSource() {
		return new CorsConfigurationSource() {
			@Override
			public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
				CorsConfiguration cfg = new CorsConfiguration();
				cfg.setAllowedOrigins(Arrays.asList(
						"http://localhost:5173"
				));
				cfg.setAllowedMethods(Collections.singletonList("*"));
				cfg.setAllowCredentials(true);
				cfg.setAllowedHeaders(Collections.singletonList("*"));
				cfg.setExposedHeaders(Arrays.asList("Authorization"));
				cfg.setMaxAge(3600L);
				return cfg;
			}
		};
	}

}
