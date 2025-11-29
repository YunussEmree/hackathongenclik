package com.just3dev.sosyalizbiz.user;

import com.just3dev.sosyalizbiz.activity.Activity;
import com.just3dev.sosyalizbiz.activity.ActivityRepository;
import com.just3dev.sosyalizbiz.activity.IActivityService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserRepository userRepository;
    private final ActivityRepository activityRepository;

    public UserController(UserRepository userRepository, ActivityRepository activityRepository) {
        this.userRepository = userRepository;
        this.activityRepository = activityRepository;
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

    @GetMapping("/past-activity")
    public ResponseEntity<List<Activity>> getPastActivities(@AuthenticationPrincipal OAuth2User principal) {
        User user = userRepository.findById(principal.getAttribute("sub")).orElseThrow(() -> new RuntimeException("User not found"));
        List<Activity> pastActivities = activityRepository.getByActivityDateAfterAndUsersContains(Date.from(new Date().toInstant()), user);
        return ResponseEntity.ok(pastActivities);
    }

    @GetMapping("/upcoming-activity")
    public ResponseEntity<List<Activity>> getUpcomingActivities(@AuthenticationPrincipal OAuth2User principal) {
        User user = userRepository.findById(principal.getAttribute("sub")).orElseThrow(() -> new RuntimeException("User not found"));
        List<Activity> pastActivities = activityRepository.getByActivityDateBeforeAndUsersContains(Date.from(new Date().toInstant()), user);
        return ResponseEntity.ok(pastActivities);
    }

}
