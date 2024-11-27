package vn.edu.iuh.fit.dto;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link vn.edu.iuh.fit.entity.Wishlist}
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class WishlistDto implements Serializable {
    Long id;
    String name;
    LocalDate addedDate;
    boolean isPurchase;
    ProductDto product;
    UserDto user;
}