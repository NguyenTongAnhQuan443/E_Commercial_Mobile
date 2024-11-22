/*
 * @ (#) ExternalProductDTO.java       1.0     22/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.dto.api;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 22/11/2024
 * @version:    1.0
 */

import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class ExternalProductDto {
    private Long id;
    private String name;
    private double avgRating;
    private double price;
}
