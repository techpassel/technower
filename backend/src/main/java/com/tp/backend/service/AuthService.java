package com.tp.backend.service;

import com.tp.backend.dto.LoginRequestDto;
import com.tp.backend.dto.LoginResponseDto;
import com.tp.backend.dto.SignupRequestDto;
import com.tp.backend.exception.BackendException;
import com.tp.backend.model.NotificationEmail;
import com.tp.backend.model.User;
import com.tp.backend.model.UserType;
import com.tp.backend.model.VerificationToken;
import com.tp.backend.repository.UserRepository;
import com.tp.backend.repository.VerificationTokenRepository;
import com.tp.backend.security.JwtProvider;
import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

@Service
@AllArgsConstructor
public class AuthService {
    /*
     @Autowired
     private PasswordEncoder passwordEncoder;
     */
    // Above code is also fine but we should try to use 'Constructor based dependency injection' over
    // 'Field based dependency injection' wherever possible. Hence replaced above code with below one.
    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final VerificationTokenRepository verificationTokenRepository;
    private final MailContentBuilder mailContentBuilder;
    private final MailService mailService;
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final JwtProvider jwtProvider;

    @Transactional
    public void signup(SignupRequestDto signupRequestDto){
        Optional<User> emailUser = userRepository.findByEmail(signupRequestDto.getEmail());
        if(emailUser.isPresent()){
            throw new BackendException("Email already exist");
        }
        Optional<User> phoneUser = userRepository.findByPhone(signupRequestDto.getPhone());
        if(phoneUser.isPresent()){
            throw new BackendException("Phone number already exist");
        }
        String email = signupRequestDto.getEmail();
        //Functionality to generate a random username
        String username = email.split("@")[0].replaceAll("[^a-zA-Z0-9]", "");
        for(int i =0; i<7; i++){
            if(isUsernameAvailable(username)){
                break;
            }
            int start_val = i ==0?1:0;
            int end_val = 9;
            username += ThreadLocalRandom.current().nextInt(start_val, end_val);
        }
        User user = new User();
        user.setName(signupRequestDto.getName());
        user.setPassword(passwordEncoder.encode(signupRequestDto.getPassword()));
        user.setEmail(email);
        user.setPhone(signupRequestDto.getPhone());
        user.setUserType(UserType.User);
        user.setEnabled(false);
        user.setUsername(username);
        userRepository.save(user);

        String token = generateVerificationToken(user);
        String url = "http://localhost:8080/api/auth/account-verification/"+token;
        String btnName = "Activate";
        String text = "Thanks for signing up to Backend. Please click on the button below to activate your account.";
        String msg = mailContentBuilder.build(text, url, btnName);

        String successResponse = "Activation email sent!";
        String subject = "Please Activate your account.";
        String recipient = signupRequestDto.getEmail();
        mailService.sendMail(new NotificationEmail(subject, recipient, msg, successResponse));
    }

    private boolean isUsernameAvailable(String username){
        Optional<User> usernameUser = userRepository.findByUsername(username);
        return usernameUser.isPresent() ? false:true;
    }

    private String generateVerificationToken(User user){
        String token = UUID.randomUUID().toString();
        VerificationToken verificationToken = new VerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);
        verificationToken.setCreatedAt(LocalDateTime.now());
        verificationTokenRepository.save(verificationToken);
        return token;
    }

    @Transactional
    public void verifyAccount(String token){
        Optional<VerificationToken> verificationToken = verificationTokenRepository.findByToken(token);
        verificationToken.orElseThrow(() -> new BackendException("Invalid token"));
        fetchUserAndEnable(verificationToken.get());
    }

    public void fetchUserAndEnable(VerificationToken verificationToken){
        Optional<User> tokenUser = userRepository.findById(verificationToken.getUser().getId());
        tokenUser.orElseThrow(() -> new BackendException("User not found. Please signup again."));
        User user = tokenUser.get();
        user.setEnabled(true);
        userRepository.save(user);
        verificationTokenRepository.deleteById(verificationToken.getId());
    }

    public LoginResponseDto login(LoginRequestDto loginRequestDto){
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(loginRequestDto.getEmail(),
                loginRequestDto.getPassword()));
        final UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequestDto.getEmail());
        final String jwt = jwtProvider.generateToken(userDetails);
        Optional<User> user = userRepository.findByEmail(loginRequestDto.getEmail());
        user.orElseThrow(() -> new BackendException("User not found."));
        User u = user.get();

        return new LoginResponseDto(u.getName(), u.getEmail(), u.getUserType().getType(), jwt);
    }

    @Transactional(readOnly = true)
    public User getCurrentUser() {
        String email = null;
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (!(authentication instanceof AnonymousAuthenticationToken)) {
            email = authentication.getName();
        }
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User name not found - " + authentication.getName()));
    }
}
