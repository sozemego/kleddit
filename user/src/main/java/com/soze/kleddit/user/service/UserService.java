package com.soze.kleddit.user.service;

import com.soze.kleddit.user.dto.RegisterUserForm;
import com.soze.kleddit.user.entity.User;
import com.soze.kleddit.user.exceptions.UserRegistrationException;
import com.soze.kleddit.utils.jpa.EntityUUID;

import java.util.List;
import java.util.Optional;

public interface UserService {

  @Deprecated
  List<User> getAllUsers();

  Optional<User> getUserById(EntityUUID userId);

  Optional<User> getUserByUsername(String username);

  /**
   * Attempts to register a new user.
   * Username case is ignored.
   * Must clear password field from RegisterUserForm using the reset() method.
   * Username cannot be longer than 25 characters.
   * @throws UserRegistrationException if there is a problem with the registration
   */
  void addUser(RegisterUserForm userForm);

  void changeUserPassword(String username, String hash);

  /**
   * Attempts to delete a given user.
   * Deleted users cannot log in, but their names cannot be taken again either.
   */
  void deleteUser(String username);

  /**
   * Checks if given username is available for registration.
   * Returns true if it is available, false otherwise.
   * Also returns false for all illegal usernames.
   */
  boolean isAvailableForRegistration(String username);

}
