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
INSERT INTO `user` (`id`, `activation_code`, `address`, `avatar`, `email`, `enabled`, `full_name`, `gender`, `password`, `phone`) VALUES
	(1, NULL, '123 Pet Street', NULL, 'john.doe@example.com', b'1', 'John Doe', 'Male', 'hashed_password1', '123456789'),
	(2, NULL, '456 Cat Alley', NULL, 'jane.smith@example.com', b'1', 'Jane Smith', 'Female', 'hashed_password2', '987654321'),
	(3, NULL, '789 Dog Avenue', NULL, 'petlover@example.com', b'1', 'Pet Lover', 'Other', 'hashed_password3', '112233445');

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
	
-- Add more data
INSERT INTO `user` (`id`, `address`, `email`, `enabled`, `full_name`, `gender`, `password`, `phone`) VALUES
(4, '101 Dog Lane', 'sarah.wilson@example.com', b'1', 'Sarah Wilson', 'Female', 'hashed_password4', '555000111'),
(5, '202 Cat Street', 'mike.brown@example.com', b'1', 'Mike Brown', 'Male', 'hashed_password5', '555000222'),
(6, '303 Pet Avenue', 'emily.davis@example.com', b'1', 'Emily Davis', 'Female', 'hashed_password6', '555000333'),
(7, '404 Animal Road', 'david.taylor@example.com', b'1', 'David Taylor', 'Male', 'hashed_password7', '555000444'),
(8, '505 Puppy Lane', 'lisa.martin@example.com', b'1', 'Lisa Martin', 'Female', 'hashed_password8', '555000555'),
(9, '606 Kitten Street', 'james.anderson@example.com', b'1', 'James Anderson', 'Male', 'hashed_password9', '555000666'),
(10, '707 Pet Park', 'emma.white@example.com', b'1', 'Emma White', 'Female', 'hashed_password10', '555000777'),
(11, '808 Pet Circle', 'robert.clark@example.com', b'1', 'Robert Clark', 'Male', 'hashed_password11', '555000888'),
(12, '909 Dog Circle', 'sophia.lee@example.com', b'1', 'Sophia Lee', 'Female', 'hashed_password12', '555000999'),
(13, '110 Cat Way', 'oliver.hall@example.com', b'1', 'Oliver Hall', 'Male', 'hashed_password13', '555001000'),
(14, '111 Animal Circle', 'ava.young@example.com', b'1', 'Ava Young', 'Female', 'hashed_password14', '555001111'),
(15, '112 Pet Plaza', 'william.king@example.com', b'1', 'William King', 'Male', 'hashed_password15', '555001222'),
(16, '113 Dog Square', 'mia.wright@example.com', b'1', 'Mia Wright', 'Female', 'hashed_password16', '555001333'),
(17, '114 Cat Corner', 'alexander.lopez@example.com', b'1', 'Alexander Lopez', 'Male', 'hashed_password17', '555001444'),
(18, '115 Pet Haven', 'charlotte.hill@example.com', b'1', 'Charlotte Hill', 'Female', 'hashed_password18', '555001555'),
(19, '116 Animal Haven', 'daniel.scott@example.com', b'1', 'Daniel Scott', 'Male', 'hashed_password19', '555001666'),
(20, '117 Pet Paradise', 'sofia.green@example.com', b'1', 'Sofia Green', 'Female', 'hashed_password20', '555001777');

