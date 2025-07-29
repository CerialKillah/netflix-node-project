-- Create the database
CREATE DATABASE IF NOT EXISTS netflixnodeproject;
USE netflixnodeproject;

-- Create admin table
CREATE TABLE `admins` (
  `emailid` varchar(100) NOT NULL,
  `mobileno` varchar(45) DEFAULT NULL,
  `adminname` varchar(45) DEFAULT NULL,
  `password` varchar(45) DEFAULT NULL,
  `picture` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`emailid`),
  UNIQUE KEY `mobileno_UNIQUE` (`mobileno`)
);

-- Create category table
CREATE TABLE `category` (
  `categoryid` int(11) NOT NULL AUTO_INCREMENT,
  `categoryname` varchar(100) NOT NULL,
  PRIMARY KEY (`categoryid`)
);

-- Create subcategory table
CREATE TABLE `subcategory` (
  `subcategoryid` int(11) NOT NULL AUTO_INCREMENT,
  `categoryid` int(11) DEFAULT NULL,
  `subcategoryname` varchar(100) NOT NULL,
  PRIMARY KEY (`subcategoryid`),
  KEY `subcategory_category_fk` (`categoryid`),
  CONSTRAINT `subcategory_category_fk` FOREIGN KEY (`categoryid`) REFERENCES `category` (`categoryid`) ON DELETE CASCADE
);

-- Create programs table
CREATE TABLE `programs` (
  `programid` int(11) NOT NULL AUTO_INCREMENT,
  `categoryid` int(11) DEFAULT NULL,
  `subcategoryid` int(11) DEFAULT NULL,
  `programname` varchar(200) NOT NULL,
  `description` text,
  `status` varchar(50) NOT NULL DEFAULT 'None',
  `casts` text,
  `releasedate` varchar(45) DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`programid`),
  KEY `programs_category_fk` (`categoryid`),
  KEY `programs_subcategory_fk` (`subcategoryid`),
  CONSTRAINT `programs_category_fk` FOREIGN KEY (`categoryid`) REFERENCES `category` (`categoryid`) ON DELETE CASCADE,
  CONSTRAINT `programs_subcategory_fk` FOREIGN KEY (`subcategoryid`) REFERENCES `subcategory` (`subcategoryid`) ON DELETE CASCADE
);

-- Create users table
CREATE TABLE `users` (
  `categoryid` int(11) NOT NULL,
  `programid` int(11) NOT NULL AUTO_INCREMENT,
  `categoryname` varchar(45) DEFAULT NULL,
  `programname` varchar(45) DEFAULT NULL,
  `poster` varchar(255) DEFAULT NULL,
  `video` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`programid`)
);

-- Insert default admin account
INSERT INTO admin (emailid, password) VALUES 
('admin@netflix.com', 'admin123');

-- Insert sample categories
INSERT INTO category (categoryname, description) VALUES 
('Movies', 'Feature films and documentaries'),
('TV Shows', 'Television series and episodes'),
('Originals', 'Netflix original content');

-- Insert sample subcategories
INSERT INTO subcategory (categoryid, subcategoryname, description) VALUES 
(1, 'Action', 'Action and adventure movies'),
(1, 'Comedy', 'Funny and humorous films'),
(2, 'Drama Series', 'Dramatic TV shows'),
(2, 'Reality TV', 'Reality television programs'),
(3, 'Netflix Films', 'Original Netflix movies'),
(3, 'Netflix Series', 'Original Netflix series');