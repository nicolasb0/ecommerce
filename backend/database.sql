DROP TABLE IF EXISTS `product`;

CREATE TABLE `product` (
  `id` int NOT NULL AUTO_INCREMENT,
  `sku` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `price` decimal(10,0) NOT NULL,
  `type` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=54 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


LOCK TABLES `product` WRITE;

INSERT INTO `product` VALUES (1,'SKU1','DVD1',10,1),(2,'SKU2','Furniture1',20,2),(3,'SKU3','Book1',30,3);

UNLOCK TABLES;

DROP TABLE IF EXISTS `book`;

CREATE TABLE `book` (
  `id` int NOT NULL,
  `weight` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `book_fk` FOREIGN KEY (`id`) REFERENCES `product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `book` WRITE;

INSERT INTO `book` VALUES (3,50);

UNLOCK TABLES;

DROP TABLE IF EXISTS `dvd`;

CREATE TABLE `dvd` (
  `id` int NOT NULL,
  `size` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `dvd_fk` FOREIGN KEY (`id`) REFERENCES `product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `dvd` WRITE;

INSERT INTO `dvd` VALUES (1,40);

UNLOCK TABLES;

DROP TABLE IF EXISTS `furniture`;

CREATE TABLE `furniture` (
  `id` int NOT NULL,
  `height` decimal(10,0) NOT NULL,
  `width` decimal(10,0) NOT NULL,
  `length` decimal(10,0) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `furniture_fk` FOREIGN KEY (`id`) REFERENCES `product` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

LOCK TABLES `furniture` WRITE;

INSERT INTO `furniture` VALUES (2,10,20,30);

UNLOCK TABLES;
