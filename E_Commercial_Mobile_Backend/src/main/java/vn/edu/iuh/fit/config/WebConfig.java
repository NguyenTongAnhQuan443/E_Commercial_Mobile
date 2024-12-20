/*
 * @ (#) WebConfig.java       1.0     05/11/2024
 *
 * Copyright (c) 2024 IUH. All rights reserved.
 */

package vn.edu.iuh.fit.config;
/*
 * @description:
 * @author: Nguyen Thanh Nhut
 * @date: 05/11/2024
 * @version:    1.0
 */

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**") // Ánh xạ tất cả các URL
                .allowedOrigins("http://localhost:8081", "http://192.168.0.75:8081", "http://192.168.100.135:8081", "http://172.20.10.3:8081") // Địa chỉ frontend của bạn
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
