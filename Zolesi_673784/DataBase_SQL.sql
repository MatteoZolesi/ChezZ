-- Progettazione Web 
DROP DATABASE if exists utentichezz; 
CREATE DATABASE utentichezz; 
USE utentichezz; 
-- MySQL dump 10.13  Distrib 5.7.28, for Win64 (x86_64)
--
-- Host: localhost    Database: utentichezz
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

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
-- Table structure for table `utenti`
--

DROP TABLE IF EXISTS `utenti`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `utenti` (
  `Username` varchar(20) NOT NULL,
  `Hash` varchar(255) NOT NULL,
  `Punti` int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (`Username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utenti`
--

LOCK TABLES `utenti` WRITE;
/*!40000 ALTER TABLE `utenti` DISABLE KEYS */;
INSERT INTO `utenti` VALUES ('BobbyFischer','$2y$10$UjEEmnrHmzkByZY/AWjdp.Ng7Cro5XmiwiW9qkx2/SLhQ2vS.r.TW',2785),('Dario14','$2y$10$oggKgAOAT/sWh8lg8qOIxe3ucnMcgTfbAPsGJbtpyxXpPgFROsXyG',0),('FabianoCaruana','$2y$10$cKat7Vb7CI0hwCiGDgicR.QgO2iVrVpM9C/xUibP32uoxLzKg0xqO',2795),('GarryKasparov','$2y$10$.OGLknvRcr2WlqoBSdSJ8esr9mVo4u3q3vhv4e9BxlFG74di4iAR.',2812),('HikaruNakamura','$2y$10$HWn2aMyihRj0cqgDPc9ooO3aGGLZWp.5ikEGuquewsJIJAYCggDvG',2810),('MagnusCarlsen','$2y$10$jNVaV.ELqEGQAEDGcd.yQ.PiwTAr9EYJXQN12HUD.Xhkwl7wBqHeO',2840),('Matteo09','$2y$10$U2nBwVmBk9GuYWFxV8dLeu/am9vvBMWm9a/mRSOqM62tZay6DiXMW',38),('Salvo12','$2y$10$SD1JQnnUugOapDTktGYnMOIoGA0/p2.J0YY3PczGJh24tLc3wZdAq',17),('VincentKeymer','$2y$10$VHB4V7IhNHjDOjWJu.rhhuHk5aU4eUYUcpYfx0T3Ty1yK6QjsTXoK',2776);
/*!40000 ALTER TABLE `utenti` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-02-15 21:56:46
