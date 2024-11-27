/*
 * @ (#) WishListRepository.java       1.0     18/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.repository;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 18/11/2024
 * @version:    1.0
 */

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.entity.Product;
import vn.edu.iuh.fit.entity.Wishlist;

import java.util.Collection;
import java.util.List;

@Repository
public interface WishListRepository extends JpaRepository<Wishlist, Long> {

    @Query("SELECT w.product FROM Wishlist w WHERE w.user.id = ?1")
    List<Product> findProductByUserId(Long id);

    List<Wishlist> findWishListByUserId(Long userId);

    boolean existsByUserIdAndProductId(Long userId, Long productId);

    @Modifying
    @Query("DELETE FROM Wishlist w WHERE w.user.id = ?1 AND w.product.id = ?2")
    void removeByProductIdAndUserId(Long productId, Long userId);
}
