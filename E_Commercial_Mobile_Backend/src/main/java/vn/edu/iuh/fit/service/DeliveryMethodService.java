/*
 * @ (#) DeliveryMethodService.java       1.0     20/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.service;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 20/11/2024
 * @version:    1.0
 */

import vn.edu.iuh.fit.dto.DeliveryMethodDto;

import java.util.List;

public interface DeliveryMethodService {
    List<DeliveryMethodDto> getAllDeliveryMethod();
    DeliveryMethodDto getDeliveryMethodById(Long id);
}
