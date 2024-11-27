/*
 * @ (#) WishListMapper.java       1.0     27/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.converter;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 27/11/2024
 * @version:    1.0
 */

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import vn.edu.iuh.fit.dto.WishlistDto;
import vn.edu.iuh.fit.entity.Wishlist;

@Mapper(componentModel = "spring")
public interface WishListMapper {
    WishListMapper INSTANCE = Mappers.getMapper(WishListMapper.class);

    WishlistDto toDto(Wishlist wishlist);

    Wishlist toEntity(WishlistDto wishlistDto);
}
