package com.just3dev.sosyalizbiz.chatbot;

import com.just3dev.sosyalizbiz.activity.Activity;
import com.just3dev.sosyalizbiz.activity.ActivityService;
import com.just3dev.sosyalizbiz.user.UserRepository;
import org.springframework.ai.tool.annotation.Tool;

import java.util.List;

public class ChatBotTools {

    private final ActivityService activityService;
    private final UserRepository userRepository;

    public ChatBotTools(ActivityService activityService, UserRepository userRepository) {
        this.activityService = activityService;
        this.userRepository = userRepository;
    }

    @Tool(description = "Etkinliklerini en yakın tarihe göre sıralayıp getirir. ")
    List<Activity> getNearActivities() {
        return activityService.getAllActivities("newestActivity");
    }

    /*
    //TODO: Bu tool tam olarak çalışmıyor, düzeltilmesi lazım.
    @Tool(description = "Şu an aktif olan kullanıcı bilgilerini detaylı şekilde getirir. ")
    public UserDTO getUserInfo(@AuthenticationPrincipal OAuth2User principal) {

        User user = userRepository.findById(principal.getAttribute("sub")).get();
        UserDTO userDTO = user.toDTO();

        return userDTO;
    }
     */

}
