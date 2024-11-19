package hu.unideb.inf.server.service;

import hu.unideb.inf.server.model.Task;
import org.springframework.stereotype.Service;

@Service
public interface TaskService {

    void createTaskForUser(Long userId, Task task);

    void deleteTask(Long taskId);

}

