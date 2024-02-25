-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 25, 2024 at 07:38 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `course`
--

-- --------------------------------------------------------

--
-- Table structure for table `contact`
--

CREATE TABLE `contact` (
  `id` int(250) NOT NULL,
  `name` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `phone` varchar(500) NOT NULL,
  `subject` varchar(500) NOT NULL,
  `message` longtext NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contact`
--

INSERT INTO `contact` (`id`, `name`, `email`, `phone`, `subject`, `message`, `date`) VALUES
(1, 'Sanjay Sokal', 'sokalsanjay@gmail.com', '08295673601', 'Grow With Us Ventures', 'test', '2024-01-03 11:13:03'),
(2, 'Sanjay Sokal', 'sokalsanjay@gmail.com', '08295673601', 'Grow With Us Ventures', 'tests', '2024-01-03 11:14:43'),
(3, 'Sanjay Sokal', 'sokalsanjay@gmail.com', '08295673601', 'Java Developer', 'tsdg', '2024-01-03 11:16:23'),
(4, 'Sanjay Sokal', 'sokalsanjay@gmail.com', '08295673601', 'kop;kj', 'fgdjfg', '2024-01-03 11:16:36');

-- --------------------------------------------------------

--
-- Table structure for table `coupans`
--

CREATE TABLE `coupans` (
  `id` int(250) NOT NULL,
  `courses` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`courses`)),
  `code` varchar(500) NOT NULL,
  `discount` int(250) NOT NULL,
  `active` enum('0','1') NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `coupans`
--

INSERT INTO `coupans` (`id`, `courses`, `code`, `discount`, `active`, `date`) VALUES
(1, '[1,3]', 'FIRST100', 40, '0', '2024-01-22 01:03:47'),
(2, '[1,3]', 'test', 30, '0', '2024-01-22 01:04:19'),
(3, '2', 'FIRST10', 50, '0', '2024-01-21 12:57:48'),
(4, '[\"7\",\"5\",\"3\",\"2\",\"1\"]', 'sgg', 50, '1', '2024-01-21 13:09:32'),
(5, '\"6,4,2,1\"', 'testaefsdf', 50, '0', '2024-01-21 13:07:46'),
(6, '[7,6,5,4,3,2,1]', 'afsdsfdgdfg', 50, '0', '2024-01-21 13:08:32');

-- --------------------------------------------------------

--
-- Table structure for table `course`
--

CREATE TABLE `course` (
  `id` int(250) NOT NULL,
  `name` varchar(500) NOT NULL,
  `price` varchar(500) NOT NULL,
  `description` longtext NOT NULL,
  `tech` longtext NOT NULL,
  `image` varchar(500) NOT NULL,
  `link` varchar(500) NOT NULL,
  `instructor` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`instructor`)),
  `duration` varchar(500) NOT NULL,
  `access` varchar(500) NOT NULL,
  `language` varchar(500) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `course`
--

INSERT INTO `course` (`id`, `name`, `price`, `description`, `tech`, `image`, `link`, `instructor`, `duration`, `access`, `language`, `date`) VALUES
(1, 'Web Development', '3500', '<p>\n                                        Welcome to our comprehensive Web Development course, where you\'ll embark on an immersive journey into the world of modern web technologies. Dive into the building blocks of the web with HTML and CSS, crafting visually appealing and responsive layouts. Explore the power of JavaScript, mastering its functionalities to create dynamic and interactive web experiences. Delve into the basics of ReactJS, a popular library for building user interfaces, and elevate your skills in crafting efficient, component-based applications. This course isn\'t just about learning languages—it\'s about crafting your path towards becoming a versatile web developer.\n                                    </p>\n                                    <p>\n                                        Our hands-on approach integrates practical exercises, real-world projects, and expert guidance to reinforce your understanding at every step. Engage with industry-standard tools and gain insights from seasoned professionals, ensuring you\'re equipped with the skills demanded by today\'s tech landscape. Whether you\'re a beginner or seeking to enhance your proficiency, join us on this enriching journey to master the art and science of web development.\n                                    </p>', '[\"HTML\",\"CSS\",\"JavaScript\",\"ReactJS\"]', '', 'web-development', '1', '6 Months', 'Life Time', 'English & Hindi', '2024-01-09 00:56:13'),
(2, 'Java Springboot', '5500', '<p>Welcome to our comprehensive Web Development course, where you\'ll embark on an immersive journey into the world of modern web technologies. Dive into the building blocks of the web with HTML and CSS, crafting visually appealing and responsive layouts. Explore the power of JavaScript, mastering its functionalities to create dynamic and interactive web experiences. Delve into the basics of ReactJS, a popular library for building user interfaces, and elevate your skills in crafting efficient, component-based applications. This course isn\'t just about learning languages—it\'s about crafting your path towards becoming a versatile web developer.</p><p>Our hands-on approach integrates practical exercises, real-world projects, and expert guidance to reinforce your understanding at every step. Engage with industry-standard tools and gain insights from seasoned professionals, ensuring you\'re equipped with the skills demanded by today\'s tech landscape. Whether you\'re a beginner or seeking to enhance your proficiency, join us on this enriching journey to master the art and science of web development.</p>', '[\"java\",\"springboot\"]', 'g9gwx_11_2024_76616_course_category.png', 'java-springboot', '1', '6 Months', 'Life Time', 'Hindi', '2024-01-11 01:40:38'),
(3, 'web development', '5500', 'fdhgdhgfdgjfhj', 'dfhdfg', 'rj2vg_11_2024_680215_logo_black.png', 'web-development-680215', '1', '6 Months', '6 Months', 'English', '2024-01-11 02:53:23'),
(4, 'web development', '5500', 'fdhgdhgfdgjfhj', 'dfhdfg', 'im0ji_11_2024_378273_logo_black.png', 'web-development-378273', '3', '6 Months', '6 Months', 'English', '2024-01-11 02:53:49'),
(5, 'web development', '5500', 'fdhgdhgfdgjfhj', 'dfhdfg', 'eu1px_11_2024_30738_logo_black.png', 'web-development-30738', '3', '6 Months', '6 Months', 'English', '2024-01-11 02:56:55'),
(6, 'Sanjay Sokal', '5500', 'test', 'java', 'z0m7al_11_2024_35376_about_banner.png', 'sanjay-sokal', '3', '6 Months', '3 Years', 'English', '2024-01-11 02:57:55'),
(7, 'test', '6600', 'setzstysdft', 'HTML, CSS, JavaScript, ReactJS, NodeJS, MySQL', 'w7olf_25_2024_16527_testi.jpg', 'test', '1', '6 Months', 'Life Time', 'English & Hindi', '2024-01-25 01:27:27'),
(8, 'new setuip', '500', 'sgdgnfykhgjffgd', 'HTML, CSS, JavaScript, ReactJS, NodeJS, MySQL', '9zc9_25_2024_339148_page_banner.jpg', 'new-setuip', '1', '6 Months', '6 Months', 'English & Hindi', '2024-01-25 01:30:02'),
(9, 'Test Demo', '100', 'This is a test demo course please do not buy it.', 'tvsdfsdglfsdg', 'g9gwx_11_2024_76616_course_category.png', 'test-demo', '1', '6 Months', '6 Months', 'English', '2024-02-19 05:54:35');

-- --------------------------------------------------------

--
-- Table structure for table `doubts`
--

CREATE TABLE `doubts` (
  `id` int(250) NOT NULL,
  `name` varchar(500) NOT NULL,
  `data` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`data`)),
  `read_by` varchar(500) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `doubts`
--

INSERT INTO `doubts` (`id`, `name`, `data`, `read_by`, `date`) VALUES
(1, 'This is test name for doubt from database', '[{\"name\":\"Sanjay Sokal\",\"email\":\"softingart@gmail.com\",\"type\":\"student\",\"message\":\"fghjghj\"},{\"name\":\"Sanjay Sokal\",\"email\":\"softingart@gmail.com\",\"type\":\"student\",\"message\":\"dthfgj\"},{\"name\":\"Sanjay Mentor\",\"email\":\"mentor@gmail.com\",\"type\":\"mentor\",\"message\":\"this is the test message from\"},{\"name\":\"Sanjay Sokal Student\",\"email\":\"student@gmail.com\",\"type\":\"student\",\"message\":\"this is the testfrom database\"},{\"name\":\"Sanjay Sokal\",\"email\":\"sokalsanjay@gmail.com\",\"type\":\"admin\",\"message\":\"this is the database\"},{\"name\":\"Sanjay Sokal\",\"email\":\"softingart@gmail.com\",\"type\":\"student\",\"message\":\"gjh\"},{\"name\":\"Sanjay Sokal\",\"email\":\"softingart@gmail.com\",\"type\":\"student\",\"message\":\"jgfhjxvxfgdfd ethdhbfxdgfzesxgdxbf\"}]', 'student', '2024-01-24 01:39:14'),
(2, 'This is test name for testtstette', '[{\"name\":\"Sanjay Sokal\",\"email\":\"sokalsanjay@gmail.com\",\"type\":\"admin\",\"message\":\"this is the test message from database\"},{\"name\":\"Sanjay Sokal Student\",\"email\":\"student@gmail.com\",\"type\":\"student\",\"message\":\"this is the test message from database\"},{\"name\":\"Sanjay Mentor\",\"email\":\"mentor@gmail.com\",\"type\":\"mentor\",\"message\":\"this is the test message from database\"}]', 'mentor', '2024-01-23 00:15:35'),
(3, 'terwsttert', '[{\"name\":\"Sanjay Sokal\",\"email\":\"softingart@gmail.com\",\"type\":\"student\",\"message\":\"zdxvfsdtgdsdvxfsrtf\"},{\"name\":\"Sanjay Sokal\",\"email\":\"softingart@gmail.com\",\"type\":\"student\",\"message\":\"ok saknjsjuhasiuhaspoi I wiilll share code here\"},{\"name\":\"Sanjay Sokal\",\"email\":\"sokalsanjay@gmail.com\",\"type\":\"admin\",\"message\":\"Ok I am shairing\"}]', 'admin', '2024-01-24 02:07:32');

-- --------------------------------------------------------

--
-- Table structure for table `meeting`
--

CREATE TABLE `meeting` (
  `id` int(250) NOT NULL,
  `name` varchar(500) NOT NULL,
  `course` varchar(500) NOT NULL,
  `meet_link` varchar(500) NOT NULL,
  `meet_date` varchar(500) NOT NULL,
  `meet_type` enum('live','doubt') NOT NULL,
  `status` enum('active','cancelled','completed') NOT NULL,
  `time` varchar(500) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meeting`
--

INSERT INTO `meeting` (`id`, `name`, `course`, `meet_link`, `meet_date`, `meet_type`, `status`, `time`, `date`) VALUES
(1, 'Sanjay Sokal', 'test', 'https://optimhire.com/client/dp/1196071', '2024-01-27', 'live', 'completed', '20:30', '2024-01-20 11:02:46'),
(2, 'Java Springboot', 'test', 'https://optimhire.com/client/dp/1196071', '2024-01-21', 'doubt', 'cancelled', '07:49', '2024-01-20 10:32:39'),
(3, 'test', 'test', 'https://optimhire.com/client/dp/1196071', '2024-01-20', 'live', 'cancelled', '11:45', '2024-01-20 11:04:49'),
(4, 'Sanjay Sokal', 'test', 'https://optimhire.com/client/dp/1196071', '2024-01-15', 'live', 'completed', '09:05', '2024-01-22 01:27:02'),
(5, 'Sanjay Sokal', 'test', 'https://optimhire.com/client/dp/1196071', '2024-01-27', 'live', 'active', '06:05', '2024-01-21 00:31:43'),
(6, 'Sanjay Sokal', 'web-development', 'dsfsdgg', '2024-01-21', 'live', 'active', '06:05', '2024-01-22 02:19:51'),
(7, 'Sanjay Sokal', 'web-development', 'https://optimhire.com/client/dp/1196071', '2024-01-21', 'doubt', 'completed', '06:07', '2024-01-22 02:19:44'),
(8, 'Sanjay Sokal', 'web-development', 'https://optimhire.com/client/dp/1196071', '2024-01-21', 'live', 'completed', '06:05', '2024-01-22 01:27:14'),
(9, 'Sanjay Sokal', 'web-development', 'https://optimhire.com/client/dp/1196071', '2024-01-21', 'live', 'completed', '06:10', '2024-01-22 01:27:18'),
(10, 'Sanjay Sokal', 'web-development', 'https://optimhire.com/client/dp/1196071', '2024-01-21', 'live', 'completed', '06:25', '2024-01-22 01:27:23'),
(11, 'Sanjay Sokal', 'web-development', 'https://optimhire.com/client/dp/1196071', '2024-01-25', 'doubt', 'completed', '06:40', '2024-01-22 01:27:27');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(250) NOT NULL,
  `course` int(250) NOT NULL,
  `user` int(250) NOT NULL,
  `coupan` varchar(500) NOT NULL,
  `payment_status` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`id`, `course`, `user`, `coupan`, `payment_status`, `date`) VALUES
