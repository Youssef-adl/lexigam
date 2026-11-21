-- LEXIGAM Production Database Export
-- Exported on 2026-11-21 17:04:31
SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS `avis`;
CREATE TABLE `avis` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `produit_id` bigint unsigned NOT NULL,
  `note` int NOT NULL,
  `commentaire` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `avis_user_id_foreign` (`user_id`),
  KEY `avis_produit_id_foreign` (`produit_id`),
  CONSTRAINT `avis_produit_id_foreign` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`id`) ON DELETE CASCADE,
  CONSTRAINT `avis_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=151 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `avis` VALUES('1','3','1','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('2','5','1','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('3','6','1','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('4','3','2','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('5','5','2','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('6','6','2','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('7','3','3','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('8','5','3','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('9','6','3','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('10','3','4','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('11','5','4','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('12','6','4','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('13','3','5','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('14','5','5','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('15','6','5','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('16','3','6','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('17','5','6','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('18','6','6','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('19','3','7','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('20','5','7','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('21','6','7','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('22','3','8','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('23','5','8','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('24','6','8','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('25','3','9','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('26','5','9','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('27','6','9','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('28','3','10','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('29','5','10','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('30','6','10','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('31','3','11','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('32','5','11','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('33','6','11','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('34','3','12','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('35','5','12','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('36','6','12','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `avis` VALUES('37','3','13','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('38','5','13','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('39','6','13','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('40','3','14','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('41','5','14','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('42','6','14','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('43','3','15','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('44','5','15','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('45','6','15','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('46','3','16','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('47','5','16','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('48','6','16','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('49','3','17','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('50','5','17','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('51','6','17','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('52','3','18','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('53','5','18','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('54','6','18','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('55','3','19','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('56','5','19','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('57','6','19','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('58','3','20','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('59','5','20','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('60','6','20','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('61','3','21','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('62','5','21','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('63','6','21','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('64','3','22','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('65','5','22','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('66','6','22','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('67','3','23','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('68','5','23','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('69','6','23','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('70','3','24','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('71','5','24','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('72','6','24','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('73','3','25','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('74','5','25','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('75','6','25','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('76','3','26','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('77','5','26','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('78','6','26','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('79','3','27','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('80','5','27','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('81','6','27','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('82','3','28','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('83','5','28','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('84','6','28','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('85','3','29','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('86','5','29','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('87','6','29','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `avis` VALUES('88','3','30','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('89','5','30','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('90','6','30','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('91','3','31','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('92','5','31','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('93','6','31','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('94','3','32','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('95','5','32','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('96','6','32','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('97','3','33','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('98','5','33','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('99','6','33','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('100','3','34','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('101','5','34','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('102','6','34','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('103','3','35','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('104','5','35','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('105','6','35','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('106','3','36','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('107','5','36','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('108','6','36','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('109','3','37','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('110','5','37','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('111','6','37','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('112','3','38','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('113','5','38','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('114','6','38','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('115','3','39','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('116','5','39','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('117','6','39','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('118','3','40','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('119','5','40','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('120','6','40','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('121','3','41','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('122','5','41','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('123','6','41','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('124','3','42','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('125','5','42','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('126','6','42','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('127','3','43','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('128','5','43','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('129','6','43','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('130','3','44','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('131','5','44','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('132','6','44','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('133','3','45','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('134','5','45','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('135','6','45','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('136','3','46','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('137','5','46','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `avis` VALUES('138','6','46','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:52','2026-08-15 16:39:52');
INSERT INTO `avis` VALUES('139','3','47','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:52','2026-08-15 16:39:52');
INSERT INTO `avis` VALUES('140','5','47','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:52','2026-08-15 16:39:52');
INSERT INTO `avis` VALUES('141','6','47','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:52','2026-08-15 16:39:52');
INSERT INTO `avis` VALUES('142','3','48','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:52','2026-08-15 16:39:52');
INSERT INTO `avis` VALUES('143','5','48','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:52','2026-08-15 16:39:52');
INSERT INTO `avis` VALUES('144','6','48','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:52','2026-08-15 16:39:52');
INSERT INTO `avis` VALUES('145','3','49','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:52','2026-08-15 16:39:52');
INSERT INTO `avis` VALUES('146','5','49','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:52','2026-08-15 16:39:52');
INSERT INTO `avis` VALUES('147','6','49','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:52','2026-08-15 16:39:52');
INSERT INTO `avis` VALUES('148','3','50','5','Produit exceptionnel, performances au rendez-vous et livraison rapide !','2026-08-15 16:39:52','2026-08-15 16:39:52');
INSERT INTO `avis` VALUES('149','5','50','5','Excellente qualité de fabrication, je recommande vivement Lexigam.','2026-08-15 16:39:52','2026-08-15 16:39:52');
INSERT INTO `avis` VALUES('150','6','50','4','Très satisfait de mon achat. Silencieux et très puissant.','2026-08-15 16:39:52','2026-08-15 16:39:52');

DROP TABLE IF EXISTS `cache`;
CREATE TABLE `cache` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `value` mediumtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `cache_locks`;
CREATE TABLE `cache_locks` (
  `key` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expiration` int NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `categories`;
CREATE TABLE `categories` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `statut` tinyint(1) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `categories` VALUES('1','Laptops Gaming & Ultrabooks',NULL,NULL,'1','2026-08-15 16:39:46','2026-08-15 16:39:46');
INSERT INTO `categories` VALUES('2','Smartphones & Tablettes Pro',NULL,NULL,'1','2026-08-15 16:39:46','2026-08-15 16:39:46');
INSERT INTO `categories` VALUES('3','Écrans & Moniteurs Haute Fréquence',NULL,NULL,'1','2026-08-15 16:39:46','2026-08-15 16:39:46');
INSERT INTO `categories` VALUES('4','Claviers & Souris Gamer',NULL,NULL,'1','2026-08-15 16:39:46','2026-08-15 16:39:46');
INSERT INTO `categories` VALUES('5','Casques & Audio Studio',NULL,NULL,'1','2026-08-15 16:39:46','2026-08-15 16:39:46');
INSERT INTO `categories` VALUES('6','Consoles & Manettes Gaming',NULL,NULL,'1','2026-08-15 16:39:46','2026-08-15 16:39:46');
INSERT INTO `categories` VALUES('7','Composants & Stockage SSD',NULL,NULL,'1','2026-08-15 16:39:46','2026-08-15 16:39:46');
INSERT INTO `categories` VALUES('8','Consoles & Accessoires Gaming',NULL,NULL,'1','2026-08-15 16:39:46','2026-08-15 16:39:46');
INSERT INTO `categories` VALUES('9','Laptops Gaming & Esport',NULL,NULL,'1','2026-08-17 14:17:14','2026-08-17 14:17:14');
INSERT INTO `categories` VALUES('10','Laptops Création & Station',NULL,NULL,'1','2026-08-17 14:17:14','2026-08-17 14:17:14');
INSERT INTO `categories` VALUES('11','Ultrabooks & Professionnels',NULL,NULL,'1','2026-08-17 14:17:14','2026-08-17 14:17:14');
INSERT INTO `categories` VALUES('12','Laptops Étude & Bureautique',NULL,NULL,'1','2026-08-17 14:17:14','2026-08-17 14:17:14');

DROP TABLE IF EXISTS `commandes`;
CREATE TABLE `commandes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `montant_total` decimal(8,2) NOT NULL,
  `statut` enum('en_attente','confirmee','expediee','livree','annulee') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'en_attente',
  `date_commande` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `commandes_user_id_foreign` (`user_id`),
  CONSTRAINT `commandes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `commandes` VALUES('1','3','59980.00','en_attente',NULL,'2026-08-17 14:43:27','2026-08-17 14:43:27');
INSERT INTO `commandes` VALUES('2','3','77980.00','confirmee',NULL,'2026-08-19 13:15:50','2026-08-23 12:53:29');
INSERT INTO `commandes` VALUES('3','3','38990.00','en_attente',NULL,'2026-08-25 16:28:19','2026-08-25 16:28:19');
INSERT INTO `commandes` VALUES('4','3','29990.00','en_attente',NULL,'2026-08-25 23:18:24','2026-08-25 23:18:24');
INSERT INTO `commandes` VALUES('13','3','29990.00','en_attente',NULL,'2026-08-26 00:24:55','2026-08-26 00:24:55');
INSERT INTO `commandes` VALUES('14','3','68980.00','livree',NULL,'2026-08-26 00:27:46','2026-08-26 10:11:16');
INSERT INTO `commandes` VALUES('15','3','68980.00','en_attente',NULL,'2026-08-27 19:19:48','2026-08-27 19:19:48');
INSERT INTO `commandes` VALUES('16','3','77980.00','en_attente',NULL,'2026-08-28 11:06:13','2026-08-28 11:06:13');
INSERT INTO `commandes` VALUES('17','3','194950.00','en_attente',NULL,'2026-08-28 20:40:19','2026-08-28 20:40:19');
INSERT INTO `commandes` VALUES('18','3','56970.00','en_attente',NULL,'2026-08-29 16:43:50','2026-08-29 16:43:50');
INSERT INTO `commandes` VALUES('19','3','450.00','en_attente',NULL,'2026-09-23 21:38:00','2026-09-23 21:38:00');

