-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Server version:               11.5.2-MariaDB - mariadb.org binary distribution
-- Server OS:                    Win64
-- HeidiSQL Version:             12.6.0.6765
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Dumping database structure for ecommerce
CREATE DATABASE IF NOT EXISTS `ecommerce` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `ecommerce`;

-- Dumping structure for table ecommerce.category
CREATE TABLE IF NOT EXISTS `category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(256) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table ecommerce.delivery_method
CREATE TABLE IF NOT EXISTS `delivery_method` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `fee` double NOT NULL,
  `is_active` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table ecommerce.image
CREATE TABLE IF NOT EXISTS `image` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `image_uri` varchar(256) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `product_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgpextbyee3uk9u6o2381m7ft1` (`product_id`),
  CONSTRAINT `FKgpextbyee3uk9u6o2381m7ft1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table ecommerce.order
CREATE TABLE IF NOT EXISTS `order` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` date DEFAULT NULL,
  `shipping_address` varchar(512) DEFAULT NULL,
  `shipping_date` date DEFAULT NULL,
  `shipping_fee` double NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `delivery_method_id` bigint(20) DEFAULT NULL,
  `payment_method_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmkrv9w47ou5o1kcmtsej5xxvd` (`delivery_method_id`),
  KEY `FKgyqbmqrism0pkm2fuesc66ajp` (`payment_method_id`),
  KEY `FKcpl0mjoeqhxvgeeeq5piwpd3i` (`user_id`),
  CONSTRAINT `FKcpl0mjoeqhxvgeeeq5piwpd3i` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKgyqbmqrism0pkm2fuesc66ajp` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`id`),
  CONSTRAINT `FKmkrv9w47ou5o1kcmtsej5xxvd` FOREIGN KEY (`delivery_method_id`) REFERENCES `delivery_method` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table ecommerce.orders
CREATE TABLE IF NOT EXISTS `orders` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_date` date DEFAULT NULL,
  `shipping_address` varchar(512) DEFAULT NULL,
  `shipping_date` date DEFAULT NULL,
  `shipping_fee` double NOT NULL,
  `status` varchar(255) DEFAULT NULL,
  `delivery_method_id` bigint(20) DEFAULT NULL,
  `payment_method_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKq2m2xkvrir0eftwpixx46v9l5` (`delivery_method_id`),
  KEY `FKgeqwl6x0iadp9e2459uh3o8fv` (`payment_method_id`),
  KEY `FKel9kyl84ego2otj2accfd8mr7` (`user_id`),
  CONSTRAINT `FKel9kyl84ego2otj2accfd8mr7` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKgeqwl6x0iadp9e2459uh3o8fv` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`id`),
  CONSTRAINT `FKq2m2xkvrir0eftwpixx46v9l5` FOREIGN KEY (`delivery_method_id`) REFERENCES `delivery_method` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table ecommerce.order_detail
CREATE TABLE IF NOT EXISTS `order_detail` (
  `order_detail_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) NOT NULL,
  `sale_price` double NOT NULL,
  `order_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  PRIMARY KEY (`order_detail_id`),
  KEY `FKb8bg2bkty0oksa3wiq5mp5qnc` (`product_id`),
  KEY `FKlb8mofup9mi791hraxt9wlj5u` (`order_id`),
  CONSTRAINT `FKb8bg2bkty0oksa3wiq5mp5qnc` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FKlb8mofup9mi791hraxt9wlj5u` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`),
  CONSTRAINT `FKrws2q0si6oyd6il8gqe2aennc` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table ecommerce.payment_method
CREATE TABLE IF NOT EXISTS `payment_method` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `fee` double NOT NULL,
  `is_active` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table ecommerce.product
CREATE TABLE IF NOT EXISTS `product` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `avg_rating` double NOT NULL,
  `description` varchar(1024) DEFAULT NULL,
  `name` varchar(256) DEFAULT NULL,
  `price` double NOT NULL,
  `quantity` int(11) NOT NULL,
  `weight` varchar(255) DEFAULT NULL,
  `category_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK1mtsbur82frn64de7balymq9s` (`category_id`),
  CONSTRAINT `FK1mtsbur82frn64de7balymq9s` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table ecommerce.review
