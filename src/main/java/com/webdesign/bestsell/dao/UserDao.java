package com.webdesign.bestsell.dao;

import com.webdesign.bestsell.domain.User;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserDao {

    /**
     * signup and add user to database
     * @param user
     * @return
     */
    int signUpUser(User user);

    /**
     * list all users
     * @return
     */
    List<User> listUser();
}
