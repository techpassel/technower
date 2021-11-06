package com.tp.backend.dto;

import com.tp.backend.model.UserType;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class LoginResponseDto {
    private String name;
    private String email;
    private String type;
    private String token;

    @Override
    public String toString() {
        return "LoginResponse{" +
                "name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", type=" + type +
                ", token='" + token + '\'' +
                '}';
    }
}
