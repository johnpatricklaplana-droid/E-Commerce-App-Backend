package com.example.demo.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.example.demo.Service.Jwt;
import com.example.demo.Service.user.AuthService;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.utils.JwtToken;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class JwtAuthenticationService extends OncePerRequestFilter {

    @Autowired
    AuthService authService;

    @Autowired
    UserRepository userRepository;

    @Autowired
    Jwt jwt;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String token = JwtToken.extractToken(request);
        
        if(token != null && SecurityContextHolder.getContext().getAuthentication().getPrincipal().equals("anonymousUser")) {
            authService.validateJwtToken(token);
           
            User user = userRepository.findById(Integer.parseInt(jwt.extractUsername(token)))
                .orElseThrow(() -> new RuntimeException("User not found"));

            MyUserDetails userDetails = new MyUserDetails(user);

            UsernamePasswordAuthenticationToken authenticationToken = 
                new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null, 
                    userDetails.getAuthorities());
            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }
        
        filterChain.doFilter(request, response);
    }
}
