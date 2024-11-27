/*
 * @ (#) PasswordChangeRequestDto.java       1.0     27/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.dto.auth;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 27/11/2024
 * @version:    1.0
 */

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class PasswordChangeRequestDto {
    private String email;
    private String oldPassword;
    private String newPassword;
    private String confirmPassword;

}
