package com.just3dev.sosyalizbiz.activity;

import com.just3dev.sosyalizbiz.mail.IMailService;
import com.just3dev.sosyalizbiz.user.User;
import com.just3dev.sosyalizbiz.user.UserRepository;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ActivityService implements IActivityService {

    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;
    private final IMailService mailService;

    public ActivityService(ActivityRepository activityRepository, UserRepository userRepository, IMailService mailService) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
        this.mailService = mailService;
    }

    @Override
    public Activity getActivity(UUID id) {
        return activityRepository.findById(id).orElse(null);
    }

    @Override
    public List<Activity> getAllActivities(String sortBy) {
        Sort sort = Sort.unsorted();
        if (sortBy != null) {
            switch (sortBy) {
                case "newestActivity":
                    sort = Sort.by(Sort.Direction.DESC, "createdDate");
                    break;
                case "oldestActivity":
                    sort = Sort.by(Sort.Direction.ASC, "createdDate");
                    break;
                case "closestActivity":
                    sort = Sort.by(Sort.Direction.ASC, "activityDate");
                    break;
                case "furthestActivity":
                    sort = Sort.by(Sort.Direction.DESC, "activityDate");
                    break;
                default:
                    break;
            }
        }
        return activityRepository.findAll(sort);
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
    public Activity attendActivity(UUID activityId, String userId) {
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new ActivityNotFoundException("Activity with id " + activityId + " not found."));

        if(activity.getCurrentAttendees() >= activity.getMaxAttendees()) {
            throw new ActivityAttendeeFullException("Activity with id " + activityId + " is already full.");
        }

        activity.setCurrentAttendees(activity.getCurrentAttendees() + 1);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User with id " + userId + " not found."));

        activity.addAttendee( user );
        mailService.sendReminderMail(user.getEmail(), activity.getTitle() ,activity.getActivityDate());

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
