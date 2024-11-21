/*
 * @ (#) UserMapper.java       1.0     21/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.converter;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 21/11/2024
 * @version:    1.0
 */

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import vn.edu.iuh.fit.dto.UserDto;
import vn.edu.iuh.fit.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
//    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
//
//    UserDto toDto(User user);
//
////    @Mapping(target = "password", ignore = true)
////    @Mapping(target = "enabled", ignore = true)
////    @Mapping(target = "phone", ignore = true)
////    @Mapping(target = "address", ignore = true)
////    @Mapping(target = "email", ignore = true)
//    User toEntity(UserDto userDto);
}
