package hu.unideb.inf.server.controller;

import hu.unideb.inf.server.model.Task;
import hu.unideb.inf.server.model.User;
import hu.unideb.inf.server.service.UserService;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/create")
    void createOne(@NonNull @RequestBody User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userService.createOne(user);
    };

    @GetMapping("/{id}")
    public ResponseEntity<User> findOne(@PathVariable Long id) {
        return userService.findOne(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    };

    @GetMapping("/{userId}/tasks")
    public ResponseEntity<List<Task>> getUserTasks(@PathVariable Long userId) {
        List<Task> tasks = userService.getTasksByUserId(userId);
        return ResponseEntity.ok(tasks);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateOne(@NonNull @RequestBody User updated) {
        try {
            userService.updateOne(updated);
            return ResponseEntity.ok("User updated successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    };

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteOne(@PathVariable Long id) {
        try {
            userService.deleteOne(id);
            return ResponseEntity.ok("User deleted successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    };

}
