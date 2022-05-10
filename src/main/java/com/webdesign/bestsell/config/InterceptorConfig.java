package com.webdesign.bestsell.config;

import com.webdesign.bestsell.interceptor.CorsInterceptor;
import com.webdesign.bestsell.interceptor.LoginInterceptor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class InterceptorConfig implements WebMvcConfigurer {

    @Bean
    LoginInterceptor loginInterceptor() {
        return new LoginInterceptor();
    }

    @Bean
    CorsInterceptor corsInterceptor() {
        return new CorsInterceptor();
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // intercept all start with /pri except signup login and list_user
        registry.addInterceptor(loginInterceptor()).addPathPatterns("/pri/*/*/**")
                .excludePathPatterns("/pri/user/signup","/pri/user/login", "/pri/user/list_user");

        registry.addInterceptor(corsInterceptor()).addPathPatterns("/**");

        WebMvcConfigurer.super.addInterceptors(registry);
    }
}
