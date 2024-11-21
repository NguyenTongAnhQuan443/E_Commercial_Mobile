/*
 * @ (#) RegisterDTO.java       1.0     21/11/2024
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

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class RegisterDto {
    private String email;
    private String password;
    private String fullName;
}
