/*
 * @ (#) CategoryService.java       1.0     19/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.service;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 19/11/2024
 * @version:    1.0
 */

import vn.edu.iuh.fit.dto.CategoryDto;

import java.util.List;

public interface CategoryService {
    List<CategoryDto> getAll();

}