(1, 1, 1, '', 'done', '2024-01-07 03:10:40'),
(2, 2, 2, '', 'done', '2024-01-07 03:28:17'),
(3, 5, 1, '', 'done', '2024-01-22 01:20:33'),
(6, 9, 1, '', 'done', '2024-02-19 06:33:51'),
(7, 9, 1, '', 'done', '2024-02-19 07:00:34');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(250) NOT NULL,
  `name` varchar(500) NOT NULL,
  `email` varchar(500) NOT NULL,
  `phone` varchar(500) NOT NULL,
  `role` enum('admin','student','mentor') NOT NULL,
  `desc` varchar(500) NOT NULL,
  `image` varchar(500) NOT NULL,
  `description` longtext NOT NULL,
  `socials` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`socials`)),
  `password` varchar(500) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `verify` enum('0','1') NOT NULL,
  `otp` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `phone`, `role`, `desc`, `image`, `description`, `socials`, `password`, `date`, `verify`, `otp`) VALUES
(1, 'Sanjay Sokal', 'sokalsanjay@gmail.com', '+918295673601', 'admin', '', '', '', '[{\"linkedin\":\"\",\"github\":\"\",\"facebook\":\"\",\"website\":\"\"}]', '123', '2024-02-19 05:55:55', '0', '960937'),
(5, 'Sanjay Sokal', 'linktosanjaysokal@gmail.com', '+918295673601', 'student', '', '', '', '[{\"linkedin\":\"\",\"github\":\"\",\"facebook\":\"\",\"website\":\"\"}]', '1', '2024-01-25 03:57:02', '0', '915877');

