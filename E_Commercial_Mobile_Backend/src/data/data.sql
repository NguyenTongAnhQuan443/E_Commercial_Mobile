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
DROP DATABASE IF EXISTS `ecommerce`;
CREATE DATABASE IF NOT EXISTS `ecommerce` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `ecommerce`;

-- Dumping structure for table ecommerce.category
CREATE TABLE IF NOT EXISTS `category` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(256) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ecommerce.category: ~4 rows (approximately)
DELETE FROM `category`;
INSERT INTO `category` (`id`, `description`, `name`, `image`) VALUES
	(1, 'Thức ăn khô cho chó', 'Dog Dry Food', 'https://petsegypt.com/web/image/611385-29ae7c11/Holistic%20Dry%20food.webp'),
	(2, 'Thức ăn ướt cho chó', 'Dog Wet Food', 'https://petsegypt.com/web/image/610372-c3ba9627/royal-canin-hunde-nassfutter-mature-8-195g-1200x1200.webp'),
	(3, 'Thức ăn khô cho mèo', 'Cat Dry Food', 'https://petsegypt.com/web/image/610375-a2ccf457/Holistic%20Dry%20food.webp'),
	(4, 'Thức ăn ướt cho mèo', 'Cat Wet Food', 'https://petsegypt.com/web/image/610376-4a72a7fb/lojakoala_royal_canin_babycat_instinctive_195gjpg_PASZU26XLXB5HZC_20151001100021.webp');

-- Dumping structure for table ecommerce.delivery_method
CREATE TABLE IF NOT EXISTS `delivery_method` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `fee` double NOT NULL,
  `is_active` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ecommerce.delivery_method: ~3 rows (approximately)
DELETE FROM `delivery_method`;
INSERT INTO `delivery_method` (`id`, `description`, `fee`, `is_active`, `name`) VALUES
	(1, 'Giao hàng nhanh trong 1 ngày', 50000, b'1', 'Express Delivery'),
	(2, 'Giao hàng tiêu chuẩn', 20000, b'1', 'Standard Delivery'),
	(3, 'Giao hàng miễn phí cho đơn trên 500k', 0, b'0', 'Free Delivery');

-- Dumping structure for table ecommerce.image
CREATE TABLE IF NOT EXISTS `image` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `image_uri` varchar(256) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `product_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKgpextbyee3uk9u6o2381m7ft1` (`product_id`),
  CONSTRAINT `FKgpextbyee3uk9u6o2381m7ft1` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ecommerce.image: ~10 rows (approximately)
