package com.just3dev.sosyalizbiz.chatbot;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatbot")
public class ChatController {

    private final ChatBotService chatBotService;

    public ChatController(ChatBotService chatBotService) {
        this.chatBotService = chatBotService;
    }

    @PostMapping(path = "/chat", consumes = "text/plain", produces = "text/plain")
    public String chat(@RequestBody String message) {
        return chatBotService.chat(message);
    }

    @GetMapping("/rate-issue")
    public int rateIssue(@RequestParam String reportDescription){
        return chatBotService.rateIssue(reportDescription);
    }

}
