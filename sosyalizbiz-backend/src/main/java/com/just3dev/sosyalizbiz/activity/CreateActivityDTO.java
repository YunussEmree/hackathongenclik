package com.just3dev.sosyalizbiz.activity;

import lombok.Data;

import java.util.Date;

@Data
public class CreateActivityDTO {

    private String title;

    private String description;

    //private List<ActivityUser> users;

    //ActivityUser creater;

    private String location;

    private int maxAttendees;

    private int currentAttendees;

    private Date activityDate;

}
