package com.just3dev.sosyalizbiz.chatbot;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.just3dev.sosyalizbiz.activity.ActivityService;
import com.just3dev.sosyalizbiz.user.User;
import com.just3dev.sosyalizbiz.user.UserRepository;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatModel;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/chatbot")
public class ChatController {

    private final ChatClient chatClient;
    private final ActivityService activityService;
    private final UserRepository userRepository;
    private final ObjectMapper objectMapper;

    public ChatController(ChatModel chatModel, ActivityService activityService, UserRepository userRepository) {
        this.activityService = activityService;
        this.userRepository = userRepository;
        this.objectMapper = new ObjectMapper();

        this.chatClient = ChatClient.builder(chatModel)
                .build();
    }

    @PostMapping(path = "/chat", consumes = "text/plain", produces = "text/plain")
    public String chat(@RequestBody String message) {
        ChatClient.ChatClientRequestSpec req = chatClient.prompt();
        req.tools(new ChatBotTools(activityService, userRepository));
        req.system("Sosyaliz Biz adli bir platformun yapay zeka ajanisin. Gerekirse verilen toollari kullan.");
        return req.user(message).call().content();
    }

    @GetMapping("/rate-issue")
    public int rateIssue(String reportDescription){
        ChatClient.ChatClientRequestSpec req = chatClient.prompt();
        req.system("Sosyaliz Biz adli bir platformun yapay zeka ajanisin. Kullanici raporlarini 0-10 arasi derecelendir. 10 en kotu, 0 en iyi. Sadece sayisal deger dondur.");
        return Integer.parseInt(req.user(reportDescription).call().content());
    }

    public List<User> nearbyUsers(List<User> users, String location) throws JsonProcessingException {
        ChatClient.ChatClientRequestSpec req = chatClient.prompt();
        req.system("Verilen kullanici listesindeki kullanicilarin konumlariyla parametre olarak verilen konumun yakinligini belirleyen bir yapay zeka ajanisin. Yakin olan kullanicilari yalnizca JSON array olarak dondur. Ornek: [{\"id\":\"...\",\"name\":\"...\",\"email\":\"...\"}]");
        String json = req.user("Userlar: " + users + ", Konum 2: " + location).call().content();
        return objectMapper.readValue(json, new TypeReference<>() {});
    }
}
