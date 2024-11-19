/*
 * @ (#) PromotionRESTController.java       1.0     20/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.resource;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 20/11/2024
 * @version:    1.0
 */

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.dto.PromotionDto;
import vn.edu.iuh.fit.service.PromotionService;

import java.util.List;

@RestController
@RequestMapping("/api/promotion")
public class PromotionRESTController {

    private final PromotionService promotionService;

    public PromotionRESTController(PromotionService promotionService) {
        this.promotionService = promotionService;
    }

    @GetMapping
    public ResponseEntity<List<PromotionDto>> getAllPromotion() {
        try {
            return ResponseEntity.ok(promotionService.getAllPromotion());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
