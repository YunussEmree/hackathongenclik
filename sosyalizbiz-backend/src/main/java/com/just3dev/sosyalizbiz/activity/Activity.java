package com.just3dev.sosyalizbiz.activity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.util.Date;
import java.util.UUID;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "id")
    private UUID id;

    @Column(name = "title")
    private String title;

    @Column(name = "description")
    private String description;

    //@ManyToMany
    //@Column(name = "activity_users")
    //private List<ActivityUser> users;

    //@Column(name = "activity_creator")
    //ActivityUser creater;

    @Column(name = "location")
    private String location;

    @Column(name = "max_attendees")
    private int maxAttendees;

    @Column(name = "current_attendees")
    private int currentAttendees;

    private Date activityDate;

    @CreationTimestamp
    @Column(name = "created_at")
    private Date createdDate;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedDate;





}
