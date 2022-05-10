package com.webdesign.bestsell.exception;

import com.webdesign.bestsell.utils.JsonData;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

@ControllerAdvice
public class CustomExceptionHandler {

    private final static Logger logger = LoggerFactory.getLogger(CustomExceptionHandler.class);

    @ExceptionHandler(value=Exception.class)
    @ResponseBody
    public JsonData handle(Exception e) {

        logger.error("[error]", e);

        if (e instanceof SystemException) {
            SystemException systemException = (SystemException) e;
            return JsonData.buildError(systemException.getCode(), systemException.getMsg());
        } else {
            e.printStackTrace();
            return JsonData.buildError("error on server: " + e.getMessage());
        }
    }
}