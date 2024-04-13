package com.vertech.forest.service.aop;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;

@Aspect
@Component
public class LoginAspect{
    @Before("execution(public * com.vertech.forest.service.UserService.createUser(..)) || " +
            "execution(public * com.vertech.forest.service.QueryService.saveQuery(..))")
    public void checkLogin() {
        System.out.println("Checking login");
    }
}
