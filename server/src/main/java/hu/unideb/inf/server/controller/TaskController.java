package hu.unideb.inf.server.controller;

import hu.unideb.inf.server.model.Task;
import hu.unideb.inf.server.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping("/create/{userId}")
    public ResponseEntity<String> createTaskForUser(@PathVariable Long userId, @RequestBody Task task) {
        try {
            taskService.createTaskForUser(userId, task);
            return ResponseEntity.ok("Task created and assigned to user successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


}
