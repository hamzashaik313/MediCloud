package com.medicloud.medicalrecords.admin;

import com.medicloud.medicalrecords.activity.ActivityLog;
import com.medicloud.medicalrecords.activity.ActivityLogQueryService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/activity-logs")
public class AdminActivityLogController {

    private final ActivityLogQueryService service;

    public AdminActivityLogController(ActivityLogQueryService service) {
        this.service = service;
    }

    @GetMapping
    public Page<ActivityLog> getLogs(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String username,
            @RequestParam(required = false) String action,
            @RequestParam(required = false) String role
    ) {
        Pageable pageable = PageRequest.of(
                page,
                size,
                org.springframework.data.domain.Sort.by("timestamp").descending()
        );


        if (username != null) {
            return service.getByUsername(username, pageable);
        }
        if (action != null) {
            return service.getByAction(action, pageable);
        }
        if (role != null) {
            return service.getByRole(role, pageable);
        }

        return service.getAll(pageable);
    }
}
