package com.webdesign.bestsell.controller;

import com.webdesign.bestsell.domain.User;
import com.webdesign.bestsell.service.UserService;
import com.webdesign.bestsell.utils.JsonData;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/bestsell/pub/user")
public class UserController {

    @Autowired
    public UserService userService;

    @PostMapping("signup")
    public JsonData signup(@RequestBody User user) {

        int row = userService.signup(user);

        return row > 0 ? JsonData.buildSuccess(user.getName()): JsonData.buildError("cannot signup");
    }

    @GetMapping("listUser")
    public JsonData listUser() {

        List<User> userList = userService.listUser();
        System.out.println(userList);
        return JsonData.buildSuccess(userList);
    }

    @PostMapping("login")
    public JsonData login(@RequestBody User user) {

        String token = userService.login(user.getPhone(), user.getPwd());
        return token != null ? JsonData.buildSuccess(token): JsonData.buildError("error of phone or pwd");
    }
}
