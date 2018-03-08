package com.soze.kleddit.user.controller;

import com.soze.kleddit.user.dto.ChangePasswordForm;
import com.soze.kleddit.user.dto.Jwt;
import com.soze.kleddit.user.dto.LoginForm;
import com.soze.kleddit.user.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.security.Principal;
import java.util.Objects;

@Controller
@RequestMapping(path = "/api/0.1/user/auth")
public class AuthController {

    private final AuthService authService;

    @Autowired
    public AuthController(final AuthService authService) {
        this.authService = Objects.requireNonNull(authService);
    }

    @RequestMapping(path = "/hello", method = RequestMethod.GET)
    public ResponseEntity hello() {
        return ResponseEntity.ok().build();
    }

    @RequestMapping(path = "/login", method = RequestMethod.POST)
    public ResponseEntity login(final LoginForm loginForm) {
        Jwt token = authService.login(loginForm);
        return ResponseEntity.ok(token);
    }

    @RequestMapping(path = "/password/change", method = RequestMethod.POST)
    public ResponseEntity passwordChange(final ChangePasswordForm changePasswordForm, final Principal principal) {
        authService.passwordChange(principal.getName(), changePasswordForm);
        return ResponseEntity.ok().build();
    }

    @RequestMapping(path = "/logout")
    public ResponseEntity logout() {
        return ResponseEntity.ok().build();
    }


}
