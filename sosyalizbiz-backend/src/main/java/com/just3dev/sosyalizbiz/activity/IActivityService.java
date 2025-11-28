package com.just3dev.sosyalizbiz.activity;

import java.util.List;

public interface IActivityService {

    Activity getActivity(Long id);
    List<Activity> getAllActivities();
    Activity createActivity(Activity activity);
    Activity updateActivity(Long id, Activity activity);
    void deleteActivity(Long id);

}
