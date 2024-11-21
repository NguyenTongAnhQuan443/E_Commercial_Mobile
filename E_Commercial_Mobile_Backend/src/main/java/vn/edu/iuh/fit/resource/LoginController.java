/*
 * @ (#) LoginController.java       1.0     21/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.resource;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 21/11/2024
 * @version:    1.0
 */

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.dto.UserDto;
import vn.edu.iuh.fit.dto.auth.LoginDto;
import vn.edu.iuh.fit.dto.auth.LoginResponseDto;
import vn.edu.iuh.fit.dto.auth.RegisterDto;
import vn.edu.iuh.fit.dto.auth.RegisterResponseDto;
import vn.edu.iuh.fit.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class LoginController {

    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterDto registerDTO) {
        try {
            RegisterDto registerResponseDto = userService.register(registerDTO);

            RegisterResponseDto response = new RegisterResponseDto("success", "Register successfully", registerResponseDto);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            RegisterResponseDto response = new RegisterResponseDto("error", e.getMessage(), null);
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto) {
        try {
            UserDto userDto = userService.login(loginDto);
            LoginResponseDto response = new LoginResponseDto("success", "Login successfully", userDto);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            LoginResponseDto response = new LoginResponseDto("error", e.getMessage(), null);
            return ResponseEntity.badRequest().body(response);
        }
    }
}
