package com.just3dev.sosyalizbiz.user;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.just3dev.sosyalizbiz.activity.Activity;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {

    @Id
    @Column(name = "id")
    private String id;
    private String name;
    private String email;

    @ManyToMany(cascade = {CascadeType.DETACH, CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH})
    @JoinTable(
            name = "User_Activity",
            joinColumns = { @JoinColumn(name = "user_id") },
            inverseJoinColumns = { @JoinColumn(name = "activity_id") }
    )
    @JsonIgnore
    private List<Activity> activity;

    public User(String id, String name, String email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }


    public UserDTO toDTO() {
        UserDTO dto = new UserDTO();
        dto.setId(this.id);
        dto.setName(this.name);
        dto.setEmail(this.email);
        return dto;
    }


}
