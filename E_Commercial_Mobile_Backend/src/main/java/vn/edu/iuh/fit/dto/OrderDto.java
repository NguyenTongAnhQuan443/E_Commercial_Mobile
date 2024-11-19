package vn.edu.iuh.fit.dto;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

/**
 * DTO for {@link vn.edu.iuh.fit.entity.Order}
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class OrderDto implements Serializable {
    Long id;
    LocalDate createdDate;
    String shippingAddress;
    LocalDate shippingDate;
    double shippingFee;
    String status;
    List<OrderDetailDto> orderDetails;
    PaymentMethodDto paymentMethod;
    DeliveryMethodDto deliveryMethod;
    PromotionDto promotion;
    UserDto user;
}