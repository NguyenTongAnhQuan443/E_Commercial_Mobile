package vn.edu.iuh.fit.dto;

import lombok.*;

import java.io.Serializable;

/**
 * DTO for {@link vn.edu.iuh.fit.entity.Image}
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class ImageDto implements Serializable {
    Long id;
    String name;
    String imageUri;
}