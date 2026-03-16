package com.demo.dto;

import com.demo.domain.UserRole;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthResponseDTO {

    private Long id;
    private String fullName;
    private String email;
    private UserRole role;
    private String token;

}