-- Add more products
INSERT INTO `product` (`id`, `avg_rating`, `description`, `name`, `price`, `quantity`, `weight`, `category_id`) VALUES
(9, 4.6, 'Thức ăn khô cao cấp cho chó già', 'Senior Dog Premium Dry Food', 160000, 45, '4kg', 1),
(10, 4.3, 'Thức ăn khô cho chó con', 'Puppy Growth Formula Dry Food', 170000, 55, '3kg', 1),
(11, 4.7, 'Thức ăn ướt hỗn hợp thịt bò cho chó', 'Beef Feast Wet Dog Food', 125000, 40, '2kg', 2),
(12, 4.4, 'Thức ăn ướt vị cá ngừ cho chó', 'Tuna Delight Wet Dog Food', 115000, 35, '2kg', 2),
(13, 4.8, 'Thức ăn khô cho mèo già', 'Senior Cat Dry Food', 145000, 50, '3kg', 3),
(14, 4.5, 'Thức ăn khô cho mèo con', 'Kitten Growth Formula', 155000, 60, '2kg', 3),
(15, 4.6, 'Thức ăn ướt vị cá thu cho mèo', 'Mackerel Feast Cat Food', 135000, 45, '1.5kg', 4),
(16, 4.7, 'Thức ăn ướt vị thịt gà cho mèo', 'Chicken Delight Cat Food', 140000, 40, '1.5kg', 4),
(17, 4.5, 'Thức ăn khô cho chó nhỏ giống', 'Small Breed Adult Dog Food', 180000, 40, '2.5kg', 1),
(18, 4.6, 'Thức ăn khô cho chó có vấn đề về da', 'Skin Care Dog Food', 190000, 35, '3kg', 1),
(19, 4.7, 'Thức ăn khô cho chó giảm cân', 'Weight Control Dog Food', 175000, 45, '3kg', 1),
(20, 4.4, 'Thức ăn ướt vị gà và rau củ cho chó', 'Chicken & Vegetables Wet Dog Food', 130000, 50, '2kg', 2),
(21, 4.8, 'Thức ăn ướt vị cá hồi cho chó', 'Salmon Delight Wet Dog Food', 140000, 40, '2kg', 2),
(22, 4.6, 'Thức ăn khô cho mèo sterilised', 'Sterilised Cat Dry Food', 165000, 55, '3kg', 3),
(23, 4.7, 'Thức ăn khô cho mèo hairball control', 'Hairball Control Cat Food', 170000, 45, '3kg', 3),
(24, 4.5, 'Thức ăn ướt vị cá ngừ và tôm cho mèo', 'Tuna & Shrimp Cat Food', 145000, 50, '1.5kg', 4);


-- Add product images
INSERT INTO `image` (`image_uri`, `name`, `product_id`) VALUES
('https://m.media-amazon.com/images/I/71pU2e3cx8L._AC_UF1000,1000_QL80_.jpg', 'Senior Dog Food Image', 9),
('https://m.media-amazon.com/images/I/81o1iYyjrVL._AC_UF1000,1000_QL80_.jpg', 'Puppy Food Image', 10),
('https://m.media-amazon.com/images/I/81PuApdK0SL.jpg', 'Beef Dog Food Image', 11),
('https://m.media-amazon.com/images/I/51w813JdB8L._AC_UF1000,1000_QL80_.jpg', 'Tuna Dog Food Image', 12),
('https://m.media-amazon.com/images/I/81UrFlG-PxL._AC_UF1000,1000_QL80_.jpg', 'Senior Cat Food Image', 13),
('https://m.media-amazon.com/images/I/81eES5QW0mL.jpg', 'Kitten Food Image', 14),
('https://m.media-amazon.com/images/I/91XQ-6O-mRS.jpg', 'Mackerel Cat Food Image', 15),
('https://m.media-amazon.com/images/I/81538w5RpCL._AC_UF1000,1000_QL80_.jpg', 'Chicken Cat Food Image', 16),
('https://m.media-amazon.com/images/I/81535-Zp7xL._AC_UF894,1000_QL80_.jpg', 'Small Breed Dog Food Image', 17),
('https://m.media-amazon.com/images/I/71azz3BRCpL._AC_UF1000,1000_QL80_.jpg', 'Skin Care Dog Food Image', 18),
('https://m.media-amazon.com/images/I/71PjBC2aV5L._AC_UF1000,1000_QL80_.jpg', 'Weight Control Dog Food Image', 19),
('https://m.media-amazon.com/images/I/81xNytQXo6S._AC_SX679_.jpg', 'Chicken & Vegetables Dog Food Image', 20),
('https://m.media-amazon.com/images/I/81AGiRGQaPL.jpg', 'Salmon Dog Food Image', 21),
('https://m.media-amazon.com/images/I/51Fwd7L55QL._AC_UF894,1000_QL80_.jpg', 'Sterilised Cat Food Image', 22),
('https://m.media-amazon.com/images/I/81i0Gi+B4ZL._AC_UF1000,1000_QL80_.jpg', 'Hairball Control Cat Food Image', 23),
('https://m.media-amazon.com/images/I/81AbDiKEABL._AC_UF1000,1000_QL80_.jpg', 'Tuna & Shrimp Cat Food Image', 24);

