package com.webdesign.bestsell.dao;

import com.webdesign.bestsell.domain.User;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
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

    /**
     * login
     * @param phone
     * @param pwd
     * @return
     */
    User login(@Param("phone") String phone, @Param("pwd") String pwd);

    User findUserByPhone(@Param("phone") String phone);
}
