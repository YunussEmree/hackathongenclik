package com.just3dev.sosyalizbiz.chatbot;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chatbot")
public class ChatController {

    private final ChatBotService chatBotService;

    public ChatController(ChatBotService chatBotService) {
        this.chatBotService = chatBotService;
    }

    @PostMapping(path = "/chat", consumes = "application/json", produces = "application/json")
    public ChatResponseDTO chat(@RequestBody String message) {
        ChatResponseDTO chatResponseDTO = new ChatResponseDTO();
        chatResponseDTO.setMessage(chatBotService.chat(message));
        return chatResponseDTO;
    }

    @GetMapping("/rate-issue")
    public int rateIssue(@RequestParam String reportDescription){
        return chatBotService.rateIssue(reportDescription);
    }

}
