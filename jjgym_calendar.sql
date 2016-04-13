-- phpMyAdmin SQL Dump
-- version 4.2.10
-- http://www.phpmyadmin.net
--
-- Host: localhost:3306
-- Generation Time: Apr 13, 2016 at 10:37 PM
-- Server version: 5.5.38
-- PHP Version: 5.6.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `jjgym_calendar`
--

-- --------------------------------------------------------

--
-- Table structure for table `announcements`
--

CREATE TABLE `announcements` (
`id` int(11) NOT NULL,
  `announcement` text NOT NULL
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `announcements`
--

INSERT INTO `announcements` (`id`, `announcement`) VALUES
(1, '<!--\n <span style="font-size:16px;"><span style="color: rgb(0, 128, 128); "><span style="background-color: rgb(240, 255, 255); ">Time to Say goodbye to the starving artist mentality!!! </span></span></span>There is a <a href="/gymsignup/MoneySeminar.htm" target="_new">Money Seminar</a> coming to the gym on August 9th. <a href="/gymsignup/MoneySeminar.htm" target="_new">Click here</a> to learn more.</p>\n<p>\n-->\n<p>\n   </p>\n<p>\n  <strong style="font-size: 14px; ">For Information on JJGym please see "<a href="http://www.jjgym.com/gym2.htm">More Info</a>" and "<a href="http://www.jjgym.com/faq.htm">FAQ</a>".</strong></p>\n<p>\n <span style="font-size: 14px; color: blue;"><span style="color: rgb(75, 0, 130);"><strong>To reserve 100% of the gym</strong>, please contact Jeri</span></span><span class="Apple-style-span" style="font-size: 14px; color: rgb(75, 0, 130);"> for rates and availability</span><span class="Apple-style-span" style="font-size: 14px; color: blue;"><span style="color: rgb(75, 0, 130);">: 661-713-3141 or </span><span class="Apple-style-span" style="color: rgb(75, 0, 130);">jeri@kalvan.net. </span></span><span style="font-size: 14px; color: rgb(75, 0, 130);">If you have booked 100% before, you may book the space, then please notify Jeri of the date and time. Pre-authorization is required for any reservation in which you will be charging students a fee and/or for any sort of photo shoot that will be using lights and backdrops.</span></p>\n<p>\n <span style="font-size: 16px;"><span style="color: rgb(255, 0, 0); "><span style="color: rgb(0, 0, 0); "><strong>PARKING:  </strong></span></span></span><span class="Apple-style-span" style="font-size: 14px;">1. Please park at the park on Erwin Street. However, if you are coming late at night, pay attention to the signs at the park. 2. If for any reason you cannot park at the park, please do not block walkways or driveways. Specifically, do not park in front of the daycare across the the street or in front of the house directly across the street from us.  3. Leave room so others can park in front of or behind you. (Don''t take up 2 spaces!) </span></p>\n<p>\n <span style="font-size: 14px; ">TO JOIN AN AERIAL CLASS: contact Kerry Wee 818-255-8699</span></p>\n<p>\n <span style="font-size:14px;"><strong><span style="color: rgb(255, 0, 0); ">If you are teaching a class in the gym, please describe your class on the schedule and contact Jeri for expected rental fees. </span></strong></span></p>\n<h2>\n <span style="font-size:16px;"><span style="color: rgb(255, 0, 0); "><span class="Apple-style-span" style="font-weight: normal; ">*** Please cancel your gym reservation asap if you are not going to be here.  If you do not cancel with at least 24 hours notice, please consider making a donation for the time you reserved.</span></span></span></h2>\n<p>\n  <span style="font-size:14px;"><span style="color: rgb(128, 0, 128); "><strong> </strong></span></span></p>\n<h3 style="color: blue;">\n <strong style="color: rgb(128, 0, 128); ">Thank You. We love you</strong><span style="color: rgb(128, 0, 128); ">!</span></h3>\n<p>\n <span _fck_bookmark="1" style="display: none; "> </span></p>\n'),
(2, '<p>\n  Hello test</p>\n');

-- --------------------------------------------------------

--
-- Table structure for table `events`
--

CREATE TABLE `events` (
`id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL DEFAULT '0',
  `name` varchar(128) NOT NULL DEFAULT '',
  `date` date NOT NULL DEFAULT '0000-00-00',
  `time_start` varchar(10) NOT NULL DEFAULT '00:00:00',
  `time_end` varchar(10) NOT NULL DEFAULT '0',
  `comments` varchar(255) NOT NULL DEFAULT '',
  `exclusive` tinyint(1) NOT NULL DEFAULT '0',
  `request_exclusive` tinyint(1) NOT NULL DEFAULT '0',
  `usage` int(3) NOT NULL DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM AUTO_INCREMENT=35 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `user_id`, `name`, `date`, `time_start`, `time_end`, `comments`, `exclusive`, `request_exclusive`, `usage`, `created_at`) VALUES
(1, 1, '', '2016-04-13', '09:30', '10:30', 'Aerial Training, 1 point', 0, 0, 25, '2016-04-13 20:24:32'),
(2, 1, '', '2016-04-13', '14:00', '15:00', 'Acro, floor space needed', 0, 0, 50, '2016-04-13 20:24:51'),
(3, 2, '', '2016-04-13', '09:00', '11:00', 'Tumbling ', 0, 0, 50, '2016-04-13 20:25:39'),
(4, 3, '', '2016-04-13', '13:00', '18:00', 'Company Rehearsal', 0, 0, 50, '2016-04-13 20:26:42'),
(5, 3, '', '2016-04-20', '13:00', '18:00', 'Company Rehearsal', 0, 0, 50, '2016-04-13 20:26:42'),
(6, 3, '', '2016-04-27', '13:00', '18:00', 'Company Rehearsal', 0, 0, 50, '2016-04-13 20:26:42'),
(7, 3, '', '2016-05-04', '13:00', '18:00', 'Company Rehearsal', 0, 0, 50, '2016-04-13 20:26:42'),
(8, 3, '', '2016-05-11', '13:00', '18:00', 'Company Rehearsal', 0, 0, 50, '2016-04-13 20:26:42'),
(9, 3, '', '2016-05-18', '13:00', '18:00', 'Company Rehearsal', 0, 0, 50, '2016-04-13 20:26:42'),
(10, 3, '', '2016-05-25', '13:00', '18:00', 'Company Rehearsal', 0, 0, 50, '2016-04-13 20:26:42'),
(11, 3, '', '2016-06-01', '13:00', '18:00', 'Company Rehearsal', 0, 0, 50, '2016-04-13 20:26:42'),
(12, 3, '', '2016-06-08', '13:00', '18:00', 'Company Rehearsal', 0, 0, 50, '2016-04-13 20:26:42'),
(13, 3, '', '2016-06-15', '13:00', '18:00', 'Company Rehearsal', 0, 0, 50, '2016-04-13 20:26:42'),
(14, 3, '', '2016-04-14', '12:00', '13:00', 'lunchtime acro jam', 0, 0, 75, '2016-04-13 20:27:19'),
(15, 3, '', '2016-04-21', '12:00', '13:00', 'lunchtime acro jam', 0, 0, 75, '2016-04-13 20:27:19'),
(16, 3, '', '2016-04-28', '12:00', '13:00', 'lunchtime acro jam', 0, 0, 75, '2016-04-13 20:27:19'),
(17, 3, '', '2016-05-05', '12:00', '13:00', 'lunchtime acro jam', 0, 0, 75, '2016-04-13 20:27:19'),
(18, 3, '', '2016-05-12', '12:00', '13:00', 'lunchtime acro jam', 0, 0, 75, '2016-04-13 20:27:19'),
(19, 3, '', '2016-04-12', '12:00', '13:00', 'lunchtime acro jam', 0, 0, 75, '2016-04-13 20:27:51'),
(20, 3, '', '2016-04-19', '12:00', '13:00', 'lunchtime acro jam', 0, 0, 75, '2016-04-13 20:27:51'),
(21, 3, '', '2016-04-26', '12:00', '13:00', 'lunchtime acro jam', 0, 0, 75, '2016-04-13 20:27:51'),
(22, 3, '', '2016-05-03', '12:00', '13:00', 'lunchtime acro jam', 0, 0, 75, '2016-04-13 20:27:51'),
(23, 3, '', '2016-05-10', '12:00', '13:00', 'lunchtime acro jam', 0, 0, 75, '2016-04-13 20:27:51'),
(24, 3, '', '2016-04-15', '17:00', '21:00', 'private rehearsal', 0, 0, 100, '2016-04-13 20:28:15'),
(25, 3, '', '2016-04-22', '17:00', '21:00', 'private rehearsal', 0, 0, 100, '2016-04-13 20:28:15'),
(26, 3, '', '2016-04-29', '17:00', '21:00', 'private rehearsal', 0, 0, 100, '2016-04-13 20:28:15'),
(27, 3, '', '2016-05-06', '17:00', '21:00', 'private rehearsal', 0, 0, 100, '2016-04-13 20:28:15'),
(28, 3, '', '2016-05-13', '17:00', '21:00', 'private rehearsal', 0, 0, 100, '2016-04-13 20:28:15'),
(29, 3, '', '2016-05-20', '17:00', '21:00', 'private rehearsal', 0, 0, 100, '2016-04-13 20:28:15'),
(30, 3, '', '2016-05-27', '17:00', '21:00', 'private rehearsal', 0, 0, 100, '2016-04-13 20:28:15'),
(31, 3, '', '2016-06-03', '17:00', '21:00', 'private rehearsal', 0, 0, 100, '2016-04-13 20:28:15'),
(32, 3, '', '2016-06-10', '17:00', '21:00', 'private rehearsal', 0, 0, 100, '2016-04-13 20:28:15'),
(33, 3, '', '2016-06-17', '17:00', '21:00', 'private rehearsal', 0, 0, 100, '2016-04-13 20:28:15'),
(34, 2, '', '2016-04-14', '09:00', '15:00', 'aerial training', 0, 0, 25, '2016-04-13 20:29:01');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
`id` int(11) NOT NULL,
  `name_first` varchar(128) NOT NULL DEFAULT '',
  `name_last` varchar(128) NOT NULL DEFAULT '',
  `username` varchar(128) NOT NULL DEFAULT '',
  `password` varchar(128) NOT NULL DEFAULT '',
  `email` varchar(128) NOT NULL DEFAULT '',
  `phone` varchar(128) NOT NULL DEFAULT '',
  `date_last_login` varchar(128) NOT NULL DEFAULT '',
  `date_registered` varchar(128) NOT NULL DEFAULT ''
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name_first`, `name_last`, `username`, `password`, `email`, `phone`, `date_last_login`, `date_registered`) VALUES
(1, 'Adam', 'Haley', '', 'test', '', '', '', ''),
(2, 'User2', 'Test', '', 'anotherpass', '', '', '', ''),
(3, 'Circus', 'Training', '', 'training', '', '', '', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `announcements`
--
ALTER TABLE `announcements`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `events`
--
ALTER TABLE `events`
 ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
 ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `announcements`
--
ALTER TABLE `announcements`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=35;
--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,AUTO_INCREMENT=4;