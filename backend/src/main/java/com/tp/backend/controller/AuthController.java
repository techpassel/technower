package com.tp.backend.controller;

import com.tp.backend.dto.LoginRequestDto;
import com.tp.backend.dto.LoginResponseDto;
import com.tp.backend.dto.SignupRequestDto;
import com.tp.backend.exception.BackendException;
import com.tp.backend.model.UserType;
import com.tp.backend.service.AuthService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@AllArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody SignupRequestDto signupRequestDto){
        try {
            if(signupRequestDto.getUserType() == null){
                signupRequestDto.setUserType(UserType.User);
            }
            authService.signup(signupRequestDto);
            return new ResponseEntity<>("User registered successfully.", HttpStatus.OK);
        } catch (BackendException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        } catch (Exception e){
            return new ResponseEntity<>("Some error occurred.Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/account-verification/{token}")
    public ResponseEntity<String> verifyAccount(@PathVariable String token){
        try {
            authService.verifyAccount(token);
            return new ResponseEntity<>("Account activated successfully.", HttpStatus.OK);
        } catch (BackendException e){
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        } catch (Exception e){
            return new ResponseEntity<>("Some error occurred.Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequestDto loginRequestDto) {
        try {
            LoginResponseDto resp = authService.login(loginRequestDto);
            return ResponseEntity.ok(resp.toString());
        } catch (BadCredentialsException e) {
            return new ResponseEntity<>("Incorrect email or password.", HttpStatus.UNAUTHORIZED);
        } catch (BackendException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        } catch (DisabledException e){
            return new ResponseEntity<>("User is disabled now.Please check if email is verified.", HttpStatus.UNAUTHORIZED);
    }catch (Exception e){
            e.printStackTrace();
            return new ResponseEntity<>("Some error occurred.Please try again.", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



}
