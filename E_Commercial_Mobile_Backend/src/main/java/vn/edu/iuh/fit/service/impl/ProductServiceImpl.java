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

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import vn.edu.iuh.fit.converter.ProductMapper;
import vn.edu.iuh.fit.dto.ProductDto;
import vn.edu.iuh.fit.dto.api.ExternalProductDto;
import vn.edu.iuh.fit.entity.Product;
import vn.edu.iuh.fit.repository.ProductRepository;
import vn.edu.iuh.fit.service.ProductService;

import java.util.Comparator;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;
    private final ProductMapper productMapper;
    private final RestTemplate restTemplate;

    public ProductServiceImpl(ProductRepository productRepository, ProductMapper productMapper, RestTemplate restTemplate) {
        this.productRepository = productRepository;
        this.productMapper = productMapper;
        this.restTemplate = restTemplate;
    }

    @Override
    public List<ProductDto> getAllProduct() {
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

    @Override
    public List<ProductDto> getRecommendations(Long id) {
        try {
            List<ExternalProductDto> externalProductDtos = restTemplate.exchange(
                    "http://localhost:5000/api/recommendations/product/" + id,
                    HttpMethod.GET,
                    null,
                    new ParameterizedTypeReference<List<ExternalProductDto>>() {
                    }
            ).getBody();

            if (externalProductDtos != null) {
                return getProductsDto(externalProductDtos);
            } else {
                return List.of();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return List.of();
        }
    }

    @Override
    public List<ProductDto> getProductsByName(String name) {
        return productRepository.searchByName(name)
                .stream()
                .map(productMapper::toDto)
                .toList();
    }

    private List<ProductDto> getProductsDto(List<ExternalProductDto> externalProductDtos) {
        return externalProductDtos.stream().map(externalProductDto -> {
            Product product = productRepository.findById(externalProductDto.getId()).orElse(new Product());
            return productMapper.toDto(product);
        }).toList();
    }
}
