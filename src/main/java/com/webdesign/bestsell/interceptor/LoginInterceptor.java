package com.webdesign.bestsell.interceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.webdesign.bestsell.utils.JsonData;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

public class LoginInterceptor implements HandlerInterceptor {

    /**
     * handle all intercept cases
     * @param request
     * @param response
     * @param handler
     * @return
     * @throws Exception
     */
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        boolean login = true;
        // TODO
        // check if user in session
        String sessionId = "Default";
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            System.out.println("Intercepter: No Cookies");
            login = false;
        }

        for (Cookie cookie: cookies) {
            if (cookie.getName().equals("sessionId")) {
                System.out.println("log out: found session id in cookie:" +  cookie.getValue());
                sessionId = cookie.getValue();
                break;
            }
        }

        if (sessionId.equals("Default")) {
            login = false;
        }

        System.out.println("enter interceptor part");
        if (!login) {
            sendJsonMessage(response, JsonData.buildError("please log in first"));
            return false;
        }
        return true;
    }

    /**
     * response json data to frontend
     * @param response
     * @param obj
     */
    public static void sendJsonMessage(HttpServletResponse response, Object obj) {
        try {
            ObjectMapper objectMapper = new ObjectMapper();
            response.setContentType("application/json; charset=utf-8");
            PrintWriter writer = response.getWriter();
            writer.print(objectMapper.writeValueAsString(obj));
            writer.close();
            response.flushBuffer();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }



    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {

    }
}
