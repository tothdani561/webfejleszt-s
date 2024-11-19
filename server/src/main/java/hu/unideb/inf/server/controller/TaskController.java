package hu.unideb.inf.server.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @PostMapping("/create")
    void createOne() {
        // TODO
    };

    @GetMapping("/{id}")
    void findOne(@PathVariable Long id) {
        // TODO
    };

    @PutMapping("/update/{id}")
    void updateOne(@PathVariable Long id) {
        // TODO
    };

    @GetMapping("?status={status}")
    void findByStatus(@PathVariable String status) {
        // TODO
    };

    @DeleteMapping("/{id}")
    void deleteOne(@PathVariable Long id) {
        // TODO
    };

}
