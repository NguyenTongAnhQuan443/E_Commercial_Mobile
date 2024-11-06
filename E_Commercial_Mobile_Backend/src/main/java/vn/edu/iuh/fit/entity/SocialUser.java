/*
 * @ (#) GoogleUser.java       1.0     05/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.entity;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 05/11/2024
 * @version:    1.0
 */

import lombok.*;

@Getter
@Setter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class SocialUser {
    private String id;
    private String email;
    private String name;
    private String picture;

}
