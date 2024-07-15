-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Oct 03, 2023 at 07:34 PM
-- Server version: 10.4.21-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fixitfast`
--

-- --------------------------------------------------------

--
-- Table structure for table `devices`
--

CREATE TABLE `devices` (
  `id` int(11) NOT NULL,
  `phoneid` varchar(45) DEFAULT NULL,
  `brand` varchar(45) DEFAULT NULL,
  `model` varchar(45) DEFAULT NULL,
  `displayName` varchar(45) DEFAULT NULL,
  `screen` int(11) DEFAULT NULL,
  `battery` int(11) DEFAULT NULL,
  `frontcamera` int(11) DEFAULT NULL,
  `backcamera` int(11) DEFAULT NULL,
  `chargingport` int(11) DEFAULT NULL,
  `speaker` int(11) DEFAULT NULL,
  `housing` int(11) DEFAULT NULL,
  `homebutton` int(11) NOT NULL,
  `imgSrc` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `devices`
--

INSERT INTO `devices` (`id`, `phoneid`, `brand`, `model`, `displayName`, `screen`, `battery`, `frontcamera`, `backcamera`, `chargingport`, `speaker`, `housing`, `homebutton`, `imgSrc`) VALUES
(44, 'iphone6', 'iPhone', '6', 'iPhone 6', 80, 60, 50, 50, 70, 50, 100, 40, 'iPhone/iPhone6.jpg'),
(45, 'iphone6plus', 'iPhone', '6 Plus', 'iPhone 6 Plus', 80, 60, 50, 50, 70, 50, 100, 40, 'iPhone/iPhone6Plus.jpg'),
(46, 'iphone6s', 'iPhone', '6s', 'iPhone 6s', 80, 60, 50, 50, 70, 50, 100, 40, 'iPhone/iPhone6s.jpg'),
(47, 'iphone6splus', 'iPhone', '6s Plus', 'iPhone 6s Plus', 80, 60, 50, 50, 70, 50, 100, 40, 'iPhone/iPhone6sPlus.jpg'),
(48, 'iphone7', 'iPhone', '7', 'iPhone 7', 80, 60, 50, 50, 70, 50, 100, 60, 'iPhone/iPhone7.jpg'),
(49, 'iphone7plus', 'iPhone', '7 Plus', 'iPhone 7 Plus', 80, 60, 50, 50, 70, 50, 100, 60, 'iPhone/iPhone7Plus.jpg'),
(50, 'iphone8', 'iPhone', '8', 'iPhone 8', 80, 60, 50, 50, 70, 50, 100, 60, 'iPhone/iPhone8.jpg'),
(51, 'iphone8plus', 'iPhone', '8 Plus', 'iPhone 8 Plus', 140, 80, 75, 100, 90, 70, 150, 60, 'iPhone/iPhone8Plus.jpg'),
(52, 'iphonex', 'iPhone', 'X', 'iPhone X', 140, 80, 75, 100, 90, 70, 150, 0, 'iPhone/iPhoneX.jpg'),
(53, 'iphonexr', 'iPhone', 'XR', 'iPhone XR', 140, 80, 75, 100, 90, 70, 150, 0, 'iPhone/iPhoneXR.jpg'),
(54, 'iphonexs', 'iPhone', 'Xs', 'iPhone Xs', 140, 80, 75, 100, 90, 70, 150, 0, 'iPhone/iPhoneXs.jpg'),
(55, 'iphonexsmax', 'iPhone', 'Xs Max', 'iPhone Xs Max', 140, 80, 75, 100, 90, 70, 150, 0, 'iPhone/iPhoneXsMax.jpg'),
(56, 'iphone11', 'iPhone', '11', 'iPhone 11', 140, 80, 75, 100, 90, 70, 150, 0, 'iPhone/iPhone11.jpg'),
(57, 'iphone11pro', 'iPhone', '11 Pro', 'iPhone 11 Pro', 140, 80, 75, 100, 90, 70, 150, 0, 'iPhone/iPhone11Pro.jpg'),
(58, 'iphone11promax', 'iPhone', '11 Pro Max', 'iPhone 11 Pro Max', 200, 80, 100, 150, 100, 90, 250, 0, 'iPhone/iPhone11ProMax.jpg'),
(59, 'iphone12', 'iPhone', '12', 'iPhone 12', 200, 80, 100, 150, 100, 90, 250, 0, 'iPhone/iPhone12.jpg'),
(60, 'iphone12mini', 'iPhone', '12 Mini', 'iPhone 12 Mini', 200, 80, 100, 150, 100, 90, 250, 0, 'iPhone/iPhone12Mini.jpg'),
(61, 'iphone12pro', 'iPhone', '12 Pro', 'iPhone 12 Pro', 200, 80, 100, 150, 100, 90, 250, 0, 'iPhone/iPhone12Pro.jpg'),
(62, 'iphone12promax', 'iPhone', '12 Pro Max', 'iPhone 12 Pro Max', 200, 80, 100, 150, 100, 90, 250, 0, 'iPhone/iPhone12ProMax.jpg'),
(63, 'iphone13', 'iPhone', '13', 'iPhone 13', 200, 80, 100, 150, 100, 90, 250, 0, 'iPhone/iPhone13.jpg'),
(64, 'iphone13mini', 'iPhone', '13 Mini', 'iPhone 13 Mini', 200, 80, 100, 150, 100, 90, 250, 0, 'iPhone/iPhone13Mini.jpg'),
(65, 'iphone13pro', 'iPhone', '13 Pro', 'iPhone 13 Pro', 200, 80, 100, 150, 100, 90, 250, 0, 'iPhone/iPhone13Pro.jpg'),
(66, 'iphone13promax', 'iPhone', '13 Pro Max', 'iPhone 13 Pro Max', 200, 80, 100, 150, 100, 90, 250, 0, 'iPhone/iPhone13ProMax.jpg'),
(67, 'iphone14', 'iPhone', '14', 'iPhone 14', 275, 100, 140, 175, 100, 90, 250, 0, 'iPhone/iPhone14.jpg'),
(68, 'iphone14plus', 'iPhone', '14 Plus', 'iPhone 14 Plus', 275, 100, 140, 175, 100, 90, 250, 0, 'iPhone/iPhone14Plus.jpg'),
(69, 'iphone14pro', 'iPhone', '14 Pro', 'iPhone 14 Pro', 275, 100, 140, 175, 100, 90, 250, 0, 'iPhone/iPhone14Pro.jpg'),
(70, 'iphone14promax', 'iPhone', '14 Pro Max', 'iPhone 14 Pro Max', 275, 100, 140, 175, 100, 90, 250, 0, 'iPhone/iPhone14ProMax.jpg'),
(71, 'iphonese1stgen', 'iPhone', 'SE 1st Gen', 'iPhone SE 1st Gen', 275, 100, 140, 175, 100, 90, 250, 40, 'iPhone/iPhoneSE1stgen.jpg'),
(72, 'iphonese2ndgen', 'iPhone', 'SE 2nd Gen', 'iPhone SE 2nd Gen', 275, 100, 140, 175, 100, 90, 250, 50, 'iPhone/iPhoneSE2ndGen.jpg'),
(73, 'iphonese3rdgen', 'iPhone', 'SE 3rd Gen', 'iPhone SE 3rd Gen', 275, 100, 140, 175, 100, 90, 250, 60, 'iPhone/iPhoneSE3rdgen.jpg'),
(74, 'samsungs20', 'Samsung', 'S20', 'Samsung S20', 275, 100, 140, 175, 100, 90, 250, 0, 'GalaxyS/GalaxyS20.jpg'),
(75, 'samsungs20plus', 'Samsung', 'S20 Plus', 'Samsung S20 Plus', 275, 100, 140, 175, 100, 90, 250, 0, 'GalaxyS/GalaxyS20Plus.jpg'),
(76, 'samsungs20ultra', 'Samsung', 'S20 Ultra', 'Samsung S20 Ultra', 275, 100, 140, 175, 100, 90, 250, 0, 'GalaxyS/GalaxyS20Ultra.jpg'),
(77, 'samsungs21', 'Samsung', 'S21', 'Samsung S21', 275, 100, 140, 175, 100, 90, 250, 0, 'GalaxyS/GalaxyS21.jpg'),
(78, 'samsungs21plus', 'Samsung', 'S21 Plus', 'Samsung S21 Plus', 275, 100, 140, 175, 100, 90, 250, 0, 'GalaxyS/GalaxyS21Plus.jpg'),
(79, 'samsungs21ultra', 'Samsung', 'S21 Ultra', 'Samsung S21 Ultra', 275, 100, 140, 175, 100, 90, 250, 0, 'GalaxyS/GalaxyS21Ultra.jpg'),
(80, 'samsungs22', 'Samsung', 'S22', 'Samsung S22', 275, 100, 140, 175, 100, 90, 250, 0, 'GalaxyS/GalaxyS22.jpg'),
(81, 'samsungs22plus', 'Samsung', 'S22 Plus', 'Samsung S22 Plus', 275, 100, 140, 175, 100, 90, 250, 0, 'GalaxyS/GalaxyS22Plus.jpg'),
(82, 'samsungs22ultra', 'Samsung', 'S22 Ultra', 'Samsung S22 Ultra', 275, 100, 140, 175, 100, 90, 250, 0, 'GalaxyS/GalaxyS22Ultra.jpg'),
(83, 'samsungs23', 'Samsung', 'S23', 'Samsung S23', 275, 100, 140, 175, 100, 90, 250, 0, 'GalaxyS/GalaxyS23.jpg'),
(84, 'samsungs23plus', 'Samsung', 'S23 Plus', 'Samsung S23 Plus', 275, 100, 140, 175, 100, 90, 250, 0, 'GalaxyS/GalaxyS23Plus.jpg'),
(85, 'samsungs23ultra', 'Samsung', 'S23 Ultra', 'Samsung S23 Ultra', 275, 100, 140, 175, 100, 90, 250, 0, 'GalaxyS/GalaxyS23Ultra.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `tickets`
--

CREATE TABLE `tickets` (
  `id` int(11) NOT NULL,
  `account_id` int(11) NOT NULL,
  `phone_id` int(11) NOT NULL,
  `price` int(11) DEFAULT NULL,
  `repair_name` varchar(45) NOT NULL,
  `phone_serial` varchar(45) NOT NULL,
  `phone_pin` varchar(45) DEFAULT NULL,
  `user_mobile` varchar(45) NOT NULL,
  `address` varchar(45) NOT NULL,
  `address_apt` varchar(45) DEFAULT NULL,
  `address_city` varchar(45) NOT NULL,
  `address_state` varchar(45) NOT NULL,
  `address_post` varchar(45) NOT NULL,
  `assigned_to` int(11) DEFAULT NULL,
  `status` int(4) DEFAULT -1,
  `created_at` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Table structure for table `ticket_notes`
--

CREATE TABLE `ticket_notes` (
  `id` int(11) NOT NULL,
  `ticket_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `staff_only` tinyint(1) NOT NULL,
  `status_change` int(4) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(128) NOT NULL,
  `fullname` varchar(100) NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp(),
  `last_login` datetime DEFAULT NULL,
  `is_admin` tinyint(4) DEFAULT 0,
  `verifytoken` varchar(128) DEFAULT NULL,
  `active` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


--
-- Indexes for table `devices`
--
ALTER TABLE `devices`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tickets`
--
ALTER TABLE `tickets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `account_id` (`account_id`),
  ADD KEY `assigned_to` (`assigned_to`),
  ADD KEY `phone_id` (`phone_id`);

--
-- Indexes for table `ticket_notes`
--
ALTER TABLE `ticket_notes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ticket_id` (`ticket_id`),
  ADD KEY `staff_id` (`staff_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `devices`
--
ALTER TABLE `devices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT for table `tickets`
--
ALTER TABLE `tickets`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=100102;

--
-- AUTO_INCREMENT for table `ticket_notes`
--
ALTER TABLE `ticket_notes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tickets`
--
ALTER TABLE `tickets`
  ADD CONSTRAINT `account_id` FOREIGN KEY (`account_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `assigned_to` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `phone_id` FOREIGN KEY (`phone_id`) REFERENCES `devices` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `ticket_notes`
--
ALTER TABLE `ticket_notes`
  ADD CONSTRAINT `staff_id` FOREIGN KEY (`staff_id`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `ticket_id` FOREIGN KEY (`ticket_id`) REFERENCES `tickets` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
