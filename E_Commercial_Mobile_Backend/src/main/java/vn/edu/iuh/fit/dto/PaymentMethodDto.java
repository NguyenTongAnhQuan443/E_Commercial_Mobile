package vn.edu.iuh.fit.dto;

import lombok.*;

import java.io.Serializable;

/**
 * DTO for {@link vn.edu.iuh.fit.entity.PaymentMethod}
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class PaymentMethodDto implements Serializable {
    Long id;
    String name;
    double fee;
    String description;
    boolean isActive;
}