DELETE FROM `image`;
INSERT INTO `image` (`id`, `image_uri`, `name`, `product_id`) VALUES
	(1, 'https://i.ibb.co/QFjwxVn/Carniwel-with-Fresh-Chicken-Dry-Dog-Food-for-Large-Dog-Adult-1.webp', 'Dog Dry Food Large', 1),
	(2, 'https://i.ibb.co/0ZLzBHp/71-A4-EYPYc-L.jpg', 'Dog Wet Food Nutritious', 2),
	(3, 'https://i.ibb.co/JKYcxLB/PU-Go-Cat-44062729-M-1.webp', 'Cat Dry Food Crunchy', 3),
	(4, 'https://i.ibb.co/3pC2Lt0/Felix-Cat-Wet-Food-Salmon-in-Jelly-85g-500x500.png', 'Cat Wet Food Salmon', 4),
	(5, 'https://i.ibb.co/3f0hdpv/76401-MAIN-AC-SL600-V1571346324.jpg', 'Pet Accessories Collar', 5),
	(6, 'https://m.media-amazon.com/images/I/81jnh769v4L.jpg', 'Dog Dry Food Energy', 6),
	(7, 'https://i5.walmartimages.com/asr/439b132f-7545-457e-bd3b-31315ef629f7.60927963aa3b46efd50f49e077c05da5.jpeg', 'Dog Wet Food Chicken Liver', 7),
	(8, 'https://m.media-amazon.com/images/I/81rjITzkAcL._AC_UF1000,1000_QL80_.jpg', 'Cat Dry Food Seafood', 8),
	(9, 'https://i.ibb.co/QFjwxVn/Carniwel-with-Fresh-Chicken-Dry-Dog-Food-for-Large-Dog-Adult-1.webp', 'Dog Toy', 5),
	(10, 'https://www.pedigree.com/sites/g/files/fnmzdf3076/files/migrate-product-files/images/zetfvv404nb8otnhreya.png', 'Cat Toy', 5);

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
  `promotion_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKmkrv9w47ou5o1kcmtsej5xxvd` (`delivery_method_id`),
  KEY `FKgyqbmqrism0pkm2fuesc66ajp` (`payment_method_id`),
  KEY `FKcpl0mjoeqhxvgeeeq5piwpd3i` (`user_id`),
  KEY `FKh776bwygioamxh2dryulqf2lx` (`promotion_id`),
  CONSTRAINT `FKcpl0mjoeqhxvgeeeq5piwpd3i` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FKgyqbmqrism0pkm2fuesc66ajp` FOREIGN KEY (`payment_method_id`) REFERENCES `payment_method` (`id`),
  CONSTRAINT `FKh776bwygioamxh2dryulqf2lx` FOREIGN KEY (`promotion_id`) REFERENCES `promotion` (`id`),
  CONSTRAINT `FKmkrv9w47ou5o1kcmtsej5xxvd` FOREIGN KEY (`delivery_method_id`) REFERENCES `delivery_method` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ecommerce.order: ~2 rows (approximately)
DELETE FROM `order`;
INSERT INTO `order` (`id`, `created_date`, `shipping_address`, `shipping_date`, `shipping_fee`, `status`, `delivery_method_id`, `payment_method_id`, `user_id`, `promotion_id`) VALUES
	(1, '2024-11-15', '123 Pet Street', '2024-11-17', 5, 'Delivered', 1, 1, 1, NULL),
	(2, '2024-11-16', '456 Cat Alley', '2024-11-18', 10, 'Processing', 2, 2, 2, NULL);

-- Dumping structure for table ecommerce.order_detail
CREATE TABLE IF NOT EXISTS `order_detail` (
  `order_detail_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `quantity` int(11) NOT NULL,
  `sale_price` double NOT NULL,
  `order_id` bigint(20) NOT NULL,
  `product_id` bigint(20) NOT NULL,
  PRIMARY KEY (`order_detail_id`),
  KEY `FKlb8mofup9mi791hraxt9wlj5u` (`order_id`),
  KEY `FKb8bg2bkty0oksa3wiq5mp5qnc` (`product_id`),
  CONSTRAINT `FKb8bg2bkty0oksa3wiq5mp5qnc` FOREIGN KEY (`product_id`) REFERENCES `product` (`id`),
  CONSTRAINT `FKlb8mofup9mi791hraxt9wlj5u` FOREIGN KEY (`order_id`) REFERENCES `order` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ecommerce.order_detail: ~2 rows (approximately)
DELETE FROM `order_detail`;
INSERT INTO `order_detail` (`quantity`, `sale_price`, `order_id`, `product_id`) VALUES
	(2, 60, 1, 1),
	(1, 25, 2, 2);

-- Dumping structure for table ecommerce.payment_method
CREATE TABLE IF NOT EXISTS `payment_method` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `description` varchar(255) DEFAULT NULL,
  `fee` double NOT NULL,
  `is_active` bit(1) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ecommerce.payment_method: ~2 rows (approximately)
DELETE FROM `payment_method`;
INSERT INTO `payment_method` (`id`, `description`, `fee`, `is_active`, `name`) VALUES
	(1, 'Thanh toán bằng thẻ tín dụng', 0, b'1', 'Credit Card'),
	(2, 'Thanh toán khi nhận hàng (COD)', 0, b'1', 'Cash on Delivery');

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
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ecommerce.product: ~8 rows (approximately)
DELETE FROM `product`;
INSERT INTO `product` (`id`, `avg_rating`, `description`, `name`, `price`, `quantity`, `weight`, `category_id`) VALUES
	(1, 4.5, 'Thức ăn khô cao cấp cho chó giống lớn', 'Premium Large Dog Dry Food', 150000, 50, '5kg', 1),
	(2, 4.2, 'Thức ăn ướt giàu dinh dưỡng cho chó', 'Nutritious Wet Dog Food', 120000, 30, '2kg', 2),
	(3, 4.8, 'Thức ăn khô giòn tan cho mèo', 'Crunchy Cat Dry Food', 100000, 70, '3kg', 3),
	(4, 4.7, 'Thức ăn ướt vị cá hồi cho mèo', 'Salmon Wet Cat Food', 130000, 40, '1.5kg', 4),
	(5, 4.6, 'Thức ăn siêu cấp cho mèo', 'Fashionable Pet Collar and Leash Set', 250000, 20, '0.5kg', 3),
	(6, 4.3, 'Thức ăn khô năng lượng cao cho chó', 'High Energy Dog Dry Food', 140000, 60, '4kg', 1),
	(7, 4.9, 'Thức ăn ướt hỗn hợp vị gà và gan', 'Chicken and Liver Wet Food', 110000, 35, '2kg', 2),
	(8, 4.4, 'Thức ăn khô vị hải sản cho mèo', 'Seafood Flavor Cat Dry Food', 105000, 80, '3kg', 3);

