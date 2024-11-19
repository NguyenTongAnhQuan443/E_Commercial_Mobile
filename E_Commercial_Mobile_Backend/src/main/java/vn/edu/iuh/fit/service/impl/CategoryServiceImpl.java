/*
 * @ (#) CategoryServiceImpl.java       1.0     19/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.service.impl;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 19/11/2024
 * @version:    1.0
 */

import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.converter.CategoryMapper;
import vn.edu.iuh.fit.dto.CategoryDto;
import vn.edu.iuh.fit.repository.CategoryRepository;
import vn.edu.iuh.fit.service.CategoryService;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public CategoryServiceImpl(CategoryRepository categoryRepository, CategoryMapper categoryMapper) {
        this.categoryRepository = categoryRepository;
        this.categoryMapper = categoryMapper;
    }

    @Override
    public List<CategoryDto> getAll() {
        return categoryRepository.findAll().stream().map(categoryMapper::toDto).toList();
    }
}
