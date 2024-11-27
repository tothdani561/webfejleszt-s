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

    @PostMapping("/create/{username}")
    public ResponseEntity<String> createTaskForUser(@PathVariable String username, @RequestBody Task task) {
        try {
            taskService.createTaskForUser(username, task);
            return ResponseEntity.ok("Task created and assigned to user successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/{taskId}")
    public ResponseEntity<String> updateTask(
            @PathVariable Long taskId,
            @RequestBody Task updatedTask) {
        try {
            taskService.updateTask(taskId, updatedTask);
            return ResponseEntity.ok("Task updated successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }


    @DeleteMapping("/{taskId}")
    public ResponseEntity<String> deleteTask(@PathVariable Long taskId) {
        try {
            taskService.deleteTask(taskId);
            return ResponseEntity.ok("Task deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}
