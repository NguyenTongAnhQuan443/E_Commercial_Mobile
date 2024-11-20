/*
 * @ (#) DeliveryMethodSericeImpl.java       1.0     20/11/2024
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
import vn.edu.iuh.fit.converter.DeliveryMethodMapper;
import vn.edu.iuh.fit.dto.DeliveryMethodDto;
import vn.edu.iuh.fit.repository.DeliveryMethodRepository;
import vn.edu.iuh.fit.service.DeliveryMethodService;

import java.util.List;

@Service
public class DeliveryMethodServiceImpl implements DeliveryMethodService {

    private final DeliveryMethodRepository deliveryMethodRepository;
    private final DeliveryMethodMapper deliveryMethodMapper;

    public DeliveryMethodServiceImpl(DeliveryMethodRepository deliveryMethodRepository, DeliveryMethodMapper deliveryMethodMapper) {
        this.deliveryMethodRepository = deliveryMethodRepository;
        this.deliveryMethodMapper = deliveryMethodMapper;
    }

    @Override
    public List<DeliveryMethodDto> getAllDeliveryMethod() {
        return deliveryMethodRepository.findAll().stream().map(deliveryMethodMapper::toDto).toList();
    }

    @Override
    public DeliveryMethodDto getDeliveryMethodById(Long id) {
        return deliveryMethodMapper.toDto(deliveryMethodRepository.findById(id).orElse(null));
    }
}
