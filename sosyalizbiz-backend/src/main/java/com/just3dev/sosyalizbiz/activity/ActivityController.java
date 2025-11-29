package com.just3dev.sosyalizbiz.activity;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    private final IActivityService activityService;

    public ActivityController(IActivityService activityService) {
        this.activityService = activityService;
    }

    @GetMapping
    public ResponseEntity<Activity> getActivity(@RequestParam UUID id) {
        try {
            return ResponseEntity.ok(activityService.getActivity(id));
        } catch (ActivityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/all")
    public ResponseEntity<List<Activity>> getAllActivities(@RequestParam(required = false) String sortBy) {
        try {
            return ResponseEntity.ok(activityService.getAllActivities(sortBy));
        } catch (ActivityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/attend")
    public ResponseEntity<Activity> attendActivity(@RequestParam String activityId, @RequestParam String userId) {
        try {
            UUID activityUUID = UUID.fromString(activityId);

            Activity activity = activityService.attendActivity(activityUUID, userId);
            return ResponseEntity.ok(activity);
        } catch (ActivityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        } catch (ActivityAttendeeFullException ex) {
            return ResponseEntity.status(409).build(); // Conflict
        }
    }

    @PostMapping
    public ResponseEntity<Activity> createActivity(@RequestBody CreateActivityDTO request) {
        try {
            Activity activity = activityService.createActivity(request);
            return ResponseEntity.ok(activity);
        } catch (ActivityAlreadyExistsException e) {
            return ResponseEntity.status(409).build(); // Conflict
        }
    }

    @PutMapping
    public ResponseEntity<Activity> updateActivity(@RequestParam UUID id, @RequestBody Activity activity) {
        activityService.updateActivity(id, activity);
        return ResponseEntity.ok(activity);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteActivity(@RequestParam UUID id) {
        try {
            activityService.deleteActivity(id);
            return ResponseEntity.ok().build();
        } catch (ActivityNotFoundException ex) {
            return ResponseEntity.notFound().build();
        }
    }




}