-- --------------------------------------------------------

--
-- Table structure for table `videos`
--

CREATE TABLE `videos` (
  `id` int(250) NOT NULL,
  `name` varchar(500) NOT NULL,
  `url` varchar(500) NOT NULL,
  `course` varchar(500) NOT NULL,
  `thumbnail` varchar(500) NOT NULL,
  `video` varchar(500) NOT NULL,
  `extra` varchar(500) NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `videos`
--

INSERT INTO `videos` (`id`, `name`, `url`, `course`, `thumbnail`, `video`, `extra`, `date`) VALUES
(1, 'Sanjay Sokal', '1', 'test', 'kldrj_21_2024_559780_course_category.png', 'pk7ha_21_2024_559780_video.mp4', 'https://www.youtube.com/watch?v=oS07d8Gr4tw', '2024-01-21 03:46:51'),
(2, 'Sanjay Sokal', '2', 'test', 'nhd7z_21_2024_487032_course_category.png', 'm6fky_21_2024_487032_video.mp4', 'https://www.youtube.com/watch?v=oS07d8Gr4tw', '2024-01-21 03:46:56'),
(3, 'Sanjay Sokal', '3', 'test', 'nj3h8_21_2024_539027_course_category.png', '28sat_21_2024_539027_video.mp4', 'https://www.youtube.com/watch?v=oS07d8Gr4tw', '2024-01-21 03:47:03'),
(4, 'test video updated', '4', 'test', 'cv07o_21_2024_837817_loading.gif', 'yt6dd_21_2024_407749_video.mp4', 'https://www.youtube.com/', '2024-01-21 09:49:16'),
(5, 'Java Springboot', '5', 'web-development', 'kgwum_25_2024_554408_page_banner.jpg', 'c3utw_21_2024_100780_video.mp4', 'https://www.youtube.com/watch?v=oS07d8Gr4tw', '2024-01-25 01:37:32'),
(6, 'Java Springboot', '6', 'web-development', 'ai7la_21_2024_142874_page_banner.jpg', 'cls5j_21_2024_142874_video.mp4', 'https://www.youtube.com/watch?v=oS07d8Gr4tw', '2024-01-21 03:47:12'),
(7, 'Java Springboot', '7', 'web-development', 'xkbez_21_2024_761509_page_banner.jpg', 'pxhtu_21_2024_761509_video.mp4', 'https://www.youtube.com/watch?v=oS07d8Gr4tw', '2024-01-21 03:47:15'),
(8, 'Java Springboot', '8', 'web-development', 'zifss_21_2024_779906_page_banner.jpg', 'sbwxp_21_2024_779906_video.mp4', 'https://www.youtube.com/watch?v=oS07d8Gr4tw', '2024-01-21 03:47:18'),
(9, 'Java Springboot', '9', 'web-development', 'exj8i_21_2024_976558_page_banner.jpg', '9mvyi_21_2024_976558_video.mp4', 'https://www.youtube.com/watch?v=oS07d8Gr4tw', '2024-01-21 03:47:22'),
(10, 'Java Springboot', '10', 'web-development', 'liiqyj_21_2024_548381_page_banner.jpg', '99mk5_21_2024_548381_video.mp4', '', '2024-01-22 02:53:53'),
(11, 'This is the test java video', 'this-is-the-test-java-video', 'java-springboot', 'aun3x_24_2024_106000_diverse_business_team_CY9SQ57.jpg', 'mc9q2_24_2024_106000_The_Karate_Kid_2010_HDMoviearea.site_Hindi_Dual_Audio_720p_BluRay_ESubs_1GB.mkv_h264_720p.mp4', 'https://www.youtube.com/watch?v=oS07d8Gr4tw', '2024-01-24 02:11:18'),
(12, 'Java Springboot Java Springboot Java Springboot Java Springboot Java Springboot ', 'java-springboot-java-springboot-java-springboot-java-springboot-java-springboot-', 'web-development', 'rgjh9j_25_2024_138377_loading.gif', 'syy9c_25_2024_138377_video.mp4', 'https://www.youtube.com/watch?v=oS07d8Gr4tw', '2024-01-25 01:45:58');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `contact`
--
ALTER TABLE `contact`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `coupans`
--
ALTER TABLE `coupans`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `doubts`
--
ALTER TABLE `doubts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `meeting`
--
ALTER TABLE `meeting`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `videos`
--
ALTER TABLE `videos`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `contact`
--
ALTER TABLE `contact`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `coupans`
--
ALTER TABLE `coupans`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `course`
--
ALTER TABLE `course`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `doubts`
--
ALTER TABLE `doubts`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `meeting`
--
ALTER TABLE `meeting`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `videos`
--
ALTER TABLE `videos`
  MODIFY `id` int(250) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