DROP TABLE IF EXISTS `failed_jobs`;
CREATE TABLE `failed_jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `job_batches`;
CREATE TABLE `job_batches` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_jobs` int NOT NULL,
  `pending_jobs` int NOT NULL,
  `failed_jobs` int NOT NULL,
  `failed_job_ids` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `options` mediumtext COLLATE utf8mb4_unicode_ci,
  `cancelled_at` int DEFAULT NULL,
  `created_at` int NOT NULL,
  `finished_at` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `jobs`;
CREATE TABLE `jobs` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `attempts` tinyint unsigned NOT NULL,
  `reserved_at` int unsigned DEFAULT NULL,
  `available_at` int unsigned NOT NULL,
  `created_at` int unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `ligne_commandes`;
CREATE TABLE `ligne_commandes` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `commande_id` bigint unsigned NOT NULL,
  `produit_id` bigint unsigned NOT NULL,
  `quantite` int NOT NULL,
  `prix` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ligne_commandes_commande_id_foreign` (`commande_id`),
  KEY `ligne_commandes_produit_id_foreign` (`produit_id`),
  CONSTRAINT `ligne_commandes_commande_id_foreign` FOREIGN KEY (`commande_id`) REFERENCES `commandes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ligne_commandes_produit_id_foreign` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `ligne_commandes` VALUES('1','1','52','2','29990.00','2026-08-17 14:43:27','2026-08-17 14:43:27');
INSERT INTO `ligne_commandes` VALUES('2','2','51','2','38990.00','2026-08-19 13:15:50','2026-08-19 13:15:50');
INSERT INTO `ligne_commandes` VALUES('3','3','70','1','38990.00','2026-08-25 16:28:19','2026-08-25 16:28:19');
INSERT INTO `ligne_commandes` VALUES('4','4','71','1','29990.00','2026-08-25 23:18:24','2026-08-25 23:18:24');
INSERT INTO `ligne_commandes` VALUES('13','13','71','1','29990.00','2026-08-26 00:24:55','2026-08-26 00:24:55');
INSERT INTO `ligne_commandes` VALUES('14','14','71','1','29990.00','2026-08-26 00:27:46','2026-08-26 00:27:46');
INSERT INTO `ligne_commandes` VALUES('15','14','70','1','38990.00','2026-08-26 00:27:46','2026-08-26 00:27:46');
INSERT INTO `ligne_commandes` VALUES('16','15','70','1','38990.00','2026-08-27 19:19:48','2026-08-27 19:19:48');
INSERT INTO `ligne_commandes` VALUES('17','15','71','1','29990.00','2026-08-27 19:19:48','2026-08-27 19:19:48');
INSERT INTO `ligne_commandes` VALUES('18','16','70','2','38990.00','2026-08-28 11:06:13','2026-08-28 11:06:13');
INSERT INTO `ligne_commandes` VALUES('19','17','57','3','41990.00','2026-08-28 20:40:19','2026-08-28 20:40:19');
INSERT INTO `ligne_commandes` VALUES('20','17','71','1','29990.00','2026-08-28 20:40:19','2026-08-28 20:40:19');
INSERT INTO `ligne_commandes` VALUES('21','17','70','1','38990.00','2026-08-28 20:40:19','2026-08-28 20:40:19');
INSERT INTO `ligne_commandes` VALUES('22','18','72','2','13490.00','2026-08-29 16:43:50','2026-08-29 16:43:50');
INSERT INTO `ligne_commandes` VALUES('23','18','71','1','29990.00','2026-08-29 16:43:50','2026-08-29 16:43:50');
INSERT INTO `ligne_commandes` VALUES('24','19','1','1','450.00','2026-09-23 21:38:00','2026-09-23 21:38:00');

DROP TABLE IF EXISTS `ligne_paniers`;
CREATE TABLE `ligne_paniers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `panier_id` bigint unsigned NOT NULL,
  `produit_id` bigint unsigned NOT NULL,
  `quantite` int NOT NULL,
  `prix` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ligne_paniers_panier_id_foreign` (`panier_id`),
  KEY `ligne_paniers_produit_id_foreign` (`produit_id`),
  CONSTRAINT `ligne_paniers_panier_id_foreign` FOREIGN KEY (`panier_id`) REFERENCES `paniers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ligne_paniers_produit_id_foreign` FOREIGN KEY (`produit_id`) REFERENCES `produits` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=533 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `ligne_paniers` VALUES('532','1','2','2','200.00','2026-09-24 14:48:10','2026-09-24 14:48:10');

DROP TABLE IF EXISTS `livraisons`;
CREATE TABLE `livraisons` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `commande_id` bigint unsigned NOT NULL,
  `mode_reception` enum('livraison','retrait') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'livraison',
  `adresse` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ville` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `telephone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `statut` enum('en_preparation','expediee','en_cours','livree') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'en_preparation',
  `date_livraison` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `livraisons_commande_id_foreign` (`commande_id`),
  CONSTRAINT `livraisons_commande_id_foreign` FOREIGN KEY (`commande_id`) REFERENCES `commandes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `livraisons` VALUES('1','1','livraison','TEMARA','rabat','+212 7742342345','en_preparation',NULL,'2026-08-17 14:43:27','2026-08-17 14:43:27');
INSERT INTO `livraisons` VALUES('2','2','livraison','TEMARA','rabat','+212 7742342345','en_preparation',NULL,'2026-08-19 13:15:50','2026-08-19 13:15:50');
INSERT INTO `livraisons` VALUES('3','3','livraison','TEMARA','rabat','+212 7742342345','en_preparation',NULL,'2026-08-25 16:28:19','2026-08-25 16:28:19');
INSERT INTO `livraisons` VALUES('4','4','livraison','TEMARA','rabat','+212 7742342345','en_preparation',NULL,'2026-08-25 23:18:24','2026-08-25 23:18:24');
INSERT INTO `livraisons` VALUES('5','13','retrait',NULL,NULL,'+212 7742342345','en_preparation',NULL,'2026-08-26 00:24:55','2026-08-26 00:24:55');
INSERT INTO `livraisons` VALUES('6','14','retrait',NULL,NULL,'+212 7742342345','livree','2026-08-26','2026-08-26 00:27:46','2026-08-26 10:11:17');
INSERT INTO `livraisons` VALUES('7','15','retrait',NULL,NULL,'+212 7742342345','en_preparation',NULL,'2026-08-27 19:19:48','2026-08-27 19:19:48');
INSERT INTO `livraisons` VALUES('8','16','retrait',NULL,NULL,'+212 7742342345','en_preparation',NULL,'2026-08-28 11:06:14','2026-08-28 11:06:14');
INSERT INTO `livraisons` VALUES('9','17','retrait',NULL,NULL,'+212 7742342345','en_preparation',NULL,'2026-08-28 20:40:19','2026-08-28 20:40:19');
INSERT INTO `livraisons` VALUES('10','18','retrait',NULL,NULL,'+212 7742342345','en_preparation',NULL,'2026-08-29 16:43:50','2026-08-29 16:43:50');
INSERT INTO `livraisons` VALUES('11','19','retrait',NULL,NULL,'07777777','en_preparation',NULL,'2026-09-23 21:38:00','2026-09-23 21:38:00');

