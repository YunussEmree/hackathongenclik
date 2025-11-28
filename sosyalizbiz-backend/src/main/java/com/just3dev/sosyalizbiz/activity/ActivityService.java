package com.just3dev.sosyalizbiz.activity;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ActivityService implements IActivityService {

    private final ActivityRepository activityRepository;

    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @Override
    public Activity getActivity(UUID id) {
        return activityRepository.findById(id).orElse(null);
    }

    @Override
    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    @Override
    public Activity createActivity(CreateActivityDTO request) {

        Activity activity = new Activity();
        activity.setTitle(request.getTitle());
        activity.setDescription(request.getDescription());
        activity.setLocation(request.getLocation());
        activity.setMaxAttendees(request.getMaxAttendees());
        activity.setCurrentAttendees(request.getCurrentAttendees());
        activity.setActivityDate(request.getActivityDate());

        activityRepository.save(activity);

        return activity;
    }

    @Override
    public Activity updateActivity(UUID id, Activity activity) {
        activity.setId(id);
        activityRepository.save(activity);
        return activity;
    }

    @Override
    public void deleteActivity(UUID id) {
        if (activityRepository.findById(id).isPresent()) {
            activityRepository.deleteById(id);
        } else {
            throw new ActivityNotFoundException("Activity with id " + id + " does not exist.");
        }
    }

}
