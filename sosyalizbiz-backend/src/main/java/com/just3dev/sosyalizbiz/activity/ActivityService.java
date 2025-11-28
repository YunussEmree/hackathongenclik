package com.just3dev.sosyalizbiz.activity;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ActivityService implements IActivityService {

    private final ActivityRepository activityRepository;

    public ActivityService(ActivityRepository activityRepository) {
        this.activityRepository = activityRepository;
    }

    @Override
    public Activity getActivity(Long id) {
        return activityRepository.findById(id).orElse(null);
    }

    @Override
    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    @Override
    public Activity createActivity(Activity activity) {
        if(activityRepository.findById(activity.getId()).isPresent()) {
            throw new ActivityAlreadyExistsException("Activity with id " + activity.getId() + " already exists.");
        } else {
            activityRepository.save(activity);
        }
        return activity;
    }

    @Override
    public Activity updateActivity(Long id, Activity activity) {
        activity.setId(id);
        activityRepository.save(activity);
        return activity;
    }

    @Override
    public void deleteActivity(Long id) {
        if (activityRepository.findById(id).isPresent()) {
            activityRepository.deleteById(id);
        } else {
            throw new ActivityNotFoundException("Activity with id " + id + " does not exist.");
        }
    }

}
