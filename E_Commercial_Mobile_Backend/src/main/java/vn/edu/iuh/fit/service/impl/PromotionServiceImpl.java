/*
 * @ (#) PromotionServiceImpl.java       1.0     20/11/2024
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
import vn.edu.iuh.fit.converter.PromotionMapper;
import vn.edu.iuh.fit.dto.PromotionDto;
import vn.edu.iuh.fit.repository.PromotionRepository;
import vn.edu.iuh.fit.service.PromotionService;

import java.util.List;

@Service
public class PromotionServiceImpl implements PromotionService {

    private final PromotionRepository promotionRepository;
    private final PromotionMapper promotionMapper;

    public PromotionServiceImpl(PromotionRepository promotionRepository, PromotionMapper promotionMapper) {
        this.promotionRepository = promotionRepository;
        this.promotionMapper = promotionMapper;
    }

    @Override
    public List<PromotionDto> getAllPromotion() {
        return promotionRepository.findAll().stream().map(promotionMapper::toDto).toList();
    }
}
