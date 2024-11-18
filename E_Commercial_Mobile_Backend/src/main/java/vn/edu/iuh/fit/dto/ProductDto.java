package vn.edu.iuh.fit.dto;

import lombok.*;

import java.io.Serializable;
import java.util.List;

/**
 * DTO for {@link vn.edu.iuh.fit.entity.Product}
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ProductDto implements Serializable {
    Long id;
    String name;
    String description;
    double price;
    String weight;
    int quantity;
    double avgRating;
    CategoryDto category;
    List<ImageDto> images;
    List<ReviewDto> reviews;
}