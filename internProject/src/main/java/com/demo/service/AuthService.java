package com.demo.service;

import com.demo.dto.AuthResponseDTO;
import com.demo.dto.LoginRequestDTO;
import com.demo.dto.RegisterRequestDTO;

public interface AuthService {

    AuthResponseDTO register(RegisterRequestDTO request);

    AuthResponseDTO login(LoginRequestDTO request);

}