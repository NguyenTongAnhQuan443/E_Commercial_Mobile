/*
 * @ (#) CreditCardDetailRepository.java       1.0     20/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import vn.edu.iuh.fit.entity.CreditCardDetail;

/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 20/11/2024
 * @version:    1.0
 */

@Repository
public interface CreditCardDetailRepository extends JpaRepository<CreditCardDetail, Long> {
}