DROP TABLE IF EXISTS `migrations`;
CREATE TABLE `migrations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `migrations` VALUES('1','0001_01_01_000000_create_users_table','1');
INSERT INTO `migrations` VALUES('2','0001_01_01_000001_create_cache_table','1');
INSERT INTO `migrations` VALUES('3','0001_01_01_000002_create_jobs_table','1');
INSERT INTO `migrations` VALUES('4','2026_05_21_120946_create_categories_table','1');
INSERT INTO `migrations` VALUES('5','2026_05_21_121019_create_produits_table','1');
INSERT INTO `migrations` VALUES('6','2026_05_21_121024_create_paniers_table','1');
INSERT INTO `migrations` VALUES('7','2026_05_21_121031_create_ligne_paniers_table','1');
INSERT INTO `migrations` VALUES('8','2026_05_21_121038_create_commandes_table','1');
INSERT INTO `migrations` VALUES('9','2026_05_21_121042_create_ligne_commandes_table','1');
INSERT INTO `migrations` VALUES('10','2026_05_21_121047_create_paiements_table','1');
INSERT INTO `migrations` VALUES('11','2026_05_21_121052_create_livraisons_table','1');
INSERT INTO `migrations` VALUES('12','2026_05_21_121058_create_avis_table','1');
INSERT INTO `migrations` VALUES('13','2026_05_21_121212_create_retours_table','1');
INSERT INTO `migrations` VALUES('14','2026_05_21_175140_add_role_to_users_table','1');
INSERT INTO `migrations` VALUES('15','2026_05_21_210055_create_personal_access_tokens_table','1');
INSERT INTO `migrations` VALUES('16','2026_06_01_205608_add_statut_to_produits_table','1');
INSERT INTO `migrations` VALUES('17','2026_06_01_225750_add_deletion_fields_to_produits_table','1');
INSERT INTO `migrations` VALUES('18','2026_08_26_090000_add_mode_reception_to_livraisons_table','2');

DROP TABLE IF EXISTS `paiements`;
CREATE TABLE `paiements` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `commande_id` bigint unsigned NOT NULL,
  `montant` decimal(8,2) NOT NULL,
  `mode` enum('carte','paypal','cash') COLLATE utf8mb4_unicode_ci NOT NULL,
  `statut` enum('en_attente','paye','echec') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'en_attente',
  `date_paiement` date DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `paiements_commande_id_foreign` (`commande_id`),
  CONSTRAINT `paiements_commande_id_foreign` FOREIGN KEY (`commande_id`) REFERENCES `commandes` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `paiements` VALUES('1','1','59980.00','cash','en_attente',NULL,'2026-08-17 14:43:27','2026-08-17 14:43:27');
INSERT INTO `paiements` VALUES('2','2','77980.00','cash','en_attente',NULL,'2026-08-19 13:15:50','2026-08-19 13:15:50');
INSERT INTO `paiements` VALUES('3','3','38990.00','cash','en_attente',NULL,'2026-08-25 16:28:19','2026-08-25 16:28:19');
INSERT INTO `paiements` VALUES('4','4','29990.00','cash','en_attente',NULL,'2026-08-25 23:18:24','2026-08-25 23:18:24');
INSERT INTO `paiements` VALUES('13','13','29990.00','cash','en_attente',NULL,'2026-08-26 00:24:55','2026-08-26 00:24:55');
INSERT INTO `paiements` VALUES('14','14','68980.00','cash','en_attente',NULL,'2026-08-26 00:27:46','2026-08-26 00:27:46');
INSERT INTO `paiements` VALUES('15','15','68980.00','cash','en_attente',NULL,'2026-08-27 19:19:48','2026-08-27 19:19:48');
INSERT INTO `paiements` VALUES('16','16','77980.00','cash','en_attente',NULL,'2026-08-28 11:06:14','2026-08-28 11:06:14');
INSERT INTO `paiements` VALUES('17','17','194950.00','cash','en_attente',NULL,'2026-08-28 20:40:19','2026-08-28 20:40:19');
INSERT INTO `paiements` VALUES('18','18','56970.00','cash','en_attente',NULL,'2026-08-29 16:43:50','2026-08-29 16:43:50');
INSERT INTO `paiements` VALUES('19','19','450.00','cash','en_attente',NULL,'2026-09-23 21:38:00','2026-09-23 21:38:00');

DROP TABLE IF EXISTS `paniers`;
CREATE TABLE `paniers` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `prix_total` decimal(8,2) NOT NULL DEFAULT '0.00',
  `statut` enum('en_cours','valide','annule') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'en_cours',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `paniers_user_id_foreign` (`user_id`),
  CONSTRAINT `paniers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `paniers` VALUES('1','3','400.00','en_cours','2026-08-15 21:04:09','2026-09-24 14:48:10');

