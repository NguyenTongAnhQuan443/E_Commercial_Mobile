/*
 * @ (#) PromotionDto.java       1.0     19/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.dto;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 19/11/2024
 * @version:    1.0
 */

import lombok.*;

import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PromotionDto {
    private Long id;
    private String code;
    private String description;
    private int discount;
    private boolean active;
    private LocalDate startDate;
    private LocalDate endDate;
}
