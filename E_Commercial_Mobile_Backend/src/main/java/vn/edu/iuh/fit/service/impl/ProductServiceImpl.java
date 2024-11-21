/*
 * @ (#) ProductServiceImpl.java       1.0     18/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.service.impl;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 18/11/2024
 * @version:    1.0
 */

import org.springframework.stereotype.Service;
import vn.edu.iuh.fit.converter.ProductMapper;
import vn.edu.iuh.fit.dto.ProductDto;
import vn.edu.iuh.fit.repository.ProductRepository;
import vn.edu.iuh.fit.service.ProductService;

import java.util.Comparator;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;

    public ProductServiceImpl(ProductRepository productRepository, ProductMapper productMapper) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
    }

    @Override
    public List<ProductDto> getAllProduct() {
        System.out.println("Get all product: "+ productRepository.findAll());
        return productRepository.findAll().stream().map(productMapper::toDto).toList();
    }

    @Override
    public ProductDto getProductById(Long id) {
        return productMapper.toDto(productRepository.findById(id).orElseThrow());
    }

    @Override
    public List<ProductDto> getProductByCategory(Long id) {
        return productRepository.findByCategory_Id(id).stream().map(productMapper::toDto).toList();
    }

    @Override
    public List<ProductDto> getBestSeller() {
        return productRepository.findAll().stream()
                .map(productMapper::toDto)
                .sorted(Comparator.comparing(ProductDto::getPrice))  // Sắp xếp theo giá
                .toList();
    }

    @Override
    public List<ProductDto> getExclusiveOffer() {
        return productRepository.findAll().stream().map(productMapper::toDto).toList();
    }
}
