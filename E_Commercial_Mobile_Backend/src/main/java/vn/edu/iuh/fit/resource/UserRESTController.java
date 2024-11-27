/*
 * @ (#) UserRESTController.java       1.0     27/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.resource;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 27/11/2024
 * @version:    1.0
 */

import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.dto.UserDto;
import vn.edu.iuh.fit.dto.auth.PasswordChangeRequestDto;
import vn.edu.iuh.fit.service.UserService;

@RestController
@RequestMapping("/api/users")
@Transactional
public class UserRESTController {

    private final UserService userService;

    public UserRESTController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{email}")
    public ResponseEntity<?> getUserByEmail(@PathVariable String email) {
        try {
            UserDto userDto = userService.getUserByEmail(email);
            if (userDto != null) {
                return ResponseEntity.ok(userDto);
            } else {
                return ResponseEntity.badRequest().body("User not found");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody UserDto userDto) {
        try {
            UserDto updatedUser = userService.updateUser(userDto);
            if (updatedUser != null) {
                return ResponseEntity.ok(updatedUser);
            } else {
                return ResponseEntity.badRequest().body("User not found");
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody PasswordChangeRequestDto passwordChangeRequestDto) {
        try {
            UserDto userDto = userService.getUserByEmail(passwordChangeRequestDto.getEmail());

            if (userDto == null) {
                return ResponseEntity.badRequest().body("User not found");
            }

            if (!passwordChangeRequestDto.getNewPassword().equals(passwordChangeRequestDto.getConfirmPassword())) {
                return ResponseEntity.badRequest().body("New password and confirm password do not match");
            }

            if (userService.changePassword(passwordChangeRequestDto) != null) {
                return ResponseEntity.ok("Password changed successfully");
            } else {
                return ResponseEntity.badRequest().body("Old password is incorrect");
            }

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
