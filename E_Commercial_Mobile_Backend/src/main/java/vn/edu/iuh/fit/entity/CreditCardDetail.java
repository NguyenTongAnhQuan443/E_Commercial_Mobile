/*
 * @ (#) CreditcardDetail.java       1.0     20/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.entity;

import jakarta.persistence.*;
import lombok.*;

/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 20/11/2024
 * @version:    1.0
 */

@Entity
@Table(name = "credit_card_detail")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CreditCardDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String cardNumber;
    private String expiryDate;
    private String securityCode;

}
