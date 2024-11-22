/*
 * @ (#) ProductRESTController.java       1.0     18/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.resource;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 18/11/2024
 * @version:    1.0
 */

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import vn.edu.iuh.fit.dto.ProductDto;
import vn.edu.iuh.fit.service.ProductService;

import java.util.List;

@RestController
@RequestMapping("/api/products")
public class ProductRESTController {

    private final ProductService productService;

    public ProductRESTController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<ProductDto>> getAllProduct() {
        try {
            return ResponseEntity.ok(productService.getAllProduct());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(productService.getProductById(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/by-category/{id}")
    public ResponseEntity<List<ProductDto>> getProductByCategory(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(productService.getProductByCategory(id));
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/exclusive-offer")
    public ResponseEntity<List<ProductDto>> getExclusiveOffer() {
        try {
            return ResponseEntity.ok(productService.getExclusiveOffer());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/best-seller")
    public ResponseEntity<List<ProductDto>> getBestSeller() {
        try {
            return ResponseEntity.ok(productService.getBestSeller());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/recommendations/product/{id}")
    public ResponseEntity<List<ProductDto>> getRecommendations(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(productService.getRecommendations(id));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/filter")
    public ResponseEntity<List<ProductDto>> searchProducts(@RequestParam String name) {
        List<ProductDto> products = productService.getProductsByName(name);
        return ResponseEntity.ok(products);
    }
}
