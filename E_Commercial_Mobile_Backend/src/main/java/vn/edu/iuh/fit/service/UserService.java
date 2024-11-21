/*
 * @ (#) UserService.java       1.0     21/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.service;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 21/11/2024
 * @version:    1.0
 */

import vn.edu.iuh.fit.dto.auth.LoginDto;
import vn.edu.iuh.fit.dto.auth.RegisterDto;
import vn.edu.iuh.fit.dto.UserDto;

public interface UserService {
    RegisterDto register(RegisterDto registerDTO);
    UserDto login(LoginDto loginDto);
}