DROP TABLE IF EXISTS `password_reset_tokens`;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `personal_access_tokens`;
CREATE TABLE `personal_access_tokens` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint unsigned NOT NULL,
  `name` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  KEY `personal_access_tokens_expires_at_index` (`expires_at`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `personal_access_tokens` VALUES('1','App\\Models\\User','1','api','4d51445fe98bae5f969de3579effc3fd09d98caf1d85f0671f5c8ebf6e6211cc','[\"*\"]','2026-08-15 16:50:19',NULL,'2026-08-15 16:50:01','2026-08-15 16:50:19');
INSERT INTO `personal_access_tokens` VALUES('2','App\\Models\\User','1','api','8b075dcba4e36f3b9c2aff761eaf29e761aa4d4fc3e87bdde2d67306abead704','[\"*\"]','2026-08-15 20:46:18',NULL,'2026-08-15 20:45:55','2026-08-15 20:46:18');
INSERT INTO `personal_access_tokens` VALUES('3','App\\Models\\User','3','api','2b9d923a764bd90c268e7c8de067f72bfd3a04ddd2ab99c925d0cedf010c1e94','[\"*\"]','2026-08-17 12:18:22',NULL,'2026-08-15 21:04:01','2026-08-17 12:18:22');
INSERT INTO `personal_access_tokens` VALUES('4','App\\Models\\User','1','api','5912f9ae2031e04c11af4185b3a3d5df98d457fda63d9ca89e039a250190fa47','[\"*\"]','2026-08-17 14:41:33',NULL,'2026-08-17 12:19:52','2026-08-17 14:41:33');
INSERT INTO `personal_access_tokens` VALUES('5','App\\Models\\User','3','api','8470d775ebee71907d695f1ee857ae65eaf5a0190908d7849dc1a9a4e47e55b6','[\"*\"]','2026-08-19 13:15:54',NULL,'2026-08-17 14:42:57','2026-08-19 13:15:54');
INSERT INTO `personal_access_tokens` VALUES('6','App\\Models\\User','1','api','6300468a4f63cb3669633004a10bcfbe59fba60adb10923f1aa4aa2b8c2fbfe7','[\"*\"]','2026-08-19 13:16:37',NULL,'2026-08-19 13:16:12','2026-08-19 13:16:37');
INSERT INTO `personal_access_tokens` VALUES('7','App\\Models\\User','1','api','c587df35d75a97a1997a405d150dae4c3250f4d7852859f0aaf0244c2eba8f74','[\"*\"]','2026-08-20 10:48:57',NULL,'2026-08-19 15:47:52','2026-08-20 10:48:57');
INSERT INTO `personal_access_tokens` VALUES('8','App\\Models\\User','3','api','707f864b0f533f06a77084fc1c5ba8ebf3a0d546768b92d925320d927f81f595','[\"*\"]','2026-08-23 12:52:19',NULL,'2026-08-21 15:46:45','2026-08-23 12:52:19');
INSERT INTO `personal_access_tokens` VALUES('9','App\\Models\\User','1','api','7c0bae2cba470b3b015fa7854b55d00225934ab4633a92fa320e73740d598249','[\"*\"]','2026-08-23 12:53:44',NULL,'2026-08-23 12:52:41','2026-08-23 12:53:44');
INSERT INTO `personal_access_tokens` VALUES('10','App\\Models\\User','3','api','b054b585c35777039f5ede104152059095c313a9b4016cc9bf22f672377b4691','[\"*\"]','2026-08-26 09:56:53',NULL,'2026-08-23 12:53:50','2026-08-26 09:56:53');
INSERT INTO `personal_access_tokens` VALUES('11','App\\Models\\User','1','api','d59cbd993f19119c5aaff3d4737c90842c165582664ec491df2c87c86bf8ab29','[\"*\"]','2026-08-26 10:11:26',NULL,'2026-08-26 10:10:00','2026-08-26 10:11:26');
INSERT INTO `personal_access_tokens` VALUES('12','App\\Models\\User','3','api','e18b060d7e880523c9d8141b43cd29f6c240571282461628571c1c1b3a1cd031','[\"*\"]','2026-08-29 15:12:06',NULL,'2026-08-26 10:11:50','2026-08-29 15:12:06');
INSERT INTO `personal_access_tokens` VALUES('13','App\\Models\\User','3','api','0c3bebd904f52574380cb34c0070bec1aba7cb6dde13604efb89023ec51ebfa2','[\"*\"]','2026-09-05 11:24:29',NULL,'2026-08-29 16:43:20','2026-09-05 11:24:29');
INSERT INTO `personal_access_tokens` VALUES('14','App\\Models\\User','1','api','7eceeeb2db3c68405a5d4eaed6dbcdecdcd4a5ff44d769a7d9820c41b9697ebf','[\"*\"]','2026-09-10 10:06:12',NULL,'2026-09-10 10:05:56','2026-09-10 10:06:12');
INSERT INTO `personal_access_tokens` VALUES('15','App\\Models\\User','3','api','c4bd1ca56f6cf26161f4aa7658b21c42f8a8662f73ed04002e51eaca204dfa1d','[\"*\"]',NULL,NULL,'2026-09-12 20:57:50','2026-09-12 20:57:50');
INSERT INTO `personal_access_tokens` VALUES('16','App\\Models\\User','3','api','422e48664fa7be3e36ad3b4bb37e6354cc9fa90118e81758526773329a8ad524','[\"*\"]',NULL,NULL,'2026-09-23 16:05:48','2026-09-23 16:05:48');
INSERT INTO `personal_access_tokens` VALUES('17','App\\Models\\User','3','api','8f252d3b285e85485446991656d2e2f4ed253e4357d2bad294d731ecc114aafb','[\"*\"]','2026-09-24 14:48:10',NULL,'2026-09-23 21:37:16','2026-09-24 14:48:10');

DROP TABLE IF EXISTS `produits`;
CREATE TABLE `produits` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `prix` decimal(8,2) NOT NULL,
  `stock` int NOT NULL,
  `image` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `statut` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `deletion_reason` text COLLATE utf8mb4_unicode_ci,
  `user_id` bigint unsigned NOT NULL,
  `categorie_id` bigint unsigned NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `produits_user_id_foreign` (`user_id`),
  KEY `produits_categorie_id_foreign` (`categorie_id`),
  CONSTRAINT `produits_categorie_id_foreign` FOREIGN KEY (`categorie_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `produits_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `produits` VALUES('1','Essence Mascara Lash Princess','The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.','450.00','98','https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:49','2026-09-23 21:38:00');
INSERT INTO `produits` VALUES('2','Eyeshadow Palette with Mirror','The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it\'s convenient for on-the-go makeup application.','200.00','34','https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `produits` VALUES('3','Powder Canister','The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.','150.00','89','https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `produits` VALUES('4','Red Lipstick','The Red Lipstick is a classic and bold choice for adding a pop of color to your lips. With a creamy and pigmented formula, it provides a vibrant and long-lasting finish.','150.00','91','https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `produits` VALUES('5','Red Nail Polish','The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.','450.00','79','https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `produits` VALUES('6','Calvin Klein CK One','CK One by Calvin Klein is a classic unisex fragrance, known for its fresh and clean scent. It\'s a versatile fragrance suitable for everyday wear.','500.00','29','https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `produits` VALUES('7','Chanel Coco Noir Eau De','Coco Noir by Chanel is an elegant and mysterious fragrance, featuring notes of grapefruit, rose, and sandalwood. Perfect for evening occasions.','1350.00','58','https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `produits` VALUES('8','Dior J\'adore','J\'adore by Dior is a luxurious and floral fragrance, known for its blend of ylang-ylang, rose, and jasmine. It embodies femininity and sophistication.','950.00','98','https://cdn.dummyjson.com/product-images/fragrances/dior-j\'adore/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `produits` VALUES('9','Dolce Shine Eau de','Dolce Shine by Dolce & Gabbana is a vibrant and fruity fragrance, featuring notes of mango, jasmine, and blonde woods. It\'s a joyful and youthful scent.','750.00','5','https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `produits` VALUES('10','Gucci Bloom Eau de','Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It\'s a modern and romantic scent.','850.00','91','https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `produits` VALUES('11','Annibale Colombo Bed','The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.','19950.00','88','https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `produits` VALUES('12','Annibale Colombo Sofa','The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.','26250.00','60','https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:49','2026-08-15 16:39:49');
INSERT INTO `produits` VALUES('13','Bedside Table African Cherry','The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.','3150.00','64','https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `produits` VALUES('14','Knoll Saarinen Executive Conference Chair','The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.','5250.00','26','https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `produits` VALUES('15','Wooden Bathroom Sink With Mirror','The Wooden Bathroom Sink with Mirror is a unique and stylish addition to your bathroom, featuring a wooden sink countertop and a matching mirror.','8400.00','7','https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `produits` VALUES('16','Apple','Fresh and crisp apples, perfect for snacking or incorporating into various recipes.','450.00','8','https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `produits` VALUES('17','Beef Steak','High-quality beef steak, great for grilling or cooking to your preferred level of doneness.','150.00','86','https://cdn.dummyjson.com/product-images/groceries/beef-steak/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `produits` VALUES('18','Cat Food','Nutritious cat food formulated to meet the dietary needs of your feline friend.','450.00','46','https://cdn.dummyjson.com/product-images/groceries/cat-food/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `produits` VALUES('19','Chicken Meat','Fresh and tender chicken meat, suitable for various culinary preparations.','450.00','97','https://cdn.dummyjson.com/product-images/groceries/chicken-meat/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `produits` VALUES('20','Cooking Oil','Versatile cooking oil suitable for frying, sautéing, and various culinary applications.','450.00','10','https://cdn.dummyjson.com/product-images/groceries/cooking-oil/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `produits` VALUES('21','Cucumber','Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.','450.00','84','https://cdn.dummyjson.com/product-images/groceries/cucumber/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `produits` VALUES('22','Dog Food','Specially formulated dog food designed to provide essential nutrients for your canine companion.','450.00','71','https://cdn.dummyjson.com/product-images/groceries/dog-food/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `produits` VALUES('23','Eggs','Fresh eggs, a versatile ingredient for baking, cooking, or breakfast.','450.00','9','https://cdn.dummyjson.com/product-images/groceries/eggs/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `produits` VALUES('24','Fish Steak','Quality fish steak, suitable for grilling, baking, or pan-searing.','150.00','74','https://cdn.dummyjson.com/product-images/groceries/fish-steak/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `produits` VALUES('25','Green Bell Pepper','Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes.','450.00','33','https://cdn.dummyjson.com/product-images/groceries/green-bell-pepper/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `produits` VALUES('26','Green Chili Pepper','Spicy green chili pepper, ideal for adding heat to your favorite recipes.','450.00','5','https://cdn.dummyjson.com/product-images/groceries/green-chili-pepper/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `produits` VALUES('27','Honey Jar','Pure and natural honey in a convenient jar, perfect for sweetening beverages or drizzling over food.','450.00','34','https://cdn.dummyjson.com/product-images/groceries/honey-jar/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `produits` VALUES('28','Ice Cream','Creamy and delicious ice cream, available in various flavors for a delightful treat.','450.00','27','https://cdn.dummyjson.com/product-images/groceries/ice-cream/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `produits` VALUES('29','Juice','Refreshing fruit juice, packed with vitamins and great for staying hydrated.','450.00','50','https://cdn.dummyjson.com/product-images/groceries/juice/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `produits` VALUES('30','Kiwi','Nutrient-rich kiwi, perfect for snacking or adding a tropical twist to your dishes.','450.00','99','https://cdn.dummyjson.com/product-images/groceries/kiwi/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:50','2026-08-15 16:39:50');
INSERT INTO `produits` VALUES('31','Lemon','Zesty and tangy lemons, versatile for cooking, baking, or making refreshing beverages.','450.00','31','https://cdn.dummyjson.com/product-images/groceries/lemon/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `produits` VALUES('32','Milk','Fresh and nutritious milk, a staple for various recipes and daily consumption.','450.00','27','https://cdn.dummyjson.com/product-images/groceries/milk/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `produits` VALUES('33','Mulberry','Sweet and juicy mulberries, perfect for snacking or adding to desserts and cereals.','450.00','99','https://cdn.dummyjson.com/product-images/groceries/mulberry/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `produits` VALUES('34','Nescafe Coffee','Quality coffee from Nescafe, available in various blends for a rich and satisfying cup.','450.00','57','https://cdn.dummyjson.com/product-images/groceries/nescafe-coffee/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `produits` VALUES('35','Potatoes','Versatile and starchy potatoes, great for roasting, mashing, or as a side dish.','450.00','13','https://cdn.dummyjson.com/product-images/groceries/potatoes/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `produits` VALUES('36','Protein Powder','Nutrient-packed protein powder, ideal for supplementing your diet with essential proteins.','200.00','80','https://cdn.dummyjson.com/product-images/groceries/protein-powder/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `produits` VALUES('37','Red Onions','Flavorful and aromatic red onions, perfect for adding depth to your savory dishes.','450.00','82','https://cdn.dummyjson.com/product-images/groceries/red-onions/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `produits` VALUES('38','Rice','High-quality rice, a staple for various cuisines and a versatile base for many dishes.','450.00','59','https://cdn.dummyjson.com/product-images/groceries/rice/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `produits` VALUES('39','Soft Drinks','Assorted soft drinks in various flavors, perfect for refreshing beverages.','450.00','53','https://cdn.dummyjson.com/product-images/groceries/soft-drinks/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `produits` VALUES('40','Strawberry','Sweet and succulent strawberries, great for snacking, desserts, or blending into smoothies.','450.00','46','https://cdn.dummyjson.com/product-images/groceries/strawberry/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `produits` VALUES('41','Tissue Paper Box','Convenient tissue paper box for everyday use, providing soft and absorbent tissues.','450.00','86','https://cdn.dummyjson.com/product-images/groceries/tissue-paper-box/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `produits` VALUES('42','Water','Pure and refreshing bottled water, essential for staying hydrated throughout the day.','450.00','53','https://cdn.dummyjson.com/product-images/groceries/water/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `produits` VALUES('43','Decoration Swing','The Decoration Swing is a charming addition to your home decor. Crafted with intricate details, it adds a touch of elegance and whimsy to any room.','650.00','47','https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `produits` VALUES('44','Family Tree Photo Frame','The Family Tree Photo Frame is a sentimental and stylish way to display your cherished family memories. With multiple photo slots, it tells the story of your loved ones.','300.00','77','https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `produits` VALUES('45','House Showpiece Plant','The House Showpiece Plant is an artificial plant that brings a touch of nature to your home without the need for maintenance. It adds greenery and style to any space.','400.00','28','https://cdn.dummyjson.com/product-images/home-decoration/house-showpiece-plant/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `produits` VALUES('46','Plant Pot','The Plant Pot is a stylish container for your favorite plants. With a sleek design, it complements your indoor or outdoor garden, adding a modern touch to your plant display.','150.00','59','https://cdn.dummyjson.com/product-images/home-decoration/plant-pot/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:51','2026-08-15 16:39:51');
INSERT INTO `produits` VALUES('47','Table Lamp','The Table Lamp is a functional and decorative lighting solution for your living space. With a modern design, it provides both ambient and task lighting, enhancing the atmosphere.','500.00','9','https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:52','2026-08-15 16:39:52');
INSERT INTO `produits` VALUES('48','Bamboo Spatula','The Bamboo Spatula is a versatile kitchen tool made from eco-friendly bamboo. Ideal for flipping, stirring, and serving various dishes.','450.00','37','https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:52','2026-08-15 16:39:52');
INSERT INTO `produits` VALUES('49','Black Aluminium Cup','The Black Aluminium Cup is a stylish and durable cup suitable for both hot and cold beverages. Its sleek black design adds a modern touch to your drinkware collection.','450.00','75','https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:52','2026-08-15 16:39:52');
INSERT INTO `produits` VALUES('50','Black Whisk','The Black Whisk is a kitchen essential for whisking and beating ingredients. Its ergonomic handle and sleek design make it a practical and stylish tool.','450.00','73','https://cdn.dummyjson.com/product-images/kitchen-accessories/black-whisk/thumbnail.webp','approved',NULL,'2','1','2026-08-15 16:39:52','2026-08-15 16:39:52');
INSERT INTO `produits` VALUES('51','Lexigam Titan 18 — RTX 4090 / i9-14900HX','Le sommet du catalogue. Rien ne le fait plier.\n\nDalle 18 pouces Mini-LED 4K 240 Hz, Intel Core i9-14900HX, GeForce RTX 4090 16 Go, 64 Go DDR5-5600 et 2 To NVMe Gen4. Châssis aluminium avec chambre à vapeur pleine largeur : la machine tient 3,2 GHz sur tous les cœurs en charge prolongée sans throttling.\n\n• Processeur : Intel Core i9-14900HX (24 cœurs / 32 threads)\n• Carte graphique : NVIDIA GeForce RTX 4090 Laptop 16 Go GDDR6\n• Memoire : 64 Go DDR5-5600 (2 × 32 Go)\n• Stockage : 2 To SSD NVMe PCIe Gen4\n• Ecran : 18\" Mini-LED 3840 × 2400 — 240 Hz — 1 200 nits\n• Clavier : Mécanique low-profile RGB par touche\n• Autonomie : 5 h en bureautique\n• Poids : 3,10 kg\n• Connectique : 2 × Thunderbolt 4, 3 × USB-A, HDMI 2.1, RJ45 2,5 Gb\n• Systeme : Windows 11 Pro','38990.00','4','https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','9','2026-08-17 14:17:14','2026-08-19 13:15:50');
INSERT INTO `produits` VALUES('52','Lexigam Stealth 16 — OLED 240 Hz / RTX 4080','La puissance d\'une tour dans 1,9 cm d\'épaisseur.\n\nChâssis aluminium CNC noir anodisé de 19 mm. Écran OLED QHD+ 240 Hz couvrant 100 % du DCI-P3, Ryzen 9 7945HX, RTX 4080 12 Go et 32 Go de DDR5. Le compromis le plus abouti entre discrétion et performance brute.\n\n• Processeur : AMD Ryzen 9 7945HX (16 cœurs / 32 threads)\n• Carte graphique : NVIDIA GeForce RTX 4080 Laptop 12 Go GDDR6\n• Memoire : 32 Go DDR5-5200\n• Stockage : 1 To SSD NVMe PCIe Gen4\n• Ecran : 16\" OLED 2560 × 1600 — 240 Hz — 0,2 ms\n• Clavier : Chiclet RGB 4 zones\n• Autonomie : 7 h en bureautique\n• Poids : 2,10 kg\n• Connectique : USB4, 2 × USB-A, HDMI 2.1, lecteur microSD\n• Systeme : Windows 11 Pro','29990.00','9','https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','9','2026-08-17 14:17:14','2026-08-17 14:43:27');
INSERT INTO `produits` VALUES('53','Lexigam Raptor 15 — RTX 4060 / i7-13650HX','Le point d\'entrée honnête vers le 1440p.\n\n165 Hz en QHD, RTX 4060 8 Go et Core i7-13650HX : la configuration qui tient les jeux compétitifs à plus de 200 fps en 1080p sans surpayer. Deux emplacements SO-DIMM et deux slots M.2 pour évoluer plus tard.\n\n• Processeur : Intel Core i7-13650HX (14 cœurs / 20 threads)\n• Carte graphique : NVIDIA GeForce RTX 4060 Laptop 8 Go GDDR6\n• Memoire : 16 Go DDR5-4800 (extensible à 64 Go)\n• Stockage : 1 To SSD NVMe PCIe Gen4\n• Ecran : 15,6\" IPS 2560 × 1440 — 165 Hz — 300 nits\n• Clavier : Chiclet RGB une zone, pavé numérique\n• Autonomie : 6 h en bureautique\n• Poids : 2,30 kg\n• Connectique : USB-C DP, 3 × USB-A, HDMI 2.1, RJ45\n• Systeme : Windows 11 Famille','13490.00','24','https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','9','2026-08-17 14:17:14','2026-08-17 14:17:14');
INSERT INTO `produits` VALUES('54','ASUS ROG Zephyrus G14 — OLED 120 Hz / RTX 4070','Moins de 1,5 kg, et pourtant un vrai laptop de jeu.\n\nLe format 14 pouces le plus abouti du marché : capot aluminium unibody, dalle OLED 3K 120 Hz, Ryzen 9 et RTX 4070. Se transporte comme un ultrabook et joue comme une machine de 17 pouces.\n\n• Processeur : AMD Ryzen 9 8945HS (8 cœurs / 16 threads)\n• Carte graphique : NVIDIA GeForce RTX 4070 Laptop 8 Go\n• Memoire : 32 Go LPDDR5X-6400\n• Stockage : 1 To SSD NVMe PCIe Gen4\n• Ecran : 14\" OLED 2880 × 1800 — 120 Hz — HDR True Black 500\n• Clavier : Chiclet rétroéclairage blanc\n• Autonomie : 9 h en bureautique\n• Poids : 1,50 kg\n• Connectique : USB4, USB-C DP, 2 × USB-A, HDMI 2.1, microSD\n• Systeme : Windows 11 Famille','21490.00','14','https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','9','2026-08-17 14:17:14','2026-08-17 14:17:14');
INSERT INTO `produits` VALUES('55','MSI Katana 15 — 144 Hz / RTX 4070','Robuste, sobre, taillé pour les longues sessions.\n\nDouble ventilateur Cooler Boost 5 avec sept caloducs, RTX 4070 8 Go et dalle 144 Hz. Une machine sans fioriture qui encaisse les sessions de six heures sans monter en température côté repose-poignets.\n\n• Processeur : Intel Core i7-13620H (10 cœurs / 16 threads)\n• Carte graphique : NVIDIA GeForce RTX 4070 Laptop 8 Go\n• Memoire : 16 Go DDR5-5200\n• Stockage : 1 To SSD NVMe PCIe Gen4\n• Ecran : 15,6\" IPS 1920 × 1080 — 144 Hz\n• Clavier : Rétroéclairé bleu, pavé numérique\n• Autonomie : 5 h 30 en bureautique\n• Poids : 2,25 kg\n• Connectique : USB-C, 3 × USB-A, HDMI 2.1, RJ45\n• Systeme : Windows 11 Famille','16990.00','18','https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','9','2026-08-17 14:17:14','2026-08-17 14:17:14');
INSERT INTO `produits` VALUES('56','Lenovo Legion Pro 7i — 240 Hz / RTX 4080','La référence pour l\'esport en 16:10.\n\nDalle 16 pouces WQXGA 240 Hz à 500 nits, RTX 4080 avec un TGP réellement débloqué à 175 W, et le meilleur clavier de sa catégorie. Le refroidissement ColdFront laisse la carte tenir sa fréquence maximale en continu.\n\n• Processeur : Intel Core i9-14900HX (24 cœurs / 32 threads)\n• Carte graphique : NVIDIA GeForce RTX 4080 Laptop 12 Go — 175 W\n• Memoire : 32 Go DDR5-5600\n• Stockage : 1 To SSD NVMe PCIe Gen4\n• Ecran : 16\" IPS 2560 × 1600 — 240 Hz — 500 nits\n• Clavier : TrueStrike RGB par touche, course 1,5 mm\n• Autonomie : 6 h en bureautique\n• Poids : 2,80 kg\n• Connectique : Thunderbolt 4, USB-C, 3 × USB-A, HDMI 2.1, RJ45\n• Systeme : Windows 11 Pro','27490.00','9','https://images.unsplash.com/photo-1484788984921-03950022c9ef?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','9','2026-08-17 14:17:14','2026-08-17 14:17:14');
INSERT INTO `produits` VALUES('57','Apple MacBook Pro 16\" — M4 Max','Le montage 8K sans un bruit de ventilateur.\n\nPuce M4 Max 16 cœurs CPU / 40 cœurs GPU, 48 Go de mémoire unifiée, écran Liquid Retina XDR 1 600 nits en pointe. Exporte une timeline ProRes 8K plus vite que la plupart des tours, en restant silencieux et sur batterie.\n\n• Processeur : Apple M4 Max — 16 cœurs CPU\n• Carte graphique : GPU intégré 40 cœurs + Neural Engine 16 cœurs\n• Memoire : 48 Go mémoire unifiée\n• Stockage : 1 To SSD\n• Ecran : 16,2\" Liquid Retina XDR 3456 × 2234 — 120 Hz — 1 600 nits\n• Clavier : Magic Keyboard rétroéclairé, Touch ID\n• Autonomie : 20 h en lecture vidéo\n• Poids : 2,15 kg\n• Connectique : 3 × Thunderbolt 5, HDMI, SDXC, MagSafe 3, jack\n• Systeme : macOS','41990.00','4','https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','10','2026-08-17 14:17:14','2026-08-28 20:40:19');
INSERT INTO `produits` VALUES('58','Dell XPS 16 — OLED 4K / RTX 4070','Une dalle 4K OLED que l\'on peut croire sur parole.\n\nÉcran OLED 4K+ tactile calibré à un Delta-E inférieur à 1, Core Ultra 9 avec NPU dédié et RTX 4070. Châssis usiné dans un seul bloc d\'aluminium, verre Gorilla sur toute la surface du clavier.\n\n• Processeur : Intel Core Ultra 9 185H (16 cœurs)\n• Carte graphique : NVIDIA GeForce RTX 4070 Laptop 8 Go\n• Memoire : 32 Go LPDDR5X-7467\n• Stockage : 1 To SSD NVMe\n• Ecran : 16,3\" OLED 3840 × 2400 tactile — 90 Hz — Delta-E < 1\n• Clavier : Zero-lattice, rangée de fonctions capacitive\n• Autonomie : 10 h en bureautique\n• Poids : 2,10 kg\n• Connectique : 3 × Thunderbolt 4, microSD, jack\n• Systeme : Windows 11 Pro','32490.00','8','https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','10','2026-08-17 14:17:14','2026-08-17 14:17:14');
INSERT INTO `produits` VALUES('59','Lexigam Atelier 16 — RTX A2000 certifiée','Pilotes certifiés CAO. Pas de surprise en production.\n\nStation mobile pensée pour SolidWorks, AutoCAD et Revit : RTX A2000 8 Go avec pilotes ISV certifiés, 64 Go de RAM ECC et une dalle 16 pouces 100 % AdobeRGB. Trois ans d\'intervention sur site inclus.\n\n• Processeur : Intel Core i7-14700HX (20 cœurs)\n• Carte graphique : NVIDIA RTX A2000 8 Go — pilotes ISV certifiés\n• Memoire : 64 Go DDR5 ECC\n• Stockage : 2 To SSD NVMe PCIe Gen4\n• Ecran : 16\" IPS 2560 × 1600 — 100 % AdobeRGB\n• Clavier : Rétroéclairé blanc, pavé numérique\n• Autonomie : 8 h en bureautique\n• Poids : 2,40 kg\n• Connectique : 2 × Thunderbolt 4, 3 × USB-A, HDMI 2.1, RJ45, SD UHS-II\n• Systeme : Windows 11 Pro','24990.00','6','https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','10','2026-08-17 14:17:14','2026-08-17 14:17:14');
INSERT INTO `produits` VALUES('60','HP ZBook Studio G11 — RTX 3000 Ada','La station de travail la plus fine du marché.\n\n18 mm d\'épaisseur pour une RTX 3000 Ada Generation et un Core Ultra 9 vPro. Certifications MIL-STD-810H, module de sécurité matériel HP Wolf et écran DreamColor 4K couvrant 100 % du DCI-P3.\n\n• Processeur : Intel Core Ultra 9 185H vPro\n• Carte graphique : NVIDIA RTX 3000 Ada Generation 8 Go\n• Memoire : 64 Go DDR5-5600\n• Stockage : 2 To SSD NVMe\n• Ecran : 16\" DreamColor 3840 × 2400 — 120 Hz — 100 % DCI-P3\n• Clavier : Rétroéclairé, résistant aux projections\n• Autonomie : 9 h en bureautique\n• Poids : 1,80 kg\n• Connectique : 2 × Thunderbolt 4, 2 × USB-A, HDMI 2.1, SD\n• Systeme : Windows 11 Pro','34990.00','5','https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','10','2026-08-17 14:17:14','2026-08-17 14:17:14');
INSERT INTO `produits` VALUES('61','Apple MacBook Air 15\" — M4','Sans ventilateur, sans bruit, sans compromis au quotidien.\n\nPuce M4, 24 Go de mémoire unifiée, 1,51 kg pour 11,5 mm d\'épaisseur. Aucun ventilateur : la machine reste totalement silencieuse et tient une journée et demie de travail réel sur une charge.\n\n• Processeur : Apple M4 — 10 cœurs CPU\n• Carte graphique : GPU intégré 10 cœurs\n• Memoire : 24 Go mémoire unifiée\n• Stockage : 512 Go SSD\n• Ecran : 15,3\" Liquid Retina 2880 × 1864 — 500 nits\n• Clavier : Magic Keyboard rétroéclairé, Touch ID\n• Autonomie : 18 h en lecture vidéo\n• Poids : 1,51 kg\n• Connectique : 2 × Thunderbolt 4, MagSafe 3, jack\n• Systeme : macOS','17990.00','20','https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','11','2026-08-17 14:17:14','2026-08-17 14:17:14');
INSERT INTO `produits` VALUES('62','Lenovo ThinkPad X1 Carbon Gen 13','Le clavier qui a fait la réputation de la gamme.\n\nFibre de carbone, 1,09 kg, douze essais MIL-STD-810H validés. Core Ultra 7 vPro, lecteur d\'empreintes intégré au bouton d\'alimentation et obturateur physique de webcam. L\'outil de travail par excellence.\n\n• Processeur : Intel Core Ultra 7 165U vPro\n• Carte graphique : Intel Graphics intégré\n• Memoire : 32 Go LPDDR5X-6400\n• Stockage : 1 To SSD NVMe\n• Ecran : 14\" IPS 1920 × 1200 — 400 nits — antireflet\n• Clavier : ThinkPad rétroéclairé, TrackPoint\n• Autonomie : 14 h en bureautique\n• Poids : 1,09 kg\n• Connectique : 2 × Thunderbolt 4, 2 × USB-A, HDMI 2.1, jack\n• Systeme : Windows 11 Pro','22490.00','13','https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','11','2026-08-17 14:17:15','2026-08-17 14:17:15');
INSERT INTO `produits` VALUES('63','Lexigam Lumen 14 — OLED 2.8K','L\'OLED à moins de 12 000 DH.\n\nDalle OLED 2,8K 90 Hz, châssis aluminium de 1,29 kg et chargeur USB-C 65 W de la taille d\'un paquet de cartes. Core Ultra 5 avec NPU pour les fonctions d\'IA locales de Windows.\n\n• Processeur : Intel Core Ultra 5 125H (14 cœurs)\n• Carte graphique : Intel Arc intégré\n• Memoire : 16 Go LPDDR5X-6400\n• Stockage : 512 Go SSD NVMe\n• Ecran : 14\" OLED 2880 × 1800 — 90 Hz — 100 % DCI-P3\n• Clavier : Chiclet rétroéclairé blanc\n• Autonomie : 12 h en bureautique\n• Poids : 1,29 kg\n• Connectique : 2 × USB-C DP, USB-A, HDMI 2.1, microSD\n• Systeme : Windows 11 Famille','11990.00','26','https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','11','2026-08-17 14:17:15','2026-08-17 14:17:15');
INSERT INTO `produits` VALUES('64','Dell Latitude 7450 — 2-en-1 tactile','Charnière 360°, stylet inclus.\n\nConvertible professionnel avec charnière 360° et stylet actif 4 096 niveaux de pression. Webcam infrarouge pour Windows Hello, filtre de confidentialité électronique et gestion à distance Dell vPro.\n\n• Processeur : Intel Core Ultra 7 165U vPro\n• Carte graphique : Intel Graphics intégré\n• Memoire : 16 Go LPDDR5X\n• Stockage : 512 Go SSD NVMe\n• Ecran : 14\" IPS tactile 1920 × 1200 — 400 nits\n• Clavier : Rétroéclairé, stylet actif inclus\n• Autonomie : 13 h en bureautique\n• Poids : 1,42 kg\n• Connectique : 2 × Thunderbolt 4, USB-A, HDMI 2.1, microSIM\n• Systeme : Windows 11 Pro','18990.00','12','https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','11','2026-08-17 14:17:15','2026-08-17 14:17:15');
INSERT INTO `produits` VALUES('65','ASUS Zenbook Duo — deux écrans OLED','Deux dalles OLED 14 pouces, un seul sac.\n\nDeux écrans OLED 3K 120 Hz empilés et un clavier Bluetooth détachable : on travaille sur deux moniteurs en déplacement. Le socle intégré maintient la machine en position paysage ou portrait.\n\n• Processeur : Intel Core Ultra 9 185H\n• Carte graphique : Intel Arc intégré\n• Memoire : 32 Go LPDDR5X-7467\n• Stockage : 1 To SSD NVMe\n• Ecran : 2 × 14\" OLED 2880 × 1800 — 120 Hz\n• Clavier : ErgoSense Bluetooth détachable\n• Autonomie : 9 h sur un seul écran\n• Poids : 1,65 kg (avec clavier)\n• Connectique : 2 × Thunderbolt 4, USB-A, HDMI 2.1\n• Systeme : Windows 11 Pro','23990.00','6','https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','11','2026-08-17 14:17:15','2026-08-17 14:17:15');
INSERT INTO `produits` VALUES('66','Lexigam Campus 15 — Ryzen 5 / 16 Go','Tout ce qu\'il faut pour cinq ans d\'études.\n\nRyzen 5 8540U, 16 Go de RAM et un SSD de 512 Go : suffisant pour la bureautique, la programmation et une vingtaine d\'onglets. Clavier résistant aux projections et charnière testée sur 25 000 cycles.\n\n• Processeur : AMD Ryzen 5 8540U (6 cœurs / 12 threads)\n• Carte graphique : AMD Radeon 740M intégré\n• Memoire : 16 Go DDR5-5600 (extensible à 32 Go)\n• Stockage : 512 Go SSD NVMe\n• Ecran : 15,6\" IPS 1920 × 1080 — 300 nits — antireflet\n• Clavier : Pavé numérique, résistant aux projections\n• Autonomie : 11 h en bureautique\n• Poids : 1,70 kg\n• Connectique : USB-C DP, 2 × USB-A, HDMI, lecteur SD, RJ45\n• Systeme : Windows 11 Famille','5490.00','40','https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','12','2026-08-17 14:17:15','2026-08-17 14:17:15');
INSERT INTO `produits` VALUES('67','HP Pavilion Aero 13 — 970 g','Moins d\'un kilo, en magnésium.\n\n970 grammes grâce à un châssis magnésium-aluminium, écran 13,3 pouces WUXGA à 400 nits et Ryzen 7. L\'ultraportable le plus léger de la sélection, sans sacrifier la solidité.\n\n• Processeur : AMD Ryzen 7 7735U (8 cœurs / 16 threads)\n• Carte graphique : AMD Radeon 680M intégré\n• Memoire : 16 Go LPDDR4X\n• Stockage : 512 Go SSD NVMe\n• Ecran : 13,3\" IPS 1920 × 1200 — 400 nits — 100 % sRGB\n• Clavier : Rétroéclairé blanc\n• Autonomie : 11 h en bureautique\n• Poids : 0,97 kg\n• Connectique : 2 × USB-C, 2 × USB-A, HDMI 2.1, jack\n• Systeme : Windows 11 Famille','8490.00','22','https://images.unsplash.com/photo-1588702547923-7093a6c3ba33?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','12','2026-08-17 14:17:15','2026-08-17 14:17:15');
INSERT INTO `produits` VALUES('68','Acer Aspire 14 — Core Ultra 5','Le choix raisonnable, sans mauvaise surprise.\n\nCore Ultra 5 de dernière génération, 16 Go de RAM et un écran 14 pouces WUXGA mat. Deux slots M.2 libres, batterie de 65 Wh et coque partiellement recyclée.\n\n• Processeur : Intel Core Ultra 5 125U (12 cœurs)\n• Carte graphique : Intel Graphics intégré\n• Memoire : 16 Go LPDDR5\n• Stockage : 512 Go SSD NVMe\n• Ecran : 14\" IPS 1920 × 1200 — mat\n• Clavier : Rétroéclairé, lecteur d\'empreintes\n• Autonomie : 12 h en bureautique\n• Poids : 1,40 kg\n• Connectique : 2 × USB-C, 2 × USB-A, HDMI 2.1, RJ45\n• Systeme : Windows 11 Famille','6990.00','30','https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','12','2026-08-17 14:17:15','2026-08-17 14:17:15');
INSERT INTO `produits` VALUES('69','Lexigam Campus 14 Air — 1,25 kg','Le premier laptop, celui qui dure.\n\nEntrée de gamme assumée mais honnête : SSD NVMe (pas d\'eMMC), 8 Go de RAM extensibles, écran IPS mat et une charge USB-C. Le strict nécessaire, correctement fait.\n\n• Processeur : Intel Core i3-1315U (6 cœurs / 8 threads)\n• Carte graphique : Intel UHD Graphics\n• Memoire : 8 Go DDR4 (extensible à 32 Go)\n• Stockage : 256 Go SSD NVMe\n• Ecran : 14\" IPS 1920 × 1080 — mat\n• Clavier : Chiclet non rétroéclairé\n• Autonomie : 10 h en bureautique\n• Poids : 1,25 kg\n• Connectique : USB-C DP, 2 × USB-A, HDMI, microSD\n• Systeme : Windows 11 Famille','4290.00','45','https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','12','2026-08-17 14:17:15','2026-08-17 14:17:15');
INSERT INTO `produits` VALUES('70','ASUS ROG Strix SCAR 18 — RTX 4090 / i9-14900HX','Le sommet du catalogue. Rien ne le fait plier.\n\nDalle 18 pouces ROG Nebula HDR Mini-LED QHD+ 240 Hz, Intel Core i9-14900HX, GeForce RTX 4090 16 Go poussée à 175 W, 64 Go DDR5-5600 et 2 To NVMe Gen4. Chambre à vapeur pleine largeur et métal liquide sur le processeur : c\'est ce qui tient la fréquence en charge longue, deux emplacements SO-DIMM et deux M.2 restent accessibles.\n\n• Processeur : Intel Core i9-14900HX (24 cœurs / 32 threads)\n• Carte graphique : NVIDIA GeForce RTX 4090 Laptop 16 Go GDDR6 — 175 W\n• Memoire : 64 Go DDR5-5600 (2 × 32 Go)\n• Stockage : 2 To SSD NVMe PCIe Gen4\n• Ecran : 18\" Mini-LED 2560 × 1600 — 240 Hz — 1 200 nits\n• Clavier : Chiclet RGB par touche, pavé numérique\n• Autonomie : 5 h en bureautique\n• Poids : 3,10 kg\n• Connectique : Thunderbolt 4, USB-C DP 100 W, 2 × USB-A 3.2, HDMI 2.1, RJ45 2,5 Gb\n• Systeme : Windows 11 Famille','38990.00','0','https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','9','2026-08-21 22:24:02','2026-08-28 20:40:19');
INSERT INTO `produits` VALUES('71','MSI Stealth 16 AI Studio — OLED 240 Hz / RTX 4070','Le 240 Hz OLED dans 1,9 cm d\'épaisseur.\n\nChâssis aluminium noir de 19,9 mm. Écran OLED QHD+ 240 Hz couvrant 100 % du DCI-P3, Intel Core Ultra 9 185H, RTX 4070 8 Go et 32 Go de LPDDR5X. Batterie de 99,9 Wh — la limite autorisée en cabine — et deux Thunderbolt 4 : la machine de gaming qui se transporte comme un ultrabook.\n\n• Processeur : Intel Core Ultra 9 185H (16 cœurs / 22 threads)\n• Carte graphique : NVIDIA GeForce RTX 4070 Laptop 8 Go GDDR6\n• Memoire : 32 Go LPDDR5X-7467 (soudée)\n• Stockage : 1 To SSD NVMe PCIe Gen4\n• Ecran : 16\" OLED 2560 × 1600 — 240 Hz — 0,2 ms\n• Clavier : SteelSeries RGB par touche\n• Autonomie : 7 h en bureautique\n• Poids : 1,99 kg\n• Connectique : 2 × Thunderbolt 4, USB-A 3.2, HDMI 2.1, lecteur microSD\n• Systeme : Windows 11 Famille','29990.00','5','https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','9','2026-08-21 22:24:02','2026-08-29 16:43:50');
INSERT INTO `produits` VALUES('72','Lenovo LOQ 15 — RTX 4060 / i7-13650HX','Le point d\'entrée honnête vers les 144 Hz.\n\n144 Hz en Full HD, RTX 4060 8 Go et Core i7-13650HX : la configuration qui tient les jeux compétitifs à plus de 200 fps en 1080p sans surpayer. Deux emplacements SO-DIMM et deux slots M.2 pour évoluer plus tard — c\'est rare à ce prix, et c\'est ce qui fait durer la machine.\n\n• Processeur : Intel Core i7-13650HX (14 cœurs / 20 threads)\n• Carte graphique : NVIDIA GeForce RTX 4060 Laptop 8 Go GDDR6\n• Memoire : 16 Go DDR5-5200 (2 × 8 Go, extensible à 32 Go)\n• Stockage : 1 To SSD NVMe PCIe Gen4\n• Ecran : 15,6\" IPS 1920 × 1080 — 144 Hz — 300 nits\n• Clavier : Rétroéclairé blanc, pavé numérique\n• Autonomie : 6 h en bureautique\n• Poids : 2,40 kg\n• Connectique : USB-C DP, 3 × USB-A, HDMI 2.1, RJ45\n• Systeme : Windows 11 Famille','13490.00','22','https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','9','2026-08-21 22:24:02','2026-08-29 16:43:50');
INSERT INTO `produits` VALUES('73','HP ZBook Fury 16 G11 — RTX 2000 Ada certifiée','Pilotes certifiés CAO. Pas de surprise en production.\n\nStation mobile pensée pour SolidWorks, AutoCAD et Revit : RTX 2000 Ada 8 Go avec pilotes ISV certifiés, 64 Go de DDR5 ECC et une dalle 16 pouces 2 560 × 1 600 à 120 Hz couvrant 100 % du DCI-P3. La RAM à code correcteur d\'erreurs n\'accélère rien : elle évite le calcul qu\'il faudrait refaire.\n\n• Processeur : Intel Core i7-14700HX (20 cœurs / 28 threads)\n• Carte graphique : NVIDIA RTX 2000 Ada 8 Go — pilotes ISV certifiés\n• Memoire : 64 Go DDR5-5600 ECC\n• Stockage : 2 To SSD NVMe PCIe Gen4\n• Ecran : 16\" IPS 2560 × 1600 — 120 Hz — 500 nits — 100 % DCI-P3\n• Clavier : Rétroéclairé blanc, pavé numérique\n• Autonomie : 8 h en bureautique\n• Poids : 2,40 kg\n• Connectique : 2 × Thunderbolt 4, 2 × USB-A, HDMI 2.1, RJ45, SD UHS-II\n• Systeme : Windows 11 Pro','24990.00','6','https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','10','2026-08-21 22:24:02','2026-08-21 22:24:02');
INSERT INTO `produits` VALUES('74','ASUS Zenbook 14 OLED — Core Ultra 5','L\'OLED à moins de 12 000 DH.\n\nDalle OLED 3K 120 Hz, châssis aluminium de 1,22 kg et chargeur USB-C 65 W de la taille d\'un paquet de cartes. Core Ultra 5 avec NPU pour les fonctions d\'IA locales de Windows, et deux Thunderbolt 4 sur une machine à ce prix — c\'est ce qui la distingue de tout le reste du rayon.\n\n• Processeur : Intel Core Ultra 5 125H (14 cœurs / 18 threads)\n• Carte graphique : Intel Arc intégré\n• Memoire : 16 Go LPDDR5X-7467 (soudée)\n• Stockage : 512 Go SSD NVMe PCIe Gen4\n• Ecran : 14\" OLED 2880 × 1800 — 120 Hz — 100 % DCI-P3\n• Clavier : Chiclet rétroéclairé blanc\n• Autonomie : 12 h en bureautique\n• Poids : 1,22 kg\n• Connectique : 2 × Thunderbolt 4, USB-A 3.2, HDMI 2.1, jack 3,5 mm\n• Systeme : Windows 11 Famille','11990.00','26','https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','11','2026-08-21 22:24:02','2026-08-21 22:24:02');
INSERT INTO `produits` VALUES('75','Acer Aspire 5 15 — Ryzen 5 / 16 Go','Tout ce qu\'il faut pour cinq ans d\'études.\n\nRyzen 5 7530U, 16 Go de RAM et un SSD de 512 Go : suffisant pour la bureautique, la programmation et une vingtaine d\'onglets. Deux emplacements SO-DIMM, un clavier rétroéclairé avec pavé numérique et une dalle IPS mate — les trois choses qu\'on regrette quand elles manquent.\n\n• Processeur : AMD Ryzen 5 7530U (6 cœurs / 12 threads)\n• Carte graphique : AMD Radeon intégré (Vega 7)\n• Memoire : 16 Go DDR4-3200 (2 × 8 Go, extensible à 32 Go)\n• Stockage : 512 Go SSD NVMe\n• Ecran : 15,6\" IPS 1920 × 1080 — mat\n• Clavier : Rétroéclairé, pavé numérique\n• Autonomie : 11 h en bureautique\n• Poids : 1,78 kg\n• Connectique : USB-C 3.2 DP, 2 × USB-A 3.2, HDMI 2.1, jack 3,5 mm\n• Systeme : Windows 11 Famille','5490.00','40','https://images.unsplash.com/photo-1602081957921-9137a5d6eaee?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','12','2026-08-21 22:24:02','2026-08-21 22:24:02');
INSERT INTO `produits` VALUES('76','Lenovo V14 G4 — i3 / SSD NVMe','Le premier laptop, celui qui dure.\n\nEntrée de gamme assumée mais honnête : SSD NVMe (pas d\'eMMC), deux emplacements SO-DIMM pour la mémoire et une dalle IPS mate de 300 nits. Le strict nécessaire, correctement fait — et les deux pièces qu\'on remplace soi-même restent accessibles.\n\n• Processeur : Intel Core i3-1315U (6 cœurs / 8 threads)\n• Carte graphique : Intel UHD Graphics\n• Memoire : 8 Go DDR4-3200 (2 emplacements SO-DIMM, extensible à 16 Go)\n• Stockage : 256 Go SSD NVMe\n• Ecran : 14\" IPS 1920 × 1080 — mat — 300 nits\n• Clavier : Chiclet non rétroéclairé\n• Autonomie : 8 h en bureautique\n• Poids : 1,37 kg\n• Connectique : USB-C 3.2 DP, 2 × USB-A 3.2, HDMI 1.4b, jack 3,5 mm\n• Systeme : Windows 11 Famille','4290.00','45','https://images.unsplash.com/photo-1516387938699-a93567ec168e?w=1200&auto=format&fit=crop&q=80','approved',NULL,'2','12','2026-08-21 22:24:02','2026-08-21 22:24:02');

DROP TABLE IF EXISTS `retours`;
CREATE TABLE `retours` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint unsigned NOT NULL,
  `ligne_commande_id` bigint unsigned NOT NULL,
  `quantite` int NOT NULL,
  `raison` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `statut` enum('en_attente','accepte','refuse') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'en_attente',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `retours_user_id_foreign` (`user_id`),
  KEY `retours_ligne_commande_id_foreign` (`ligne_commande_id`),
  CONSTRAINT `retours_ligne_commande_id_foreign` FOREIGN KEY (`ligne_commande_id`) REFERENCES `ligne_commandes` (`id`) ON DELETE CASCADE,
  CONSTRAINT `retours_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `sessions`;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `user_id` bigint unsigned DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8mb4_unicode_ci,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_activity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` enum('admin','vendeur','client') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'client',
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `users` VALUES('1','Directeur Admin Lexigam','admin@test.com',NULL,'$2y$12$m2/daAstacIeRFPqj.jF1OhYuApLNxGEAeuvMtc4eb2xYUJAxbnja',NULL,'2026-08-15 16:39:43','2026-08-15 16:39:43','admin');
INSERT INTO `users` VALUES('2','Boutique Gaming Pro (Vendeur)','vendeur@test.com',NULL,'$2y$12$d4QODmJGuGQ19DNxzemv4u4.GxKZnyQ63HbnZyApjrJx0bSFrCi6S',NULL,'2026-08-15 16:39:43','2026-08-15 16:39:43','vendeur');
INSERT INTO `users` VALUES('3','Youssef El Amrani','client@test.com',NULL,'$2y$12$OWxr9S6eHukLdQNMjxaH9e6WwO9GCf9jI7Fgs3h4k8e9xhvGF2ai6',NULL,'2026-08-15 16:39:44','2026-08-15 16:39:44','client');
INSERT INTO `users` VALUES('4','Apex Hardware & Laptops','techstore@lexigam.com',NULL,'$2y$12$y5Y/zfK9wSQxroAmdmEKUu5qMLO8W.0hYl.D2OBrh36f/WZCS/NQG',NULL,'2026-08-15 16:39:44','2026-08-15 16:39:44','vendeur');
INSERT INTO `users` VALUES('5','Sarah Benali','sarah@test.com',NULL,'$2y$12$/s4mfe/F4NLNXupT2pNs2ewtsw242OebFSZXDinSMN9tisOwBzPiS',NULL,'2026-08-15 16:39:45','2026-08-15 16:39:45','client');
INSERT INTO `users` VALUES('6','Mehdi Kabbaj','mehdi@test.com',NULL,'$2y$12$jr1EOAeszJQS9kfm6JLvWOP1QGtzoXbZQn8UNfS/oId4sCHFvcRhe',NULL,'2026-08-15 16:39:46','2026-08-15 16:39:46','client');
INSERT INTO `users` VALUES('7','Amine Tazi','amine@test.com',NULL,'$2y$12$gxS.b5snGHcnLv.IF00jEu3flIFecil8nyXUBb3qO8GfPccw.1YK2',NULL,'2026-08-15 16:39:46','2026-08-15 16:39:46','client');

SET FOREIGN_KEY_CHECKS = 1;
