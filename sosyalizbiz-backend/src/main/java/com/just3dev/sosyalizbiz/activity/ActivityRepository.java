package com.just3dev.sosyalizbiz.activity;

import com.just3dev.sosyalizbiz.user.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, UUID> {

    List<Activity> getByActivityDateBeforeAndUsersContains(Date dateTime, User user);
    List<Activity> getByActivityDateAfterAndUsersContains(Date dateTime, User user);

}
