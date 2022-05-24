package com.webdesign.bestsell.interceptor;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.webdesign.bestsell.domain.User;
import com.webdesign.bestsell.utils.JsonData;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;

public class LoginInterceptor implements HandlerInterceptor {

    public static int currentUserID = -1;
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

        String sessionId = "Default";
        Cookie[] cookies = request.getCookies();
        if (cookies == null) {
            System.out.println("Intercepter: No Cookies");
            sendJsonMessage(response, JsonData.buildError("Interceptor: No Cookies, please log in first"));
            currentUserID = -1;
            return false;
        }

        for (Cookie cookie: cookies) {
            if (cookie.getName().equals("sessionId")) {
                System.out.println("Interceptor: found a session id in cookie:" +  cookie.getValue());
                sessionId = cookie.getValue();
                break;
            }
        }

        User user = (User)request.getSession().getAttribute(sessionId);

        if (sessionId.equals("Default") ||  user == null) {
            System.out.println("Interceptor: sessionId not match, cannot preceed");
            sendJsonMessage(response, JsonData.buildError("Interceptor: No record of this sessionID, please log in first"));
            currentUserID = -1;
            return false;
        }

        currentUserID = user.getId();
        System.out.println("Interceptor: successfully went through interceptor ");
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
