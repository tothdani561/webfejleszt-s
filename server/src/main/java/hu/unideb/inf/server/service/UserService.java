package hu.unideb.inf.server.service;

import hu.unideb.inf.server.model.Task;
import hu.unideb.inf.server.model.User;

import java.util.List;
import java.util.Optional;

public interface UserService {

    void createOne(User user);

    Optional<User> findOne(Long id);

    void updateOne(User updated);

    public List<Task> getTasksByUserId(Long userId);

}
