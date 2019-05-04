/*
 Navicat MySQL Data Transfer

 Source Server         : fastma_dev
 Source Server Type    : MySQL
 Source Server Version : 50719
 Source Host           : localhost:3306
 Source Schema         : fastma

 Target Server Type    : MySQL
 Target Server Version : 50719
 File Encoding         : 65001

 Date: 04/05/2019 15:59:27
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
  PRIMARY KEY (`bet_orderid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for blockid_backup
-- ----------------------------
DROP TABLE IF EXISTS `blockid_backup`;
CREATE TABLE `blockid_backup` (
  `blockid` varchar(255) NOT NULL,
  `selected` int(1) unsigned zerofill NOT NULL,
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for game
-- ----------------------------
DROP TABLE IF EXISTS `game`;
CREATE TABLE `game` (
  `iteration` int(11) NOT NULL,
  `total_volume` int(11) NOT NULL,
  `user_count` int(11) NOT NULL,
  `racetrack_row` int(11) NOT NULL,
  `is_betting` int(1) unsigned zerofill NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Table structure for racetrack
-- ----------------------------
DROP TABLE IF EXISTS `racetrack`;
CREATE TABLE `racetrack` (
  `racetrack_id` int(5) NOT NULL,
  `stake_token` int(11) unsigned zerofill NOT NULL,
  `race_distance` int(10) unsigned zerofill NOT NULL,
  `if_win` int(1) unsigned zerofill NOT NULL,
  `iteration` int(11) NOT NULL,
  PRIMARY KEY (`racetrack_id`)
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of topup
-- ----------------------------
BEGIN;
INSERT INTO `topup` VALUES ('BEMJ7GLR', 100, 0, 2, 1);
INSERT INTO `topup` VALUES ('45KZKVW3', 1000, 1, 2, 2);
INSERT INTO `topup` VALUES ('6PXLAVMH', 300, 0, 2, 3);
INSERT INTO `topup` VALUES ('ABGFDTHP', 2000, 0, 2, 4);
INSERT INTO `topup` VALUES ('2DND7CW6', 200, 0, 2, 5);
COMMIT;

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES ('test', '123', 00000000000, 1);
INSERT INTO `user` VALUES ('liu', '123', 00000008200, 2);
INSERT INTO `user` VALUES ('liu1', '123', 00000000000, 3);
INSERT INTO `user` VALUES ('lii', '678', 00000000000, 4);
COMMIT;

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

-- ----------------------------
-- Records of withdraw
-- ----------------------------
BEGIN;
INSERT INTO `withdraw` VALUES (1, 10, 0.02, 1, 'winterwinter', 'fastma withdraw', 'b481be6c674597758fa66649b1cf33b2803626e90a24309bf46ad3e8836b2441', 1);
INSERT INTO `withdraw` VALUES (2, 10, 0.1, 1, 'winterwinter', '132498', '0314cb02729960b512d0ab44093b2735610a6f6da7f2f51f5239e2bca48e8aca', 2);
INSERT INTO `withdraw` VALUES (3, 25, 0.001, 1, 'geowatcomeos', 'fastma withdraw', '809f352cd63a03f98d2b33c6598ccdb1e5b2105cec7e51989ab51299b68d6e7d', 3);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
