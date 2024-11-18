package vn.edu.iuh.fit.dto;

import lombok.*;

import java.io.Serializable;

/**
 * DTO for {@link vn.edu.iuh.fit.entity.User}
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class UserDto implements Serializable {
    Long id;
    String username;
    String fullName;
    String gender;
    String avatar;
}