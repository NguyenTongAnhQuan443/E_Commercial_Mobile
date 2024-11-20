/*
 * @ (#) PaymentMethodServiceImpl.java       1.0     20/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.service.impl;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 20/11/2024
 * @version:    1.0
 */

import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.converter.PaymentMethodMapper;
import vn.edu.iuh.fit.dto.PaymentMethodDto;
import vn.edu.iuh.fit.repository.PaymentMethodRepository;
import vn.edu.iuh.fit.service.PaymentMethodService;

import java.util.List;

@Service
public class PaymentMethodServiceImpl implements PaymentMethodService {

    private final PaymentMethodRepository paymentMethodRepository;
    private final PaymentMethodMapper paymentMethodMapper;

    public PaymentMethodServiceImpl(PaymentMethodRepository paymentMethodRepository, PaymentMethodMapper paymentMethodMapper) {
        this.paymentMethodRepository = paymentMethodRepository;
        this.paymentMethodMapper = paymentMethodMapper;
    }

    @Override
    public List<PaymentMethodDto> getAllPaymentMethod() {
        return paymentMethodRepository.findAll().stream().map(paymentMethodMapper::toDto).toList();
    }

    @Override
    public PaymentMethodDto getPaymentMethodById(Long id) {
        return paymentMethodMapper.toDto(paymentMethodRepository.findById(id).orElse(null));
    }
}
