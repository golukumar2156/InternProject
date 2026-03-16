package com.demo.serviceimpl;

import java.util.List;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.demo.configrations.JwtProvider;
import com.demo.dto.AuthResponseDTO;
import com.demo.dto.LoginRequestDTO;
import com.demo.dto.RegisterRequestDTO;
import com.demo.exception.Exceptionhandle;
import com.demo.mapper.UserMapper;
import com.demo.model.User;
import com.demo.repo.UserRepository;
import com.demo.service.AuthService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtProvider jwtProvider;
    private final UserMapper userMapper;

    @Override
    public AuthResponseDTO register(RegisterRequestDTO req) throws Exceptionhandle {

        // check email exists
        if (userRepository.findByEmail(req.getEmail()).isPresent()) {
            throw new Exceptionhandle("Email already registered");
        }

       
        User user = userMapper.toEntity(req);

      
        user.setPassword(passwordEncoder.encode(req.getPassword()));


        User savedUser = userRepository.save(user);

        // create authentication
        Authentication authentication =
                new UsernamePasswordAuthenticationToken(
                        savedUser.getEmail(),
                        null,
                        List.of(new SimpleGrantedAuthority("" + savedUser.getRole())) 
                );
         

        SecurityContextHolder.getContext().setAuthentication(authentication);

       
        String token = jwtProvider.generateToken(authentication);

        AuthResponseDTO response = userMapper.toDTO(savedUser);
        response.setToken(token);

        return response;
    }

    @Override
    public AuthResponseDTO login(LoginRequestDTO req) {

        User user = userRepository.findByEmail(req.getEmail())
                .orElseThrow(() -> new Exceptionhandle("User not found"));

        if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
            throw new Exceptionhandle("Invalid password");
        }

        Authentication authentication =
                new UsernamePasswordAuthenticationToken(
                        user.getEmail(),
                        null,
                        List.of(new SimpleGrantedAuthority("" + user.getRole()))
                );


        SecurityContextHolder.getContext().setAuthentication(authentication);

        String token = jwtProvider.generateToken(authentication);

        AuthResponseDTO response = userMapper.toDTO(user);
        response.setToken(token);

        return response;
    }

}