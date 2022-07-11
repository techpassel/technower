package com.tp.backend.dto;

import com.tp.backend.model.UserType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Locale;

@Data
@NoArgsConstructor
public class SignupRequestDto {
    private String name;
    private String email;
    private String phone;
    private String password;
    private UserType userType;

    public SignupRequestDto(String name, String email, String phone, String password){
        this.email = email;
        this.name = name;
        this.phone = phone;
        this.password = password;
        this.userType = UserType.User;
    }

    public SignupRequestDto(String name, String email, String phone, String password, String userType){
        this.email = email;
        this.name = name;
        this.password = password;
        this.userType = UserType.valueOf(userType.toLowerCase());
    }

}
