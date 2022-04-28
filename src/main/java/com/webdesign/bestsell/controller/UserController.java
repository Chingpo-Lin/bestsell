package com.webdesign.bestsell.controller;

import com.webdesign.bestsell.domain.Cart;
import com.webdesign.bestsell.domain.User;
import com.webdesign.bestsell.service.UserService;
import com.webdesign.bestsell.utils.JsonData;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.UUID;
import javax.servlet.http.Cookie;

@RestController
@RequestMapping("/pub/user")
public class UserController {
    static final int FIVE_DAYS = 43200;
    @Autowired
    public UserService userService;

    @PostMapping("signup")
    public JsonData signup(@RequestBody User user) {

        int row = userService.signup(user);

        return row > 0 ? JsonData.buildSuccess(user.getName()): JsonData.buildError("cannot signup");
    }

    @GetMapping("list_user")
    public JsonData listUser() {

        List<User> userList = userService.listUser();
        System.out.println(userList);
        return JsonData.buildSuccess(userList);
    }

    @PostMapping("login")
    public JsonData login(@RequestBody User user, HttpServletRequest request, HttpServletResponse response) {

        boolean ifLogin = userService.login(user.getPhone(), user.getPwd());
        if (ifLogin) {
            String sessionID = UUID.randomUUID().toString();
            request.getSession().setAttribute(sessionID, user);
            Cookie cookie = new Cookie("sessionId", sessionID);
            cookie.setMaxAge(FIVE_DAYS);
            response.addCookie(cookie);
            return JsonData.buildSuccess("Logged in");
        }

        return JsonData.buildError("Password or username invalid");
    }

    @GetMapping("log_out")
    public JsonData logout(HttpServletRequest request) {
        String sessionId = "Default";
        Cookie [] cookies = request.getCookies();
        if (cookies == null) {
            System.out.println("No Cookies");
            return JsonData.buildSuccess("Logged out");
        }

        for (Cookie cookie: cookies) {
            if (cookie.getName().equals("sessionId")) {
                sessionId = cookie.getValue();
                break;
            }
        }

        if (sessionId.equals("Default")) {
            System.out.println("cannot find sessionId");
        }
        else {
            request.getSession().removeAttribute(sessionId);
        }

        return JsonData.buildSuccess("Logged out");
    }
}
