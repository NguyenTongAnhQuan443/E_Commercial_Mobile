/*
 * @ (#) CreditCardDetailMapper.java       1.0     20/11/2024
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
import vn.edu.iuh.fit.dto.CreditCardDto;
import vn.edu.iuh.fit.entity.CreditCard;

@Mapper(componentModel = "spring")
public interface CreditCardDetailMapper {
    CreditCardDetailMapper INSTANCE = Mappers.getMapper(CreditCardDetailMapper.class);

//    @Mapping(target = "cvv", source = "securityCode")
    CreditCardDto toDto(CreditCard creditCard);

//    @Mapping(target = "securityCode", source = "cvv")
    CreditCard toEntity(CreditCardDto creditCardDto);

}
