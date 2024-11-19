package hu.unideb.inf.server.service.impl;

import hu.unideb.inf.server.model.Task;
import hu.unideb.inf.server.model.User;
import hu.unideb.inf.server.repository.TaskRepository;
import hu.unideb.inf.server.repository.UserRepository;
import hu.unideb.inf.server.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    private TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Override
    public void createOne(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("User already exists with this email: " + user.getEmail());
        }

        userRepository.save(user);
    }

    @Override
    public Optional<User> findOne(Long id) {
        return userRepository.findById(id);
    }

    @Override
    public void updateOne(User updatedUser) {
        User existingUser = userRepository.findById(updatedUser.getId())
                .orElseThrow(() -> new IllegalArgumentException("User with id " + updatedUser.getId() + " does not exist."));

        existingUser.setUsername(updatedUser.getUsername());
        existingUser.setPassword(updatedUser.getPassword());
        existingUser.setEmail(updatedUser.getEmail());

        if (updatedUser.getTasks() != null) {
            existingUser.getTasks().clear();

            for (Task task : updatedUser.getTasks()) {
                task.setUser(existingUser);
                existingUser.getTasks().add(task);
            }
        }

        // Mentés
        userRepository.save(existingUser);
    }

    @Override
    public void deleteOne(Long id) {
        Optional<User> user = userRepository.findById(id);
        if (user.isEmpty()){
            throw new IllegalArgumentException("User with id " + id + " does not exist.");
        }
        userRepository.deleteById(id);
    }


    @Override
    public List<Task> getTasksByUserId(Long userId) {
        return taskRepository.findByUserId(userId);
    }
}
