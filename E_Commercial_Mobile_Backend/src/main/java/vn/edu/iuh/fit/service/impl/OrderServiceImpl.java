/*
 * @ (#) OrderServiceImpl.java       1.0     21/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.service.impl;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 21/11/2024
 * @version:    1.0
 */

import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.converter.*;
import vn.edu.iuh.fit.dto.OrderDto;
import vn.edu.iuh.fit.repository.*;
import vn.edu.iuh.fit.service.OrderService;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final OrderDetailRepository orderDetailRepository;
    private final CreditCardDetailRepository creditCardDetailRepository;
    private final PaymentMethodRepository paymentMethodRepository;
    private final ProductRepository productRepository;
    private final DeliveryMethodRepository deliveryMethodRepository;
    private final PromotionRepository promotionRepository;
    private final UserRepository userRepository;
    private final OrderMapper orderMapper;
    private final OrderDetailMapper orderDetailMapper;
    private final CreditCardDetailMapper creditCardDetailMapper;
    private final PaymentMethodMapper paymentMethodMapper;
    private final ProductMapper productMapper;
    private final DeliveryMethodMapper deliveryMethodMapper;
    private final PromotionMapper promotionMapper;
    private final UserMapper userMapper;

    public OrderServiceImpl(OrderRepository orderRepository, OrderDetailRepository orderDetailRepository, CreditCardDetailRepository creditCardDetailRepository, PaymentMethodRepository paymentMethodRepository, ProductRepository productRepository, DeliveryMethodRepository deliveryMethodRepository, PromotionRepository promotionRepository, UserRepository userRepository, OrderMapper orderMapper, OrderDetailMapper orderDetailMapper, CreditCardDetailMapper creditCardDetailMapper, PaymentMethodMapper paymentMethodMapper, ProductMapper productMapper, DeliveryMethodMapper deliveryMethodMapper, PromotionMapper promotionMapper, UserMapper userMapper) {
        this.orderRepository = orderRepository;
        this.orderDetailRepository = orderDetailRepository;
        this.creditCardDetailRepository = creditCardDetailRepository;
        this.paymentMethodRepository = paymentMethodRepository;
        this.productRepository = productRepository;
        this.deliveryMethodRepository = deliveryMethodRepository;
        this.promotionRepository = promotionRepository;
        this.userRepository = userRepository;
        this.orderMapper = orderMapper;
        this.orderDetailMapper = orderDetailMapper;
        this.creditCardDetailMapper = creditCardDetailMapper;
        this.paymentMethodMapper = paymentMethodMapper;
        this.productMapper = productMapper;
        this.deliveryMethodMapper = deliveryMethodMapper;
        this.promotionMapper = promotionMapper;
        this.userMapper = userMapper;
    }

    @Override
    public OrderDto createOrder(OrderDto orderDto) {
        return null;
    }

    @Override
    public List<OrderDto> getOrderByUserId(Long userId) {
        return null;
    }

    @Override
    public boolean cancelOrder(Long orderId) {
        return false;
    }
}
