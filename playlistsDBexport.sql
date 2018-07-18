-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 18, 2018 at 10:59 PM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `playlist`
--

-- --------------------------------------------------------

--
-- Table structure for table `playlists`
--

CREATE TABLE `playlists` (
  `id` int(11) NOT NULL,
  `name` varchar(100) CHARACTER SET hp8 COLLATE hp8_bin NOT NULL,
  `image` varchar(1000) CHARACTER SET hp8 COLLATE hp8_bin NOT NULL,
  `songs` text CHARACTER SET hp8 COLLATE hp8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Dumping data for table `playlists`
--

INSERT INTO `playlists` (`id`, `name`, `image`, `songs`) VALUES
(2, 'Dua Lipa & More', 'images/dualipa.jpg', '[{\"name\":\"Calvin Harris Dua Lipa - One Kiss\",\"url\":\"music\\/Calvin Harris Dua Lipa - One Kiss.mp3\"},{\"name\":\"Dua Lipa - Be The One\",\"url\":\"music\\/Dua Lipa - Be The One.mp3\"},{\"name\":\"Dua Lipa - Hotter Than Hell\",\"url\":\"music\\/Dua Lipa - Hotter Than Hell.mp3\"},{\"name\":\"Dua Lipa - New Rules\",\"url\":\"music\\/Dua Lipa - New Rules.mp3\"},{\"name\":\"Kendrick Lamar SZA - All The Stars\",\"url\":\"music\\/Kendrick Lamar SZA - All The Stars.mp3\"},{\"name\":\"Post Malone - rockstar ft. 21 Savage\",\"url\":\"music\\/Post Malone - rockstar ft. 21 Savage.mp3\"}]'),
(16, 'Halleluja', 'https://upload.wikimedia.org/wikipedia/he/2/27/Justin_Bieber_-_Purpose_%28Official_Album_Cover%29.png', '[{\"name\":\"Rihanna - Needed Me\",\"url\":\"music\\/Rihanna - Needed Me.mp3\"},{\"name\":\"Mura Masa - Lovesick ft. AsAP Rocky\",\"url\":\"music\\/Mura Masa - Lovesick ft. AsAP Rocky.mp3\"},{\"name\":\"Tove Lo - Talking Body - Gryffin Remix\",\"url\":\"music\\/Tove Lo - Talking Body - Gryffin Remix.mp3\"},{\"name\":\"The Weeknd - I Feel It Coming ft. Daft Punk\",\"url\":\"music\\/The Weeknd - I Feel It Coming ft. Daft Punk.mp3\"},{\"name\":\"Sting - Shape of My Heart (Leon)\",\"url\":\"music\\/Sting - Shape of My Heart (Leon).mp3\"},{\"name\":\"Duke Dumont - Ocean Drive\",\"url\":\"music\\/Duke Dumont - Ocean Drive.mp3\"},{\"name\":\"Ash - Mosa\\u00efque\",\"url\":\"music\\/Ash - Mosa\\u00efque.mp3\"}]'),
(19, 'Glorious', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0dN1m8_oCinWYVn4QRYED8c6iL93pH2f_VCFJH-eiYuVxnbi45g', '[{\"name\":\"Kendrick Lamar SZA - All The Stars\",\"url\":\"music\\/Kendrick Lamar SZA - All The Stars.mp3\"},{\"name\":\"Calvin Harris Dua Lipa - One Kiss\",\"url\":\"music\\/Calvin Harris Dua Lipa - One Kiss.mp3\"},{\"name\":\"Stromae - Tous Les M\\u00eames\",\"url\":\"music\\/Stromae - Tous Les M\\u00eames.mp3\"},{\"name\":\"The_Weeknd-losers_feat labrinth\",\"url\":\"music\\/The_Weeknd-losers_feat labrinth.mp3\"}]'),
(20, 'Music Dreams', 'https://pro2-bar-s3-cdn-cf2.myportfolio.com/815a903e2d1a98c98002467bb05f5bd3/351a311c81d8ddbf91e2079e_rw_1920.png?h=2f0cfed5f2891b49a3fd7043846c5121', '[{\"name\":\"Stromae - Tous Les M\\u00eames\",\"url\":\"music\\/Stromae - Tous Les M\\u00eames.mp3\"},{\"name\":\"Tove Lo - Talking Body - Gryffin Remix\",\"url\":\"music\\/Tove Lo - Talking Body - Gryffin Remix.mp3\"},{\"name\":\"Rihanna - Needed Me\",\"url\":\"music\\/Rihanna - Needed Me.mp3\"},{\"name\":\"Post Malone - rockstar ft. 21 Savage\",\"url\":\"music\\/Post Malone - rockstar ft. 21 Savage.mp3\"},{\"name\":\"Mura Masa - Lovesick ft. AsAP Rocky\",\"url\":\"music\\/Mura Masa - Lovesick ft. AsAP Rocky.mp3\"},{\"name\":\"Dua Lipa - New Rules\",\"url\":\"music\\/Dua Lipa - New Rules.mp3\"}]'),
(24, 'Cool \"Itay\" Jams', 'https://blog.spoongraphics.co.uk/wp-content/uploads/2017/album-art/22.jpg', '[{\"name\":\"Tove Lo - Talking Body - Gryffin Remix\",\"url\":\"music\\/Tove Lo - Talking Body - Gryffin Remix.mp3\"},{\"name\":\"Dua Lipa - Be The One\",\"url\":\"music\\/Dua Lipa - Be The One.mp3\"},{\"name\":\"Dua Lipa - Hotter Than Hell\",\"url\":\"music\\/Dua Lipa - Hotter Than Hell.mp3\"},{\"name\":\"Ash - Mosa\\u00efque\",\"url\":\"music\\/Ash - Mosa\\u00efque.mp3\"},{\"name\":\"Mura Masa - Lovesick ft. AsAP Rocky\",\"url\":\"music\\/Mura Masa - Lovesick ft. AsAP Rocky.mp3\"}]'),
(37, 'Just some random hits', 'https://www.designformusic.com/wp-content/uploads/2015/12/Taking-The-High-Road-500x500.jpg', '[{\"name\":\"Rihanna - Needed Me\",\"url\":\"music\\/Rihanna - Needed Me.mp3\"},{\"name\":\"The Weeknd - I Feel It Coming ft. Daft Punk\",\"url\":\"music\\/The Weeknd - I Feel It Coming ft. Daft Punk.mp3\"}]');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `playlists`
--
ALTER TABLE `playlists`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `playlists`
--
ALTER TABLE `playlists`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
