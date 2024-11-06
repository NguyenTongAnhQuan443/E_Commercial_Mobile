/*
 * @ (#) SercurityConfig.java       1.0     04/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.security;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 04/11/2024
 * @version:    1.0
 */

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;

import java.util.Arrays;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.authorizeHttpRequests(
                configure -> configure
                        .requestMatchers(HttpMethod.GET, "/api/**").permitAll()
                        .requestMatchers(HttpMethod.POST, "/api/**").permitAll()
        );

        // Configure CORS to allow requests from the front-end host
        http.cors(cors -> {
            cors.configurationSource(request -> {
                CorsConfiguration config = new CorsConfiguration();
                config.addAllowedOrigin("http://localhost:8081");
                config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
                config.addAllowedHeader("*");
                return config;
            });
        });

        // Configure the HttpSecurity to use stateless sessions
        http.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        // Configure the HttpSecurity to use HTTP Basic authentication
        http.httpBasic(Customizer.withDefaults());

        // Disable CSRF protection
        http.csrf(csrf -> csrf.disable());

        return http.build();
    }
}