-- Add more reviews (với nhiều ratings khác nhau để tạo diversity)
INSERT INTO `review` (`comment`, `rating`, `review_date`, `product_id`, `user_id`) VALUES
('Thức ăn rất tốt cho chó già của tôi', 4.5, '2024-10-15', 9, 4),
('Chó con nhà tôi rất thích loại này', 5.0, '2024-10-16', 10, 5),
('Khá ngon nhưng hơi đắt', 3.5, '2024-10-17', 11, 6),
('Chất lượng tuyệt vời', 4.8, '2024-10-18', 12, 7),
('Mèo già nhà tôi rất thích', 4.7, '2024-10-19', 13, 8),
('Mèo con ăn rất khỏe', 4.9, '2024-10-20', 14, 9),
('Giá cả hợp lý, chất lượng tốt', 4.6, '2024-10-21', 15, 10),
('Mèo nhà tôi không thích lắm', 3.0, '2024-10-22', 16, 4),
('Rất tốt cho sức khỏe thú cưng', 4.8, '2024-10-23', 9, 5),
('Đáng đồng tiền bát gạo', 4.7, '2024-10-24', 10, 6),
('Sẽ mua lại lần nữa', 4.5, '2024-10-25', 11, 7),
('Chất lượng không ổn định', 3.2, '2024-10-26', 12, 8),
('Rất hài lòng với sản phẩm', 4.9, '2024-10-27', 13, 9),
('Giá hơi cao nhưng xứng đáng', 4.4, '2024-10-28', 14, 10),
('Thú cưng rất thích', 4.6, '2024-10-29', 15, 4),
('Chó nhỏ của tôi rất thích loại này', 4.8, '2024-10-30', 17, 11),
('Cải thiện rõ rệt tình trạng da của chó', 4.7, '2024-10-31', 18, 12),
('Hiệu quả trong việc kiểm soát cân nặng', 4.5, '2024-11-01', 19, 13),
('Chó rất thích vị gà và rau củ', 4.6, '2024-11-02', 20, 14),
('Phù hợp với chó kén ăn', 4.3, '2024-11-03', 21, 15),
('Tốt cho mèo đã triệt sản', 4.9, '2024-11-04', 22, 16),
('Giảm rõ rệt tình trạng búi lông', 4.7, '2024-11-05', 23, 17),
('Mèo rất thích vị này', 4.8, '2024-11-06', 24, 18),
('Chất lượng tuyệt vời nhưng hơi đắt', 4.2, '2024-11-07', 17, 19),
('Đáng giá từng đồng', 4.6, '2024-11-08', 18, 20),
('Không hiệu quả lắm với chó nhà tôi', 3.5, '2024-11-09', 19, 11),
('Sản phẩm chất lượng cao', 4.8, '2024-11-10', 20, 12),
('Mèo nhà tôi không thích lắm', 3.8, '2024-11-11', 21, 13),
('Rất tốt cho sức khỏe mèo', 4.7, '2024-11-12', 22, 14),
('Giá hơi cao nhưng hiệu quả', 4.5, '2024-11-13', 23, 15),
('Thú cưng rất thích', 4.9, '2024-11-14', 24, 16),
('Sẽ mua lại', 4.6, '2024-11-15', 17, 17),
('Chất lượng ổn định', 4.7, '2024-11-16', 18, 18),
('Đóng gói cẩn thận', 4.8, '2024-11-17', 19, 19),
('Giao hàng nhanh, sản phẩm tốt', 4.5, '2024-11-18', 20, 20);

