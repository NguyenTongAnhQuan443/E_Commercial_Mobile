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
import vn.edu.iuh.fit.dto.OrderDetailDto;
import vn.edu.iuh.fit.dto.OrderDto;
import vn.edu.iuh.fit.entity.*;
import vn.edu.iuh.fit.repository.*;
import vn.edu.iuh.fit.service.OrderService;

import java.util.ArrayList;
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
        // 1. Tạo và lưu Order trước
        Order order = orderMapper.toEntity(orderDto);

        // 2. Set các relationship khác trước khi lưu Order
        if (orderDto.getPaymentMethod() != null) {
            PaymentMethod paymentMethod = paymentMethodRepository.findById(orderDto.getPaymentMethod().getId())
                    .orElseThrow(() -> new RuntimeException("Payment method not found"));
            order.setPaymentMethod(paymentMethod);
        }

        if (orderDto.getDeliveryMethod() != null) {
            DeliveryMethod deliveryMethod = deliveryMethodRepository.findById(orderDto.getDeliveryMethod().getId())
                    .orElseThrow(() -> new RuntimeException("Delivery method not found"));
            order.setDeliveryMethod(deliveryMethod);
        }

        if (orderDto.getPromotion() != null) {
            Promotion promotion = promotionRepository.findById(orderDto.getPromotion().getId())
                    .orElseThrow(() -> new RuntimeException("Promotion not found"));
            order.setPromotion(promotion);
        }

        if (orderDto.getUser() != null) {
            User user = userRepository.findById(orderDto.getUser().getId())
                    .orElseThrow(() -> new RuntimeException("User not found"));
            order.setUser(user);
        }

        // 3. Lưu CreditCard nếu có
        if (orderDto.getCreditCard() != null) {
            CreditCard creditCard;
            if (orderDto.getCreditCard().getId() != null) {
                creditCard = creditCardDetailRepository.findById(orderDto.getCreditCard().getId())
                        .orElseThrow(() -> new RuntimeException("Credit card not found"));
            } else {
                creditCard = creditCardDetailMapper.toEntity(orderDto.getCreditCard());
                creditCard = creditCardDetailRepository.save(creditCard);
            }
            order.setCreditCard(creditCard);
        }

        // 4. Lưu Order
        order = orderRepository.save(order);

        // 5. Xử lý OrderDetails
        if (orderDto.getOrderDetails() != null && !orderDto.getOrderDetails().isEmpty()) {
            List<OrderDetail> orderDetails = new ArrayList<>();

            for (OrderDetailDto detailDto : orderDto.getOrderDetails()) {
                Product product = productRepository.findById(detailDto.getProductId())
                        .orElseThrow(() -> new RuntimeException("Product not found"));

                OrderDetail orderDetail = orderDetailMapper.toEntity(detailDto);

                // Tạo ID cho OrderDetail
                OrderDetailId orderDetailId = new OrderDetailId();
                orderDetailId.setOrderId(order.getId());
                orderDetailId.setProductId(product.getId());

                // Set relationships
                orderDetail.setId(orderDetailId);
                orderDetail.setOrder(order);
                orderDetail.setProduct(product);

                // Thêm vào list
                orderDetails.add(orderDetail);
            }

            // Lưu tất cả OrderDetails
            orderDetails = orderDetailRepository.saveAll(orderDetails);
            order.setOrderDetails(orderDetails);

            // Cập nhật lại Order
            order = orderRepository.save(order);
        }

        return orderMapper.toDto(order);
    }

    @Override
    public List<OrderDto> getOrderByUserId(Long userId) {
        return orderRepository.findByUser_Id(userId).stream().map(orderMapper::toDto).toList();
    }

    @Override
    public boolean cancelOrder(Long orderId) {
        try {
            Order order = orderRepository.findById(orderId).orElseThrow();
            order.setStatus("CANCELLED");
            orderRepository.save(order);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
