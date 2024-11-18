package vn.edu.iuh.fit.dto;

import lombok.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * DTO for {@link vn.edu.iuh.fit.entity.Review}
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ReviewDto implements Serializable {
    Long id;
    float rating;
    String comment;
    LocalDate reviewDate;
    UserDto user;
}