-- Add more orders
INSERT INTO `order` (`created_date`, `shipping_address`, `shipping_date`, `shipping_fee`, `status`, `delivery_method_id`, `payment_method_id`, `user_id`) VALUES
('2024-10-15', '101 Dog Lane', '2024-10-17', 20000, 'Delivered', 2, 1, 4),
('2024-10-16', '202 Cat Street', '2024-10-18', 50000, 'Delivered', 1, 2, 5),
('2024-10-17', '303 Pet Avenue', '2024-10-19', 20000, 'Delivered', 2, 1, 6),
('2024-10-18', '404 Animal Road', '2024-10-20', 50000, 'Delivered', 1, 2, 7),
('2024-10-19', '505 Puppy Lane', '2024-10-21', 20000, 'Delivered', 2, 1, 8),
('2024-10-20', '606 Kitten Street', '2024-10-22', 50000, 'Processing', 1, 2, 9),
('2024-10-21', '707 Pet Park', '2024-10-23', 20000, 'Processing', 2, 1, 10),
('2024-10-22', '808 Pet Circle', '2024-10-24', 50000, 'Delivered', 1, 1, 11),
('2024-10-23', '909 Dog Circle', '2024-10-25', 20000, 'Delivered', 2, 2, 12),
('2024-10-24', '110 Cat Way', '2024-10-26', 50000, 'Delivered', 1, 1, 13),
('2024-10-25', '111 Animal Circle', '2024-10-27', 20000, 'Processing', 2, 2, 14),
('2024-10-26', '112 Pet Plaza', '2024-10-28', 50000, 'Processing', 1, 1, 15),
('2024-10-27', '113 Dog Square', '2024-10-29', 20000, 'Delivered', 2, 2, 16),
('2024-10-28', '114 Cat Corner', '2024-10-30', 50000, 'Processing', 1, 1, 17),
('2024-10-29', '115 Pet Haven', '2024-10-31', 20000, 'Delivered', 2, 2, 18),
('2024-10-30', '116 Animal Haven', '2024-11-01', 50000, 'Processing', 1, 1, 19),
('2024-10-31', '117 Pet Paradise', '2024-11-02', 20000, 'Delivered', 2, 2, 20);

-- Add order details
INSERT INTO `order_detail` (`quantity`, `sale_price`, `order_id`, `product_id`) VALUES
(2, 160000, 1, 9),
(1, 170000, 1, 10),
(3, 125000, 2, 11),
(2, 115000, 2, 12),
(1, 145000, 3, 13),
(2, 155000, 3, 14),
(3, 135000, 4, 15),
(1, 140000, 4, 16),
(2, 160000, 5, 9),
(1, 170000, 5, 10),
(2, 125000, 6, 11),
(3, 115000, 6, 12),
(1, 145000, 7, 13),
(2, 180000, 8, 17),
(1, 190000, 8, 18),
(3, 175000, 9, 19),
(2, 130000, 9, 20),
(1, 140000, 10, 21),
(2, 165000, 10, 22),
(3, 170000, 11, 23),
(1, 145000, 11, 24),
(2, 180000, 12, 17),
(1, 190000, 12, 18),
(2, 175000, 13, 19),
(3, 130000, 13, 20),
(1, 140000, 14, 21),
(2, 165000, 14, 22),
(3, 170000, 15, 23),
(1, 145000, 15, 24),
(2, 180000, 16, 17),
(1, 190000, 16, 18),
(2, 175000, 17, 19),
(3, 130000, 17, 20);

-- Add more wishlist items
INSERT INTO `wish_list` (`added_date`, `is_purchase`, `name`, `product_id`, `user_id`) VALUES
('2024-10-15', b'0', 'Pet Food Wishlist', 9, 4),
('2024-10-16', b'0', 'Dog Food Collection', 10, 5),
('2024-10-17', b'0', 'Cat Food Favorites', 13, 6),
('2024-10-18', b'0', 'Future Purchases', 14, 7),
('2024-10-19', b'0', 'Gift Ideas', 15, 8),
('2024-10-20', b'0', 'Favorite Products', 16, 9),
('2024-10-21', b'0', 'Shopping List', 11, 10),
('2024-10-22', b'0', 'Favorite Dog Food', 17, 11),
('2024-10-23', b'0', 'Must Buy List', 18, 12),
('2024-10-24', b'0', 'Cat Products', 22, 13),
('2024-10-25', b'0', 'Pet Food Collection', 23, 14),
('2024-10-26', b'0', 'Monthly Supplies', 19, 15),
('2024-10-27', b'0', 'Special Items', 20, 16),
('2024-10-28', b'0', 'Premium Products', 21, 17),
('2024-10-29', b'0', 'Regular Purchases', 24, 18),
('2024-10-30', b'0', 'Shopping List', 17, 19),
('2024-10-31', b'0', 'Favorites', 18, 20);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
