package com.just3dev.sosyalizbiz.activity;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/activities")
public class ActivityController {

    private final ActivityService activityService;

    public ActivityController(ActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping
    public ResponseEntity<Activity> getActivity(Long id) {
        return ResponseEntity.ok(activityService.getActivity(id));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Activity>> getAllActivities() {
        return ResponseEntity.ok(activityService.getAllActivities());
    }

    @PostMapping
    public ResponseEntity<Activity> createActivity(Activity activity) {
        activityService.createActivity(activity);
        return ResponseEntity.ok(activity);
    }

    @PutMapping
    public ResponseEntity<Activity> updateActivity(Long id, Activity activity) {
        activityService.updateActivity(id, activity);
        return ResponseEntity.ok(activity);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteActivity(Long id) {
        activityService.deleteActivity(id);
        return ResponseEntity.ok().build();
    }




}
