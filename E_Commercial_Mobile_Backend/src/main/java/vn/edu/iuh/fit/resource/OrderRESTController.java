/*
 * @ (#) OrderRESTController.java       1.0     22/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.resource;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 22/11/2024
 * @version:    1.0
 */

import jakarta.transaction.Transactional;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.iuh.fit.dto.OrderDto;
import vn.edu.iuh.fit.service.OrderService;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderRESTController {

    private final OrderService orderService;

    public OrderRESTController(OrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping("/by-user/{userId}")
    public ResponseEntity<?> getOrderByUserId(@PathVariable Long userId) {
        try {
            List<OrderDto> orderDtos = orderService.getOrderByUserId(userId);
            if (orderDtos.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok(orderDtos);

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @GetMapping("/cancel/{orderId}")
    public ResponseEntity<?> cancelOrder(@PathVariable Long orderId) {
        try {
            return ResponseEntity.ok(orderService.cancelOrder(orderId));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping
    @Transactional
    public ResponseEntity<?> createOrder(@RequestBody OrderDto orderDto) {
        try {
            return ResponseEntity.ok(orderService.createOrder(orderDto));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body(null);
        }
    }
}
