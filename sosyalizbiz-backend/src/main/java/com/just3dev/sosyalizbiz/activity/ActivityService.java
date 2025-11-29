package com.just3dev.sosyalizbiz.activity;

import com.just3dev.sosyalizbiz.chatbot.ChatBotService;
import com.just3dev.sosyalizbiz.mail.IMailService;
import com.just3dev.sosyalizbiz.user.User;
import com.just3dev.sosyalizbiz.user.UserNotFoundException;
import com.just3dev.sosyalizbiz.user.UserRepository;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class ActivityService implements IActivityService {

    private final ActivityRepository activityRepository;
    private final UserRepository userRepository;
    private final IMailService mailService;
    private final ChatBotService chatBotService;

    public ActivityService(ActivityRepository activityRepository, UserRepository userRepository, IMailService mailService, @Lazy ChatBotService chatBotService) {
        this.activityRepository = activityRepository;
        this.userRepository = userRepository;
        this.mailService = mailService;
        this.chatBotService = chatBotService;
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

        List<User> nearbyUsers;

        try {
            nearbyUsers = chatBotService.nearbyUsers(userRepository.findAll(), activity.getLocation());
        } catch (Exception e) {
            throw new RuntimeException("Failed to create chat for the activity: " + e.getMessage());
        }
        for (User user : nearbyUsers) {
            mailService.sendNewActivityMail(user.getEmail(), activity.getTitle(), activity.getActivityDate());
        }

        return activity;
    }

    @Override
    public Activity attendActivity(UUID activityId, String userId) {
        Activity activity = activityRepository.findById(activityId)
                .orElseThrow(() -> new ActivityNotFoundException("Activity with id " + activityId + " not found."));

        if(activity.getCurrentAttendees() >= activity.getMaxAttendees()) {
            throw new ActivityAttendeeFullException("Activity with id " + activityId + " is already full.");
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with id " + userId + " not found."));

        if(activity.getUsers().contains(user)) {
            throw new RuntimeException("User with id " + userId + " is already attending the activity with id " +  activityId + ".");
        }
        else {
            activity.setCurrentAttendees(activity.getCurrentAttendees() + 1);
            activity.addAttendee( user );
            mailService.sendReminderMail(user.getEmail(), activity.getTitle() ,activity.getActivityDate());

            userRepository.save(user);
            activityRepository.save(activity);
        }

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

    @Override
    public List<Activity> getUserActivities(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User with id " + userId + " not found."));
        return activityRepository.findAllByUsersContainsOrderByActivityDateDesc(user);
    }

}
