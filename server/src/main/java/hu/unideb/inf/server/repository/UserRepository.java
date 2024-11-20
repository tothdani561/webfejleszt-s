package hu.unideb.inf.server.repository;

import hu.unideb.inf.server.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    Optional<User> findByUsername(String username);

    Optional<User> findById(Long id);

    boolean existsByEmail(String email);

    boolean existsByUsername(String username);
}
