package com.tp.backend.dto;

import com.tp.backend.model.UserType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Locale;

@Data
@NoArgsConstructor
public class SignupRequestDto {
    private String email;
    private String name;
    private String password;
    private UserType userType;

    public SignupRequestDto(String email, String username, String password){
        this.email = email;
        this.name = username;
        this.password = password;
        this.userType = UserType.User;
    }

    public SignupRequestDto(String email, String username, String password, String userType){
        this.email = email;
        this.name = username;
        this.password = password;
        this.userType = UserType.valueOf(userType.toLowerCase());
    }

}
