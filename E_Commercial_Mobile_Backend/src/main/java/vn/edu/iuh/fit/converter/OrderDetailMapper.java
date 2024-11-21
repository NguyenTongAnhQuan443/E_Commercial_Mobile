/*
 * @ (#) OrderDetailMapper.java       1.0     21/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.converter;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 21/11/2024
 * @version:    1.0
 */

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
import vn.edu.iuh.fit.dto.OrderDetailDto;
import vn.edu.iuh.fit.entity.OrderDetail;

@Mapper(componentModel = "spring")
public interface OrderDetailMapper {
    OrderDetailMapper INSTANCE = Mappers.getMapper(OrderDetailMapper.class);

    @Mapping(source = "order.id", target = "orderId")
    @Mapping(source = "product.id", target = "productId")
    OrderDetailDto toDto(OrderDetail orderDetail);

    @Mapping(source = "orderId", target = "id.orderId")
    @Mapping(source = "productId", target = "id.productId")
    @Mapping(target = "order", ignore = true)
    @Mapping(target = "id", ignore = true)
    OrderDetail toEntity(OrderDetailDto orderDetailDto);
}
