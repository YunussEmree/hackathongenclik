package com.just3dev.sosyalizbiz.chatbot;

import com.just3dev.sosyalizbiz.activity.ActivityService;
import com.just3dev.sosyalizbiz.user.UserRepository;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/chatbot")
public class ChatController {

    private final ChatClient chatClient;

    private final ActivityService activityService;
    private final UserRepository userRepository;

    public ChatController(ChatModel chatModel, ActivityService activityService, UserRepository userRepository) {
        this.activityService = activityService;
        this.userRepository = userRepository;

        this.chatClient = ChatClient.builder(chatModel)
                .build();
    }

    @PostMapping(path = "/chat", consumes = "text/plain", produces = "text/plain")
    public String chat(@RequestBody String message) {
        ChatClient.ChatClientRequestSpec req = chatClient.prompt();
        req.tools(new ChatBotTools(activityService, userRepository));
        req.system("Sohbetiz biz adlı bir platformun yapay zeka ajanısın" +
                "Kişi tool kullanmanı isterse sana verilen toolları kullan.");
        return req.user(message).call().content();
    }
}