/*
 * @ (#) DeliveryMethodRESTController.java       1.0     20/11/2024
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.dto.DeliveryMethodDto;
import vn.edu.iuh.fit.service.DeliveryMethodService;

import java.util.List;

@RestController
@RequestMapping("/api/delivery-method")
public class DeliveryMethodRESTController {

    private final DeliveryMethodService deliveryMethodService;

    public DeliveryMethodRESTController(DeliveryMethodService deliveryMethodService) {
        this.deliveryMethodService = deliveryMethodService;
    }

    @GetMapping
    public ResponseEntity<List<DeliveryMethodDto>> getAllDeliveryMethod() {
        return ResponseEntity.ok(deliveryMethodService.getAllDeliveryMethod());
    }

    @GetMapping("/{id}")
    public ResponseEntity<DeliveryMethodDto> getDeliveryMethodById(@PathVariable Long id) {
        return ResponseEntity.ok(deliveryMethodService.getDeliveryMethodById(id));
    }

}