-- Dumping structure for table ecommerce.promotion
CREATE TABLE IF NOT EXISTS `promotion` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `active` bit(1) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `discount` int(11) NOT NULL,
  `end_date` date DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ecommerce.promotion: ~6 rows (approximately)
DELETE FROM `promotion`;
INSERT INTO `promotion` (`id`, `active`, `code`, `description`, `discount`, `end_date`, `start_date`) VALUES
	(2, b'1', 'DISCOUNT10', 'Giảm giá 10% cho tất cả đơn hàng', 10, '2024-12-31', '2024-11-01'),
	(3, b'1', 'FREESHIP', 'Miễn phí vận chuyển cho đơn hàng trên 500k', 0, '2024-11-30', '2024-11-01'),
	(4, b'1', 'NEWUSER20', 'Giảm 20% cho khách hàng mới', 20, '2025-01-01', '2024-11-01'),
	(5, b'1', 'BLACKFRIDAY', 'Giảm 30% dịp Black Friday', 30, '2024-11-25', '2024-11-24'),
	(6, b'1', 'XMAS25', 'Giảm 25% dịp Giáng Sinh', 25, '2024-12-26', '2024-12-20'),
	(7, b'0', 'SUMMER15', 'Giảm 15% dịp hè (đã hết hạn)', 15, '2024-06-30', '2024-06-01');

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ecommerce.review: ~5 rows (approximately)
DELETE FROM `review`;
INSERT INTO `review` (`id`, `comment`, `rating`, `review_date`, `product_id`, `user_id`) VALUES
	(1, 'Thức ăn rất chất lượng, chó nhà tôi thích ăn lắm!', 5, '2024-11-01', 1, 1),
	(2, 'Hương vị ngon, mèo nhà tôi rất thích.', 4.8, '2024-11-02', 3, 2),
	(3, 'Vòng cổ đẹp, thiết kế rất thời trang.', 4.9, '2024-11-03', 5, 3),
	(4, 'Thức ăn ướt dễ tiêu hóa và thơm ngon.', 4.7, '2024-11-04', 2, 2),
	(5, 'Chất lượng tốt, giá hợp lý.', 4.6, '2024-11-05', 6, 3);

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ecommerce.user: ~3 rows (approximately)
DELETE FROM `user`;
INSERT INTO `user` (`id`, `activation_code`, `address`, `avatar`, `email`, `enabled`, `full_name`, `gender`, `password`, `phone`, `username`) VALUES
	(1, NULL, '123 Pet Street', NULL, 'john.doe@example.com', b'1', 'John Doe', 'Male', 'hashed_password1', '123456789', 'johndoe'),
	(2, NULL, '456 Cat Alley', NULL, 'jane.smith@example.com', b'1', 'Jane Smith', 'Female', 'hashed_password2', '987654321', 'janesmith'),
	(3, NULL, '789 Dog Avenue', NULL, 'petlover@example.com', b'1', 'Pet Lover', 'Other', 'hashed_password3', '112233445', 'petlover');

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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Dumping data for table ecommerce.wish_list: ~1 rows (approximately)
DELETE FROM `wish_list`;
INSERT INTO `wish_list` (`id`, `added_date`, `is_purchase`, `name`, `product_id`, `user_id`) VALUES
	(1, '2024-11-10', b'0', 'My Wishlist', 3, 3);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
