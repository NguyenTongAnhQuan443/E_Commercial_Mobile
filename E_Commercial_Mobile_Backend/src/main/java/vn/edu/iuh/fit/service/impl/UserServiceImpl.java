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
        return userRepository.findUserByEmail(loginDto.getEmail())
                .map(userMapper::toDto)
                .orElse(null);
    }
}
