/*
 * @ (#) ProductService.java       1.0     18/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.service;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 18/11/2024
 * @version:    1.0
 */

import org.springframework.stereotype.Component;
import vn.edu.iuh.fit.dto.ProductDto;
import vn.edu.iuh.fit.entity.Product;

import java.util.List;

public interface ProductService {
    List<ProductDto> getAllProduct();
    ProductDto getProductById(Long id);
    List<ProductDto> getProductByCategory(Long id);

    List<ProductDto> getBestSeller();

    List<ProductDto> getExclusiveOffer();

    List<ProductDto> getRecommendations(Long id);
}
