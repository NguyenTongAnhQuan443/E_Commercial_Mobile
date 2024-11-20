/*
 * @ (#) PaymentMethodRESTController.java       1.0     20/11/2024
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
import vn.edu.iuh.fit.dto.PaymentMethodDto;
import vn.edu.iuh.fit.service.PaymentMethodService;

import java.util.List;

@RestController
@RequestMapping("/api/payment-method")
public class PaymentMethodRESTController {
    private final PaymentMethodService paymentMethodService;

    public PaymentMethodRESTController(PaymentMethodService paymentMethodService) {
        this.paymentMethodService = paymentMethodService;
    }

    @GetMapping
    public ResponseEntity<List<PaymentMethodDto>> getAllPaymentMethod() {
        return ResponseEntity.ok(paymentMethodService.getAllPaymentMethod());
    }

    @GetMapping("/{id}")
    public ResponseEntity<PaymentMethodDto> getPaymentMethodById(@PathVariable Long id) {
        return ResponseEntity.ok(paymentMethodService.getPaymentMethodById(id));
    }

}
