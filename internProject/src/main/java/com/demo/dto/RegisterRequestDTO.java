package com.demo.dto;

import com.demo.domain.UserRole;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterRequestDTO {

    private String fullName;
    private String email;
    private String password;
    private UserRole role;

}