CREATE TABLE IF NOT EXISTS `review` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `comment` varchar(255) DEFAULT NULL,
  `rating` float NOT NULL,
  `review_date` date DEFAULT NULL,
  `product_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKiyof1sindb9qiqr9o8npj8klt` (`product_id`),
  KEY `FKiyf57dy48lyiftdrf7y87rnxi` (`user_id`),
  CONSTRAINT `FKiyf57dy48lyiftdrf7y87rnxi` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKiyof1sindb9qiqr9o8npj8klt` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table ecommerce.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `activation_code` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `avatar` longtext DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `enabled` bit(1) NOT NULL,
  `full_name` varchar(255) DEFAULT NULL,
  `gender` varchar(255) DEFAULT NULL,
  `password` varchar(512) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

-- Dumping structure for table ecommerce.wish_list
CREATE TABLE IF NOT EXISTS `wish_list` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `added_date` date DEFAULT NULL,
  `is_purchase` bit(1) NOT NULL,
  `name` varchar(256) DEFAULT NULL,
  `product_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKqn4e0ta2823kynefeg4jektp0` (`product_id`),
  KEY `FK8462y9kc76hpxuom1ui7dvp7k` (`user_id`),
  CONSTRAINT `FK8462y9kc76hpxuom1ui7dvp7k` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKqn4e0ta2823kynefeg4jektp0` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Data exporting was unselected.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;


-- Thêm dữ liệu mẫu cho bảng `category`
INSERT INTO `category` (`id`, `description`, `name`) VALUES
(1, 'Thức ăn khô cho chó', 'Dog Dry Food'),
(2, 'Thức ăn ướt cho chó', 'Dog Wet Food'),
(3, 'Thức ăn khô cho mèo', 'Cat Dry Food'),
(4, 'Thức ăn ướt cho mèo', 'Cat Wet Food'),

-- Dữ liệu cho bảng user
INSERT INTO `user` (`id`, `activation_code`, `address`, `avatar`, `email`, `enabled`, `full_name`, `gender`, `password`, `phone`, `username`)
VALUES
(1, NULL, '123 Pet Street', NULL, 'john.doe@example.com', 1, 'John Doe', 'Male', 'hashed_password1', '123456789', 'johndoe'),
(2, NULL, '456 Cat Alley', NULL, 'jane.smith@example.com', 1, 'Jane Smith', 'Female', 'hashed_password2', '987654321', 'janesmith'),
(3, NULL, '789 Dog Avenue', NULL, 'petlover@example.com', 1, 'Pet Lover', 'Other', 'hashed_password3', '112233445', 'petlover');

-- Thêm dữ liệu mẫu cho bảng `product`
INSERT INTO `product` (`id`, `avg_rating`, `description`, `name`, `price`, `quantity`, `weight`, `category_id`) VALUES
(1, 4.5, 'Thức ăn khô cao cấp cho chó giống lớn', 'Premium Large Dog Dry Food', 150000, 50, '5kg', 1),
(2, 4.2, 'Thức ăn ướt giàu dinh dưỡng cho chó', 'Nutritious Wet Dog Food', 120000, 30, '2kg', 2),
(3, 4.8, 'Thức ăn khô giòn tan cho mèo', 'Crunchy Cat Dry Food', 100000, 70, '3kg', 3),
(4, 4.7, 'Thức ăn ướt vị cá hồi cho mèo', 'Salmon Wet Cat Food', 130000, 40, '1.5kg', 4),
(5, 4.6, 'Thức ăn siêu cấp cho mèo', 'Fashionable Pet Collar and Leash Set', 250000, 20, '0.5kg', 3),
(6, 4.3, 'Thức ăn khô năng lượng cao cho chó', 'High Energy Dog Dry Food', 140000, 60, '4kg', 1),
(7, 4.9, 'Thức ăn ướt hỗn hợp vị gà và gan', 'Chicken and Liver Wet Food', 110000, 35, '2kg', 2),
(8, 4.4, 'Thức ăn khô vị hải sản cho mèo', 'Seafood Flavor Cat Dry Food', 105000, 80, '3kg', 3);

