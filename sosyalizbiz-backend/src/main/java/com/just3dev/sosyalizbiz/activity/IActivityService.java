package com.just3dev.sosyalizbiz.activity;

import java.util.List;
import java.util.UUID;

public interface IActivityService {

    Activity getActivity(UUID id);
    List<Activity> getAllActivities(String sortBy);
    Activity createActivity(CreateActivityDTO request);
    Activity updateActivity(UUID id, Activity activity);
    Activity attendActivity(UUID activityId, String userId);
    void deleteActivity(UUID id);

}
