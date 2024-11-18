/*
 * @ (#) CategoryRESTController.java       1.0     19/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.resource;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 19/11/2024
 * @version:    1.0
 */

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import vn.edu.iuh.fit.dto.CategoryDto;
import vn.edu.iuh.fit.service.CategoryService;

import java.util.List;

@RestController
@RequestMapping("/api/category")
public class CategoryRESTController {

    private final CategoryService categoryService;

    public CategoryRESTController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAll() {
        try {
            return ResponseEntity.ok(categoryService.getAll());
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}
