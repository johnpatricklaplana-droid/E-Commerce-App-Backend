package com.example.demo.security;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.FilterChainProxy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class SecurityConfig {
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
        .csrf(csrf -> csrf.disable())
        .formLogin(form -> form.disable())
        .httpBasic(basic -> basic.disable())
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .cors(cors -> cors.configurationSource(CORSConfiguration()))
        .authorizeHttpRequests(auth -> auth
            .requestMatchers("/signup/costumer", 
                                "/login/costumer", 
                                "/signup/seller", 
                                "/login/seller",
                                "/login/admin",
                                "/Frontend/index.html",
                                "/Frontend/src/pages/landing-page.js",
                                "/Frontend/src/main.js",
                                "/Frontend/public/vite.svg",
                                "/Frontend/src/style.css",
                                "/Frontend/seller-signup-page.html",
                                "/Frontend/src/pages/seller_signup.js",
                                "/Frontend/src/api/api.js",
                                "/Frontend/src/utils/boilerplate_code_handler.js",
                                "/Frontend/costumer-signup-page.html",
                                "/Frontend/src/pages/costumer_signup.js",
                                "/Frontend/seller-login-page.html",
                                "/Frontend/costumer-login-page.html",
                                "/Frontend/public/cuties.png",
                                "/Frontend/public/hero_background.png",
                                "/Frontend/src/pages/seller_signup.js",
                                "/business-registration-file/seller",
                                "/Frontend/admin-login-page.html",
                                "/Frontend/src/pages/admin_login.js").permitAll() 
            .requestMatchers(
                "/Frontend/add-profile-seller.html",
                "/Frontend/add-business-registration-file.html",
                "/business-registration-file/seller",
                "/seller/bank-account",
                "/Frontend/add-seller-bank-account.html", 
                "/seller/add-profile-picture",
                "/Frontend/seller-dashboard.html",
                "/seller/product", 
                "/seller/business-registration-file"
            )
            .hasRole("SELLER")
            .requestMatchers(
                "/admin/business-registration-file",
                "/business-registration-file/{fileName}",
                "/Frontend/admin-seller-registration-document-storage.html",
                "/admin/business-registration-file/{id}/accept",
                "/admin/business-registration-file/{id}/reject"
            )
            .hasRole("ADMIN")
            .anyRequest().authenticated()
        )
        .addFilterBefore(jwtService(), org.springframework.security.web.access.intercept.AuthorizationFilter.class);

        return http.build();
    }

    @Bean
    public CommandLineRunner printFilters(FilterChainProxy proxy) {
        return args -> proxy.getFilterChains().forEach(chain -> {
            System.out.println("=== FILTER ORDER ===");
            chain.getFilters().forEach(f ->
                System.out.println(f.getClass().getSimpleName())
            );
        });
    }

    @Bean
    public JwtAuthenticationService jwtService () {
        return new JwtAuthenticationService();
    }

    @Bean
    public CorsConfigurationSource CORSConfiguration() {

        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOrigins(List.of("http://localhost:5173"));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE"));
        config.setAllowCredentials(true);
        config.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder () {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }
}
