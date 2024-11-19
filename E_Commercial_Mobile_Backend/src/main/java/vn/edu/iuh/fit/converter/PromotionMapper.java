/*
 * @ (#) PromotionMapper.java       1.0     20/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.converter;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 20/11/2024
 * @version:    1.0
 */

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import vn.edu.iuh.fit.dto.PromotionDto;
import vn.edu.iuh.fit.entity.Promotion;

@Mapper(componentModel = "spring")
public interface PromotionMapper {
    PromotionMapper INSTANCE = Mappers.getMapper(PromotionMapper.class);

    PromotionDto toDto(Promotion promotion);

    Promotion toEntity(PromotionDto promotionDto);

}
