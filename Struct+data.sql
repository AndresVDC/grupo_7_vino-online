-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: mydb
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.17-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cartdetails`
--

DROP TABLE IF EXISTS `cartdetails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cartdetails` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `productQuantity` tinyint(255) unsigned NOT NULL,
  `productId` bigint(20) unsigned NOT NULL,
  `productPrice` decimal(7,2) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp(),
  `deletedAt` datetime DEFAULT NULL,
  `cartId` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `productId_idx` (`productId`),
  KEY `cartId_idx` (`cartId`),
  CONSTRAINT `cartId` FOREIGN KEY (`cartId`) REFERENCES `carts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `productId` FOREIGN KEY (`productId`) REFERENCES `products` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartdetails`
--

LOCK TABLES `cartdetails` WRITE;
/*!40000 ALTER TABLE `cartdetails` DISABLE KEYS */;
INSERT INTO `cartdetails` VALUES (60,1,4,28899.15,'2021-04-16 14:36:58','2021-04-16 14:36:58',NULL,8),(61,1,7,198.90,'2021-04-16 14:37:11','2021-04-16 14:37:11',NULL,8);
/*!40000 ALTER TABLE `cartdetails` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `carts`
--

DROP TABLE IF EXISTS `carts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `carts` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `quantityOfProducts` tinyint(255) unsigned NOT NULL,
  `totalPrice` decimal(7,2) unsigned NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (3,0,0.00,'2021-03-03 23:13:45','2021-03-03 23:13:45',NULL),(4,0,0.00,'2021-03-03 23:15:24','2021-03-03 23:15:24',NULL),(5,0,0.00,'2021-03-03 23:18:44','2021-03-03 23:18:44',NULL),(6,0,0.00,'2021-03-03 23:24:32','2021-03-03 23:24:32',NULL),(7,0,0.00,'2021-03-03 23:25:50','2021-03-07 12:41:38',NULL),(8,2,28899.15,'2021-03-07 12:44:24','2021-04-16 14:37:11',NULL),(9,0,0.00,'2021-04-06 00:04:42','2021-04-06 00:04:42',NULL),(10,0,0.00,'2021-04-06 00:05:18','2021-04-06 00:05:18',NULL);
