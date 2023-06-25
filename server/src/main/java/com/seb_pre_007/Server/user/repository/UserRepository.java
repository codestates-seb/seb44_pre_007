package com.seb_pre_007.Server.user.repository;

import com.seb_pre_007.Server.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User,Long> {

    @Query("select u from User u where u.userEmail=:userEmail and u.userStatus='ACTIVE'")
    Optional<User> findByUserEmail(String userEmail);

    @Query("select u from User u where u.userEmail=:userEmail and u.userStatus='WITHDRAWAL'")
    User findDeletedUserByUserEmail(String userEmail);
}