-- Thêm dữ liệu mẫu cho bảng `image`
INSERT INTO `image` (`id`, `image_uri`, `name`, `product_id`) VALUES
(1, '/images/dog_dry_food_large.jpg', 'Dog Dry Food Large', 1),
(2, '/images/dog_wet_food_nutritious.jpg', 'Dog Wet Food Nutritious', 2),
(3, '/images/cat_dry_food_crunchy.jpg', 'Cat Dry Food Crunchy', 3),
(4, '/images/cat_wet_food_salmon.jpg', 'Cat Wet Food Salmon', 4),
(5, '/images/pet_accessories_collar.jpg', 'Pet Accessories Collar', 5),
(6, '/images/dog_dry_food_energy.jpg', 'Dog Dry Food Energy', 6),
(7, '/images/dog_wet_food_chicken_liver.jpg', 'Dog Wet Food Chicken Liver', 7),
(8, '/images/cat_dry_food_seafood.jpg', 'Cat Dry Food Seafood', 8),
(9, '/images/dog_accessory_toy.jpg', 'Dog Toy', 5),
(10, '/images/cat_accessory_toy.jpg', 'Cat Toy', 5);

-- Thêm dữ liệu mẫu cho bảng `review`
INSERT INTO `review` (`id`, `comment`, `rating`, `review_date`, `product_id`, `user_id`) VALUES
(1, 'Thức ăn rất chất lượng, chó nhà tôi thích ăn lắm!', 5.0, '2024-11-01', 1, 1),
(2, 'Hương vị ngon, mèo nhà tôi rất thích.', 4.8, '2024-11-02', 3, 2),
(3, 'Vòng cổ đẹp, thiết kế rất thời trang.', 4.9, '2024-11-03', 5, 3),
(4, 'Thức ăn ướt dễ tiêu hóa và thơm ngon.', 4.7, '2024-11-04', 2, 2),
(5, 'Chất lượng tốt, giá hợp lý.', 4.6, '2024-11-05', 6, 3);

-- Thêm dữ liệu mẫu cho bảng `delivery_method`
INSERT INTO `delivery_method` (`id`, `description`, `fee`, `is_active`, `name`) VALUES
(1, 'Giao hàng nhanh trong 1 ngày', 30000, 1, 'Fast Delivery'),
(2, 'Giao hàng tiêu chuẩn', 15000, 1, 'Standard Delivery'),
(3, 'Giao hàng miễn phí cho đơn trên 500k', 0, 1, 'Free Delivery');

-- Dữ liệu cho bảng payment_method
INSERT INTO `payment_method` (`id`, `description`, `fee`, `is_active`, `name`)
VALUES
(1, 'Thanh toán bằng thẻ tín dụng', 0.0, 1, 'Credit Card'),
(2, 'Thanh toán khi nhận hàng (COD)', 0.0, 1, 'Cash on Delivery');

-- Dữ liệu cho bảng order
INSERT INTO `order` (`id`, `created_date`, `shipping_address`, `shipping_date`, `shipping_fee`, `status`, `delivery_method_id`, `payment_method_id`, `user_id`)
VALUES
(1, '2024-11-15', '123 Pet Street', '2024-11-17', 5.0, 'Delivered', 1, 1, 1),
(2, '2024-11-16', '456 Cat Alley', '2024-11-18', 10.0, 'Processing', 2, 2, 2);

-- Dữ liệu cho bảng order_detail
INSERT INTO `order_detail` (`order_detail_id`, `quantity`, `sale_price`, `order_id`, `product_id`)
VALUES
(1, 2, 60.0, 1, 1),
(2, 1, 25.0, 2, 2);

-- Dữ liệu cho bảng wish_list
INSERT INTO `wish_list` (`id`, `added_date`, `is_purchase`, `name`, `product_id`, `user_id`)
VALUES
(1, '2024-11-10', 0, 'My Wishlist', 3, 3);