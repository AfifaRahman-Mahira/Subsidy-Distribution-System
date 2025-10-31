-- Database creation
CREATE DATABASE IF NOT EXISTS sds_db;
USE sds_db;

-- Table: users
CREATE TABLE users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role ENUM('admin','ngo','beneficiary') NOT NULL,
  nid_number VARCHAR(20),
  district VARCHAR(50),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table: applications
CREATE TABLE applications (
  app_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  income DECIMAL(10,2),
  family_size INT,
  aid_type ENUM('financial','food','medicine','rehab'),
  status ENUM('pending','approved','rejected') DEFAULT 'pending',
  submission_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Table: aid_distributions
CREATE TABLE aid_distributions (
  distribution_id INT AUTO_INCREMENT PRIMARY KEY,
  app_id INT NOT NULL,
  aid_amount DECIMAL(10,2),
  delivery_method ENUM('digital','physical'),
  distribution_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  distributed_by INT,
  FOREIGN KEY (app_id) REFERENCES applications(app_id) ON DELETE CASCADE,
  FOREIGN KEY (distributed_by) REFERENCES users(user_id)
);

-- Table: notifications
CREATE TABLE notifications (
  notification_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  message TEXT,
  status ENUM('sent','pending') DEFAULT 'pending',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);