/*!40000 ALTER TABLE `carts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `paymentmethods`
--

DROP TABLE IF EXISTS `paymentmethods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `paymentmethods` (
  `id` tinyint(255) unsigned NOT NULL,
  `name` varchar(100) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `paymentmethods`
--

LOCK TABLES `paymentmethods` WRITE;
/*!40000 ALTER TABLE `paymentmethods` DISABLE KEYS */;
/*!40000 ALTER TABLE `paymentmethods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) NOT NULL,
  `score` tinyint(5) unsigned DEFAULT NULL,
  `price` decimal(7,2) unsigned DEFAULT NULL,
  `detail` varchar(512) NOT NULL,
  `image` varchar(150) DEFAULT NULL,
  `category` varchar(45) NOT NULL,
  `discount` tinyint(99) unsigned DEFAULT NULL,
  `presentation` varchar(100) CHARACTER SET big5 NOT NULL,
  `idVarietal` tinyint(200) unsigned NOT NULL,
  `idWinery` bigint(20) unsigned NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_idx` (`idVarietal`),
  KEY `idWinery_idx` (`idWinery`),
  CONSTRAINT `idVarietal` FOREIGN KEY (`idVarietal`) REFERENCES `varietals` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `idWinery` FOREIGN KEY (`idWinery`) REFERENCES `wineries` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=1034 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Angelica Zapata',4,2443.00,'Vino de la bodega Catena Zapata y es una prueba','/images/Makka_Gran_Corte.jpg','Tinto',10,'Caja de 6 unidades',1,1,'2021-01-31 19:32:53','2021-01-31 19:32:53','0000-00-00 00:00:00'),(3,'Vistalba Corte C',5,3999.00,'Vino de la bodega Vistalba. Juguemos a descubrir tanto los terruños como los métodos de vinificación.... Da la rienda suelta a tus sentidos, sé parte de descubrir la evolución en estructura, cuerpo, frutalidad de nuestras líneas jóvenes. Luego contanos por la redes como te fue explorando...','/images/Vistalba_CorteC.jpg','Tinto',5,'Undidad 1 Litro',1,1,'2021-02-01 08:42:23','2021-02-01 08:42:23','0000-00-00 00:00:00'),(4,'Cavas Don Nicasio Gran Res',4,33999.00,'Un gran vino complejo con gran cuerpo por su estancia de 14 a 16 meses en barricas de roble francés y americano de primer uso. Premiado a Nivel internacional. Una perla fuera de lo común para una ocasión especial.','/images/imagen-1609715636656.jpg','Tinto',15,'Caja 6 Unidades',1,2,'2021-02-01 08:50:04','2021-03-04 18:08:12','0000-00-00 00:00:00'),(7,' Gascon',2,234.00,'asdasd','/images/image-1612132747561.jpg','Blanco',15,'Unidad de 1 litro',1,3,'2021-01-31 22:39:07','2021-02-02 12:00:30','0000-00-00 00:00:00'),(8,' Gascon',1,500.00,'asdasd a','/images/image-1612135235267.jpg','Tinto',20,'Unidad de 1 litro',3,1,'2021-01-31 23:20:35','2021-02-01 19:34:09','0000-00-00 00:00:00'),(10,' Familia Bianchi',2,350.95,'adsas asde r ere r eeer e','/images/image-1612180596300.jpg','Blanco',0,'Unidad de 1 litro',3,1,'2021-02-01 11:56:36','2021-04-16 13:57:21','0000-00-00 00:00:00'),(1017,' Familia Bianchi',4,234.43,'rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr','/images/image-1615034268274.jpg','Tinto',20,'Unidad de 1 litro',1,6,'2021-03-06 12:37:48','2021-03-06 12:37:48',NULL),(1018,'Nicola Catena',5,9854.00,'Este vino proviene de una pequeña parcela en un viñedo de más de 80 años de antigüedad cuyos rendimientos en kilos de uva por planta son sumamente bajos, lográndose por ello una concentración y complejidad excepcionales. Aromas intensos de regaliz, especias verdes como orégano y tomillo y boca con gran volumen y persistencia.','/images/image-1617551772122.jpg','Tinto',10,'Unidad de 1 litro',4,1,'2021-04-04 15:56:12','2021-04-04 15:56:12',NULL),(1019,' Familia Bianchi',4,234.43,'sdfsdfsdfs fdsdfsdf sdf sdf sdfsfd sdf sdf sdfs dfsdfs dfs fsdfsdf','/images/image-1617565156838.jpg','Tinto',5,'Unidad de 1 litro',1,1,'2021-04-04 19:39:16','2021-04-04 19:39:16',NULL),(1020,'Nicola Catena',5,9804.00,'Este vino proviene de una pequeña parcela en un viñedo de más de 80 años de antigüedad cuyos rendimientos en kilos de uva por planta son sumamente bajos, lográndose por ello una concentración y complejidad excepcionales. Aromas intensos de regaliz, especias verdes como orégano y tomillo y boca con gran volumen y persistencia.','/images/image-1617566292314.jpg','Tinto',10,'Unidad de 1 litro',4,1,'2021-04-04 19:58:12','2021-04-04 19:58:12',NULL),(1021,'Divine H Triple Sec',4,2244.00,'Licor Citrico premiado entre los mejores del mundo Destillata 2018.','/images/image-1618441764646.jpg','Espirituoso',15,'Unidad de 1 litro',4,5,'2021-04-14 23:09:24','2021-04-14 23:09:24',NULL),(1022,'Divine H Triple Sec2',4,2244.00,'123123123123123123c123123 123123 123 123 ','/images/image-1618444208025.jpg','Espirituoso',10,'Unidad de 1 litro',2,4,'2021-04-14 23:50:08','2021-04-14 23:50:08',NULL),(1023,' Familia Bianchi',4,350.95,'sadasdasdasdasdsadasdasdasdasdsadasdasdasdasdsadasdasdasdasdsadasdasdasdasdsadasdasdasdasd','/images/image-1618577356545.jpg','Blanco',20,'Unidad de 1 litro',1,1,'2021-04-16 12:49:16','2021-04-16 13:56:46',NULL),(1024,'Divine H Triple Sec',4,2244.00,'egfgdfgdfgdfgdfg dfgdfg dfg dfg dfgdfg dfgdfg er gerg erg te ','/images/image-1618578509458.jpg','Espirituoso',10,'Unidad de 1 litro',3,7,'2021-04-16 13:08:29','2021-04-16 13:08:29',NULL),(1025,'Hilbing Malbec Gin',3,1670.00,'El unico Gin con el espíritu de Malbec en el mundo. .','/images/image-1618581547865.jpg','Espirituoso',10,'Unidad de 1 litro',4,7,'2021-04-16 13:59:07','2021-04-16 13:59:07',NULL),(1026,'Aniapa Grappa Blend',4,1920.00,'Entre las mejores grappas del mundo año 2011.','/images/image-1618581609126.jpg','Espirituoso',10,'Unidad de 1 litro',2,8,'2021-04-16 14:00:09','2021-04-16 14:00:09',NULL),(1027,'Combo Titan',3,2240.00,'adsasd asda sdas dasd asd asdasdasdasda sd as dasdasdasd','/images/image-1618581692270.jpg','Blanco',10,'Caja de 6 unidades',4,3,'2021-04-16 14:01:32','2021-04-16 14:01:32',NULL),(1029,'Cruzat Pet Nat',4,12500.00,'Frizante natural Chardonnay, elaborado con método ancestral y mínima intervención lo que le permite mantener la ligera turbidez natural.','/images/image-1618581837181.jpg','Espumante',10,'Caja de 6 unidades',4,4,'2021-04-16 14:03:57','2021-04-16 14:03:57',NULL),(1030,'Cruzat Cuveé',3,8280.00,'Edición Especial de Cuveé Brut corte 70% Pinot Noir, 30% Chardonnay. Método tradicional de fermentación en botella. 24 meses de tiempo en borras.','/images/image-1618581906751.png','Espumante',10,'Caja de 6 unidades',1,5,'2021-04-16 14:05:06','2021-04-16 14:05:06',NULL),(1031,'Las Perdices Extra',4,3780.00,'Vino Espumante Método Champenoise.','/images/image-1618582015490.jpg','Espumante',10,'Caja de 6 unidades',4,7,'2021-04-16 14:06:55','2021-04-16 14:06:55',NULL),(1032,'Cheers My Dear!',4,1770.00,'Cheers My Dear!\r\nDirecto de Viña Las Perdices\r\nCheers my dear!','/images/image-1618582079801.jpg','Espumante',10,'Caja de 3 unidades',1,8,'2021-04-16 14:07:59','2021-04-16 14:07:59',NULL);
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `useraddresses`
--

DROP TABLE IF EXISTS `useraddresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `useraddresses` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `street` varchar(200) NOT NULL,
  `number` varchar(200) NOT NULL,
  `floor` tinyint(255) DEFAULT NULL,
  `department` varchar(45) DEFAULT NULL,
  `postalCode` varchar(45) DEFAULT NULL,
  `city` varchar(150) DEFAULT NULL,
  `province` varchar(150) DEFAULT NULL,
  `idUser` bigint(20) unsigned DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idUser_idx` (`idUser`),
  CONSTRAINT `idUser` FOREIGN KEY (`idUser`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `useraddresses`
--

LOCK TABLES `useraddresses` WRITE;
/*!40000 ALTER TABLE `useraddresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `useraddresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userpaymentmethods`
--

DROP TABLE IF EXISTS `userpaymentmethods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `userpaymentmethods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `paymentMethodId` tinyint(255) unsigned NOT NULL,
  `userId` bigint(20) unsigned NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId_idx` (`userId`),
  KEY `paymentMethodId_idx` (`paymentMethodId`),
  CONSTRAINT `paymentMethodId` FOREIGN KEY (`paymentMethodId`) REFERENCES `paymentmethods` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `userId1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userpaymentmethods`
--

LOCK TABLES `userpaymentmethods` WRITE;
/*!40000 ALTER TABLE `userpaymentmethods` DISABLE KEYS */;
/*!40000 ALTER TABLE `userpaymentmethods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(150) NOT NULL,
  `lastName` varchar(150) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `avatar` varchar(200) DEFAULT NULL,
  `category` varchar(45) NOT NULL DEFAULT 'user',
  `identityDocument` varchar(200) NOT NULL,
  `idCart` bigint(20) unsigned NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cartId_idx` (`idCart`),
  CONSTRAINT `idCart` FOREIGN KEY (`idCart`) REFERENCES `carts` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'admin','admin','admin@admin.com','$2a$10$Sb7GLEqu7poCAFKdO8rA8eHYRbIcI23mrwAlHriUBJqu0rireoRVK','avatar-default.png','Administrador','',7,'2021-03-03 23:25:50','2021-03-03 23:25:50',NULL),(4,'Emiliano','Rosico','emiliano19@gmail.com','$2a$10$CgqwOKbPBlhv7yUIHgi81u7bJ.MYLP53Vb6efkUijkFUK2s/Qs7Ke','avatar-default.png','Administrador','',8,'2021-03-07 12:44:24','2021-03-20 14:05:28',NULL),(5,'asd','asd','asd@asd.com','$2a$10$yJcdPWSjx/utCHDPD1d.eeSCfMHl54X.RiRQU12WLYsm8SR3vtIHW','avatar-default.png','Administrador','1',10,'2021-04-06 00:05:18','2021-04-06 00:05:18',NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `varietals`
--

DROP TABLE IF EXISTS `varietals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `varietals` (
  `id` tinyint(200) unsigned NOT NULL,
  `varietal` varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `varietals`
--

LOCK TABLES `varietals` WRITE;
/*!40000 ALTER TABLE `varietals` DISABLE KEYS */;
INSERT INTO `varietals` VALUES (1,'Malbec'),(2,'Cabernet'),(3,'Cabernet Franc'),(4,'Bonarda');
/*!40000 ALTER TABLE `varietals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wineries`
--

DROP TABLE IF EXISTS `wineries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `wineries` (
  `id` bigint(20) unsigned NOT NULL,
  `name` varchar(150) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  `deletedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wineries`
--

LOCK TABLES `wineries` WRITE;
/*!40000 ALTER TABLE `wineries` DISABLE KEYS */;
INSERT INTO `wineries` VALUES (1,'Catena Zapata','2021-01-31 19:32:32','2021-01-31 19:32:32','0000-00-00 00:00:00'),(2,'El Enemigo','2021-01-31 19:32:32','2021-01-31 19:32:32',NULL),(3,'Luigi Bosca','2021-01-31 19:32:32','2021-01-31 19:32:32',NULL),(4,'Santa Ana','2021-01-31 19:32:32','2021-01-31 19:32:32',NULL),(5,'Gascon','2021-01-31 19:32:32','2021-01-31 19:32:32',NULL),(6,'La Rural','2021-01-31 19:32:32','2021-01-31 19:32:32',NULL),(7,'Norton','2021-01-31 19:32:32','2021-01-31 19:32:32',NULL),(8,'Trapiche','2021-01-31 19:32:32','2021-01-31 19:32:32',NULL);
/*!40000 ALTER TABLE `wineries` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-19 17:58:37
