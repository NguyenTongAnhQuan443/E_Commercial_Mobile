/*
 * @ (#) UserServiceImpl.java       1.0     21/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.service.impl;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 21/11/2024
 * @version:    1.0
 */

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.converter.UserMapper;
import vn.edu.iuh.fit.dto.auth.LoginDto;
import vn.edu.iuh.fit.dto.auth.PasswordChangeRequestDto;
import vn.edu.iuh.fit.dto.auth.RegisterDto;
import vn.edu.iuh.fit.dto.UserDto;
import vn.edu.iuh.fit.entity.User;
import vn.edu.iuh.fit.repository.UserRepository;
import vn.edu.iuh.fit.service.UserService;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }

    @Override
    public RegisterDto register(RegisterDto registerDTO) {
        User user = new User();
        user.setEmail(registerDTO.getEmail());
        user.setPassword(bCryptPasswordEncoder.encode(registerDTO.getPassword()));
        user.setFullName(registerDTO.getFullName());

        userRepository.save(user);

        RegisterDto registerResponseDto = new RegisterDto();
        registerResponseDto.setEmail(user.getEmail());
        registerResponseDto.setFullName(user.getFullName());

        return registerResponseDto;
    }

    @Override
    public UserDto login(LoginDto loginDto) {
        User user = userRepository.findUserByEmail(loginDto.getEmail()).orElse(null);

        if (user != null && bCryptPasswordEncoder.matches(loginDto.getPassword(), user.getPassword())) {
            return userMapper.toDto(user);
        }

        return null;
    }

    @Override
    public UserDto updateUser(UserDto userDto) {
        User user = userRepository.findUserByEmail(userDto.getEmail()).orElse(null);

        if (user != null) {
            userDto.setId(user.getId());
            return userMapper.toDto(userRepository.save(userMapper.toEntity(userDto)));
        }

        return null;
    }

    @Override
    public UserDto getUserByEmail(String email) {
        User user = userRepository.findUserByEmail(email).orElse(null);

        if (user != null) {
            return userMapper.toDto(user);
        }

        return null;
    }

    @Override
    public UserDto changePassword(PasswordChangeRequestDto passwordChangeRequestDto) {
        User user = userRepository.findUserByEmail(passwordChangeRequestDto.getEmail()).orElse(null);

        if (user != null && bCryptPasswordEncoder.matches(passwordChangeRequestDto.getOldPassword(), user.getPassword())) {
            user.setPassword(bCryptPasswordEncoder.encode(passwordChangeRequestDto.getNewPassword()));
            return userMapper.toDto(userRepository.save(user));
        }

        return null;
    }
}
