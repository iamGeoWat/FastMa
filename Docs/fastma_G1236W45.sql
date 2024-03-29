/*
 Navicat MySQL Data Transfer

 Source Server         : fastma
 Source Server Type    : MySQL
 Source Server Version : 50726
 Source Host           : 45.32.135.124:3306
 Source Schema         : fastma

 Target Server Type    : MySQL
 Target Server Version : 50726
 File Encoding         : 65001

 Date: 23/05/2019 20:45:44
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for betorder
-- ----------------------------
DROP TABLE IF EXISTS `betorder`;
CREATE TABLE `betorder` (
  `userid` int(5) NOT NULL,
  `stake_token` int(11) NOT NULL,
  `racetrack_id` int(5) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `iteration` int(11) NOT NULL,
  `bet_orderid` int(10) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`bet_orderid`),
  KEY `userid` (`userid`),
  KEY `racetrack_id` (`racetrack_id`),
  KEY `iteration` (`iteration`),
  CONSTRAINT `betorder_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `betorder_ibfk_2` FOREIGN KEY (`iteration`) REFERENCES `game` (`iteration`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for blockid_backup
-- ----------------------------
DROP TABLE IF EXISTS `blockid_backup`;
CREATE TABLE `blockid_backup` (
  `blockid` varchar(255) NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for game
-- ----------------------------
DROP TABLE IF EXISTS `game`;
CREATE TABLE `game` (
  `iteration` int(11) NOT NULL,
  `total_volume` int(11) NOT NULL,
  `user_count` int(11) NOT NULL,
  `racetrack_row` int(11) NOT NULL,
  KEY `iteration` (`iteration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for racetrack
-- ----------------------------
DROP TABLE IF EXISTS `racetrack`;
CREATE TABLE `racetrack` (
  `racetrack_id` int(5) NOT NULL AUTO_INCREMENT,
  `stake_token` int(11) unsigned zerofill NOT NULL,
  `race_distance` int(10) unsigned zerofill NOT NULL,
  `if_win` int(1) unsigned zerofill NOT NULL,
  `iteration` int(11) NOT NULL,
  `which_track` int(5) NOT NULL,
  PRIMARY KEY (`racetrack_id`),
  KEY `iteration` (`iteration`),
  CONSTRAINT `racetrack_ibfk_1` FOREIGN KEY (`iteration`) REFERENCES `game` (`iteration`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for topup
-- ----------------------------
DROP TABLE IF EXISTS `topup`;
CREATE TABLE `topup` (
  `cb_id` varchar(10) NOT NULL,
  `order_size` int(11) NOT NULL,
  `if_done` int(1) unsigned zerofill NOT NULL,
  `userid` int(5) NOT NULL,
  `orderid` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`orderid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `balance` int(11) unsigned zerofill NOT NULL,
  `userid` int(5) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for withdraw
-- ----------------------------
DROP TABLE IF EXISTS `withdraw`;
CREATE TABLE `withdraw` (
  `userid` int(11) NOT NULL,
  `amount_token` double NOT NULL,
  `amount_eos` double NOT NULL,
  `if_done` int(1) unsigned zerofill NOT NULL,
  `eos_account` varchar(255) NOT NULL,
  `eos_memo` varchar(255) NOT NULL,
  `txid` varchar(255) DEFAULT NULL,
  `req_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`req_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

SET FOREIGN_KEY_CHECKS = 1;
