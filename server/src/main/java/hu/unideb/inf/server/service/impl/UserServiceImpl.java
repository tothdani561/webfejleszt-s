package hu.unideb.inf.server.service.impl;

import hu.unideb.inf.server.model.Task;
import hu.unideb.inf.server.model.User;
import hu.unideb.inf.server.repository.TaskRepository;
import hu.unideb.inf.server.repository.UserRepository;
import hu.unideb.inf.server.service.UserService;
import org.springframework.security.crypto.password.PasswordEncoder;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService {

    @Autowired
    private TaskRepository taskRepository;

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void register(User user) {
        if (userRepository.existsByUsername(user.getUsername())) {
            throw new IllegalArgumentException("Username is already taken.");
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email is already registered.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
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

        // Frissítjük az username, email mezőket
        if (updatedUser.getUsername() != null) {
            existingUser.setUsername(updatedUser.getUsername());
        }
        if (updatedUser.getEmail() != null) {
            existingUser.setEmail(updatedUser.getEmail());
        }

        // A jelszó frissítése titkosítással
        if (updatedUser.getPassword() != null) {
            String encodedPassword = passwordEncoder.encode(updatedUser.getPassword());
            existingUser.setPassword(encodedPassword);
        }

        // Tasks kezelése
        if (updatedUser.getTasks() != null) {
            for (Task updatedTask : updatedUser.getTasks()) {
                // Ellenőrizzük, hogy a Task már létezik-e
                Optional<Task> existingTaskOpt = existingUser.getTasks().stream()
                        .filter(task -> task.getId().equals(updatedTask.getId()))
                        .findFirst();

                if (existingTaskOpt.isPresent()) {
                    // Ha létezik, frissítjük az adatokat
                    Task existingTask = existingTaskOpt.get();
                    existingTask.setName(updatedTask.getName());
                    existingTask.setDescription(updatedTask.getDescription());
                    existingTask.setPriority(updatedTask.getPriority());
                    existingTask.setUpdatedAt(updatedTask.getUpdatedAt());
                } else {
                    // Ha nem létezik, hozzáadjuk az új Task-ot
                    updatedTask.setUser(existingUser); // Beállítjuk az új Task felhasználóját
                    existingUser.getTasks().add(updatedTask);
                }
            }
        }

        // Mentés az adatbázisba
        userRepository.save(existingUser);
    }




    public boolean authenticate(String username, String password) {
        User user = loadUserByUsername(username);
        return passwordEncoder.matches(password, user.getPassword());
    }

    @Override
    public User loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found: " + username));
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
