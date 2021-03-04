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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cartdetails`
--

LOCK TABLES `cartdetails` WRITE;
/*!40000 ALTER TABLE `cartdetails` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carts`
--

LOCK TABLES `carts` WRITE;
/*!40000 ALTER TABLE `carts` DISABLE KEYS */;
INSERT INTO `carts` VALUES (3,0,0.00,'2021-03-03 23:13:45','2021-03-03 23:13:45',NULL),(4,0,0.00,'2021-03-03 23:15:24','2021-03-03 23:15:24',NULL),(5,0,0.00,'2021-03-03 23:18:44','2021-03-03 23:18:44',NULL),(6,0,0.00,'2021-03-03 23:24:32','2021-03-03 23:24:32',NULL),(7,0,0.00,'2021-03-03 23:25:50','2021-03-03 23:25:50',NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=1017 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'Angelica Zapata',4,2443.00,'Vino de la bodega Catena Zapata y es una prueba','/images/Makka_Gran_Corte.jpg','Tinto',10,'Caja de 6 unidades',1,1,'2021-01-31 19:32:53','2021-01-31 19:32:53','0000-00-00 00:00:00'),(3,'Vistalba Corte C',5,3999.00,'Vino de la bodega Vistalba. Juguemos a descubrir tanto los terruños como los métodos de vinificación.... Da la rienda suelta a tus sentidos, sé parte de descubrir la evolución en estructura, cuerpo, frutalidad de nuestras líneas jóvenes. Luego contanos por la redes como te fue explorando...','/images/Vistalba_CorteC.jpg','Tinto',5,'Undidad 1 Litro',1,1,'2021-02-01 08:42:23','2021-02-01 08:42:23','0000-00-00 00:00:00'),(4,'Cavas Don Nicasio Gran Reserva Bonarda 2013',4,33999.00,'Un gran vino complejo con gran cuerpo por su estancia de 14 a 16 meses en barricas de roble francés y americano de primer uso. Premiado a Nivel internacional. Una perla fuera de lo común para una ocasión especial.','/images/imagen-1609715636656.jpg','Tinto',15,'Caja 6 Unidades',1,1,'2021-02-01 08:50:04','2021-02-01 08:50:04','0000-00-00 00:00:00'),(7,' Gascon',2,234.00,'asdasd','/images/image-1612132747561.jpg','Blanco',15,'Unidad de 1 litro',1,1,'2021-01-31 22:39:07','2021-02-02 12:00:30','0000-00-00 00:00:00'),(8,' Gascon',1,500.00,'asdasd a','/images/image-1612135235267.jpg','Tinto',20,'Unidad de 1 litro',3,1,'2021-01-31 23:20:35','2021-02-01 19:34:09','0000-00-00 00:00:00'),(10,' Familia Bianchi',2,350.95,'adsas asde r ere r eeer e','/images/image-1612180596300.jpg','Tinto',0,'Unidad de 1 litro',3,1,'2021-02-01 11:56:36','2021-02-01 11:56:36','0000-00-00 00:00:00'),(75,'Duck - Legs',3,8521.22,'lectus in quam fringilla rhoncus mauris enim leo rhoncus sed vestibulum sit amet cursus id turpis integer aliquet massa id','https://robohash.org/enimoditomnis.png?size=250x250&set=set1','Blanco',6,'Caja 6 unidades',4,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(117,'Apron',1,7418.21,'sollicitudin mi sit amet lobortis sapien sapien non mi integer','https://robohash.org/teneturexercitationemtempora.png?size=250x250&set=set1','Espirituoso',28,'Botella 1Lt',3,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(155,'Tomatoes - Cherry',2,8767.71,'metus arcu adipiscing molestie hendrerit at vulputate vitae nisl aenean lectus','https://robohash.org/aliquamrepellendusvoluptatem.png?size=250x250&set=set1','Espirituoso',15,'Botella 1Lt',4,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(229,'Container - Foam Dixie 12 Oz',3,2179.08,'sit amet consectetuer adipiscing elit proin interdum mauris non ligula pellentesque ultrices','https://robohash.org/quaeratautemipsa.bmp?size=250x250&set=set1','Espumante',22,'Botella 750cc',3,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(283,'Spice - Paprika',1,6423.68,'eget vulputate ut ultrices vel augue vestibulum ante ipsum primis in faucibus orci','https://robohash.org/recusandaeadipiscimagni.png?size=250x250&set=set1','Espumante',26,'Caja 6 unidades',1,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(306,'Cake - Dulce De Leche',2,1222.25,'mauris sit amet eros suspendisse accumsan tortor quis turpis sed ante','https://robohash.org/officiisrerumalias.png?size=250x250&set=set1','Espirituoso',26,'Caja 6 unidades',3,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(332,'Cups 10oz Trans',3,5548.12,'volutpat convallis morbi odio odio elementum eu interdum eu tincidunt in leo maecenas','https://robohash.org/laborumillumqui.bmp?size=250x250&set=set1','Espumante',12,'Botella 1Lt',1,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(365,'Cheese - Havarti, Roasted Garlic',3,7008.33,'vestibulum ante ipsum primis in faucibus orci luctus et ultrices','https://robohash.org/voluptatemlaboreculpa.bmp?size=250x250&set=set1','Espumante',38,'Caja 6 unidades',3,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(380,'Cake - Lemon Chiffon',5,1108.71,'bibendum imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris','https://robohash.org/velquisquamodio.jpg?size=250x250&set=set1','Espirituoso',24,'Botella 750cc',1,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(442,'Tomato - Peeled Italian Canned',5,3447.52,'elementum in hac habitasse platea dictumst morbi vestibulum velit id pretium iaculis','https://robohash.org/etoccaecaticorporis.bmp?size=250x250&set=set1','Blanco',3,'Botella 750cc',1,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(509,'Cheese - Brick With Pepper',2,3769.27,'accumsan tellus nisi eu orci mauris lacinia sapien quis libero nullam sit amet turpis elementum ligula vehicula','https://robohash.org/asperioresminimasunt.bmp?size=250x250&set=set1','Espumante',2,'Caja 6 unidades',4,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(558,'Strawberries',5,6264.67,'et ultrices posuere cubilia curae nulla dapibus dolor vel est donec odio justo','https://robohash.org/voluptatemreprehenderitdebitis.jpg?size=250x250&set=set1','Blanco',31,'Botella 1Lt',3,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(574,'Cleaner - Bleach',2,1793.82,'libero non mattis pulvinar nulla pede ullamcorper augue a suscipit nulla elit ac','https://robohash.org/aperiamnesciuntid.png?size=250x250&set=set1','Espumante',26,'Botella 1Lt',3,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(579,'Temperature Recording Station',3,8994.01,'nec sem duis aliquam convallis nunc proin at turpis a pede posuere nonummy integer non','https://robohash.org/delenitivoluptatibusfugit.jpg?size=250x250&set=set1','Espirituoso',3,'Botella 750cc',3,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(687,'Gelatine Leaves - Bulk',4,5066.40,'semper porta volutpat quam pede lobortis ligula sit amet eleifend pede libero quis orci nullam','https://robohash.org/quirecusandaequos.bmp?size=250x250&set=set1','Tinto',23,'Caja 6 unidades',2,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(734,'Nectarines',1,1458.04,'ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae donec pharetra magna vestibulum aliquet ultrices erat tortor','https://robohash.org/harumexpeditarerum.png?size=250x250&set=set1','Espumante',16,'Botella 1Lt',3,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(773,'Squid U5 - Thailand',5,8783.86,'a libero nam dui proin leo odio porttitor id consequat in consequat ut nulla','https://robohash.org/laboriosamutminima.bmp?size=250x250&set=set1','Espirituoso',35,'Caja 6 unidades',4,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(790,'Carbonated Water - Wildberry',4,5656.68,'sed magna at nunc commodo placerat praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget','https://robohash.org/quidoloremcorrupti.jpg?size=250x250&set=set1','Tinto',36,'Botella 1Lt',4,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(885,'Pasta - Canelloni',1,2071.36,'vel est donec odio justo sollicitudin ut suscipit a feugiat et eros vestibulum ac est lacinia nisi venenatis','https://robohash.org/atdolorecorrupti.bmp?size=250x250&set=set1','Blanco',21,'Botella 1Lt',4,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(902,'Cheese - Oka',4,8978.21,'erat volutpat in congue etiam justo etiam pretium iaculis justo in hac','https://robohash.org/blanditiisquoet.png?size=250x250&set=set1','Espumante',4,'Botella 750cc',2,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(920,'Milk - 2%',5,8573.33,'nibh in hac habitasse platea dictumst aliquam augue quam sollicitudin vitae consectetuer eget rutrum','https://robohash.org/numquamenimqui.png?size=250x250&set=set1','Tinto',35,'Caja 6 unidades',3,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(935,'Ketchup - Tomato',1,8581.09,'primis in faucibus orci luctus et ultrices posuere cubilia curae duis faucibus accumsan odio curabitur convallis duis consequat dui nec','https://robohash.org/dolorexamet.bmp?size=250x250&set=set1','Espirituoso',14,'Botella 750cc',4,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(955,'Juice - Apple, 500 Ml',3,2728.64,'imperdiet nullam orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem','https://robohash.org/recusandaeexcepturioptio.jpg?size=250x250&set=set1','Tinto',5,'Botella 1Lt',4,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(963,'Ham - Cooked Italian',1,7049.03,'nam congue risus semper porta volutpat quam pede lobortis ligula','https://robohash.org/accusantiumquismolestias.png?size=250x250&set=set1','Tinto',18,'Caja 6 unidades',2,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(964,'Mushroom - Morels, Dry',4,6876.71,'orci pede venenatis non sodales sed tincidunt eu felis fusce posuere felis sed lacus morbi sem mauris laoreet ut rhoncus','https://robohash.org/delenitinihilmodi.jpg?size=250x250&set=set1','Espumante',27,'Botella 750cc',3,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00'),(1015,'Veal - Leg, Provimi - 50 Lb Max',4,6489.82,'augue aliquam erat volutpat in congue etiam justo etiam pretium iaculis justo in','https://robohash.org/sedporroest.bmp?size=250x250&set=set1','Tinto',16,'Caja 6 unidades',3,1,'0000-00-00 00:00:00','0000-00-00 00:00:00','0000-00-00 00:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'admin','admin','admin@admin.com','$2a$10$Sb7GLEqu7poCAFKdO8rA8eHYRbIcI23mrwAlHriUBJqu0rireoRVK','avatar-default.png','Administrador','',7,'2021-03-03 23:25:50','2021-03-03 23:25:50',NULL);
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
INSERT INTO `wineries` VALUES (1,'Catena Zapata','2021-01-31 19:32:32','2021-01-31 19:32:32','0000-00-00 00:00:00');
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

-- Dump completed on 2021-03-03 20:50:55
