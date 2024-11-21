/*
 * @ (#) LoginResponseDto.java       1.0     21/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.dto.auth;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 21/11/2024
 * @version:    1.0
 */

import lombok.*;
import vn.edu.iuh.fit.dto.UserDto;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class LoginResponseDto {
    private String status;
    private String message;
    private UserDto userDto;
}
