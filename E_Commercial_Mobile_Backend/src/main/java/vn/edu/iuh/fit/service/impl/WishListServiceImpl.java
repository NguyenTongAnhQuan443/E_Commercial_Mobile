/*
 * @ (#) WishListServiceImpl.java       1.0     27/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.service.impl;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 27/11/2024
 * @version:    1.0
 */

import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.converter.ProductMapper;
import vn.edu.iuh.fit.converter.WishListMapper;
import vn.edu.iuh.fit.dto.ProductDto;
import vn.edu.iuh.fit.dto.WishlistDto;
import vn.edu.iuh.fit.entity.Product;
import vn.edu.iuh.fit.entity.User;
import vn.edu.iuh.fit.entity.Wishlist;
import vn.edu.iuh.fit.repository.ProductRepository;
import vn.edu.iuh.fit.repository.UserRepository;
import vn.edu.iuh.fit.repository.WishListRepository;
import vn.edu.iuh.fit.service.WishListService;

import java.util.List;

@Service
public class WishListServiceImpl implements WishListService {

    private final WishListRepository wishListRepository;
    private final WishListMapper wishListMapper;
    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final UserRepository userRepository;

    public WishListServiceImpl(WishListRepository wishListRepository, WishListMapper wishListMapper, ProductMapper productMapper, ProductRepository productRepository, UserRepository userRepository) {
        this.wishListRepository = wishListRepository;
        this.wishListMapper = wishListMapper;
        this.productMapper = productMapper;
        this.productRepository = productRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<ProductDto> getProductByUserId(Long id) {
        List<Product> productFromWishList = wishListRepository.findProductByUserId(id);
        return productFromWishList.stream().map(productMapper::toDto).toList();
    }

    @Override
    public List<WishlistDto> getWishListByUserId(Long userId) {
        return wishListRepository.findWishListByUserId(userId).stream().map(wishListMapper::toDto).toList();
    }

    @Override
    public String addProductToWishList(WishlistDto wishlistDto) {
                User user = userRepository.findUserByEmail(wishlistDto.getUser().getEmail()).orElse(null);
        Product product = productRepository.findById(wishlistDto.getProduct().getId()).orElse(null);
        if (user == null || product == null) {
            return "User or product not found";
        }

        if (wishListRepository.existsByUserIdAndProductId(user.getId(), product.getId())) {
            return "Product already exists in the wish list";
        }

        Wishlist wishlist = wishListMapper.toEntity(wishlistDto);
        wishlist.setUser(user);
        wishlist.setProduct(product);
        wishListRepository.save(wishlist);
        return "Add product to wish list successfully";
    }

    @Override
    public void deleteProductFromWishList(Long userId, Long productId) {
        wishListRepository.removeByProductIdAndUserId(userId, productId);
    }
}
