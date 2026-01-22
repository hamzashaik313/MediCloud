

package com.medicloud.medicalrecords.repository;

import com.medicloud.medicalrecords.model.User;
import com.medicloud.medicalrecords.model.Role;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    //  search
    Page<User> findByUsernameContainingIgnoreCase(String username, Pageable pageable);

    // filter
    Page<User> findByRole(Role role, Pageable pageable);

    //  combined
    Page<User> findByUsernameContainingIgnoreCaseAndRole(
            String username,
            Role role,
            Pageable pageable
    );
}
