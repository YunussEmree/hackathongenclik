package com.just3dev.sosyalizbiz.user;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }


    @GetMapping("/detail")
    public ResponseEntity<OAuth2User> getUserDetail(@AuthenticationPrincipal OAuth2User principal) {
        return ResponseEntity.ok(principal);
    }

    @GetMapping("/current-user")
    public ResponseEntity<UserDTO> currentUser(@AuthenticationPrincipal OAuth2User principal) {
        if(userRepository.findById(principal.getAttribute("sub")).isEmpty()){
            User newUser = new User(principal.getAttribute("sub"),principal.getAttribute("name"), principal.getAttribute("email"));
            userRepository.save(newUser);
        }
        User user = userRepository.findById(principal.getAttribute("sub")).get();
        UserDTO userDTO = user.toDTO();

        return ResponseEntity.ok(userDTO);
    }

    //test endpoint, delete before prod
    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users);
    }

}
