/*
 * @ (#) WishListService.java       1.0     27/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.service;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 27/11/2024
 * @version:    1.0
 */

import vn.edu.iuh.fit.dto.ProductDto;
import vn.edu.iuh.fit.dto.WishlistDto;

import java.util.List;

public interface WishListService {
    List<ProductDto> getProductByUserId(Long id);
    List<WishlistDto> getWishListByUserId(Long userId);
    String addProductToWishList(WishlistDto wishlistDto);
    void deleteProductFromWishList(Long userId, Long productId);
}
