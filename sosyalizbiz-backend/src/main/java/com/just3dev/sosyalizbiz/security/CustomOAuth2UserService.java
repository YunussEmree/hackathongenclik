package com.just3dev.sosyalizbiz.security;

import com.just3dev.sosyalizbiz.user.User;
import com.just3dev.sosyalizbiz.user.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oauth2User = super.loadUser(userRequest);

        String id = oauth2User.getAttribute("sub");
        String name = oauth2User.getAttribute("name");
        String email = oauth2User.getAttribute("email");

        User user = new User();
        user.setId(id);
        user.setName(name);
        user.setEmail(email);

        userRepository.save(user);

        return oauth2User;
    }
}
