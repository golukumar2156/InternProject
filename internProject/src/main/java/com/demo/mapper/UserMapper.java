package com.demo.mapper;

import org.mapstruct.Mapper;

import com.demo.dto.AuthResponseDTO;
import com.demo.dto.RegisterRequestDTO;
import com.demo.model.User;

@Mapper(componentModel = "spring")
public interface UserMapper {

    User toEntity(RegisterRequestDTO dto);

    AuthResponseDTO toDTO(User user);

}