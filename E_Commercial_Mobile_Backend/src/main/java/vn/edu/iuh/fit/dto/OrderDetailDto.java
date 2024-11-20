package vn.edu.iuh.fit.dto;

import lombok.*;

import java.io.Serializable;

/**
 * DTO for {@link vn.edu.iuh.fit.entity.OrderDetail}
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderDetailDto implements Serializable {
    private Long orderId;
    private Long productId;
    private int quantity;
    private double salePrice;
}