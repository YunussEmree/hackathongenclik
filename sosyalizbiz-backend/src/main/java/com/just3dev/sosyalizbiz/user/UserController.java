package com.just3dev.sosyalizbiz.user;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {

        if(userRepository.findById(principal.getAttribute("sub")).isPresent() == false) {
            User newUser = new User();
            newUser.setId(principal.getAttribute("sub"));
            newUser.setName(principal.getAttribute("name"));
            userRepository.save(newUser);
        }

        return Collections.singletonMap("name", principal.getAttribute("name"));
    }
}
