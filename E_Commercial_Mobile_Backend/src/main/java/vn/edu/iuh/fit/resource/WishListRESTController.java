/*
 * @ (#) WishListRESTController.java       1.0     27/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.resource;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 27/11/2024
 * @version:    1.0
 */

import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.dto.ProductDto;
import vn.edu.iuh.fit.dto.WishlistDto;
import vn.edu.iuh.fit.service.WishListService;

import java.util.List;

@RestController
@RequestMapping("/api/wish-list")
@Transactional
public class WishListRESTController {

    private final WishListService wishListService;

    public WishListRESTController(WishListService wishListService) {
        this.wishListService = wishListService;
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<List<ProductDto>> getProductsByUserId(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(wishListService.getProductByUserId(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/{userId}")
    public ResponseEntity<List<WishlistDto>> getWishListByUserId(@PathVariable Long userId) {
        try {
            return ResponseEntity.ok(wishListService.getWishListByUserId(userId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping
    public ResponseEntity<?> addProductToWishList(@RequestBody WishlistDto wishlistDto) {
        try {
            String result = wishListService.addProductToWishList(wishlistDto);
            if (result.equals("Add product to wish list successfully")) {
                return ResponseEntity.ok(result);
            } else {
                return ResponseEntity.badRequest().body(result);
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Add product to wish list failed");
        }
    }

    @DeleteMapping("/delete/{userId}/{productId}")
    public ResponseEntity<?> deleteProductFromWishList(@PathVariable Long userId, @PathVariable Long productId) {
        try {
            wishListService.deleteProductFromWishList(userId, productId);
            return ResponseEntity.ok("Delete product from wish list successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Delete product from wish list failed");
        }
    }

}
