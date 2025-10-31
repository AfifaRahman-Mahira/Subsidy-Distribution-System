-- Database Creation
CREATE DATABASE IF NOT EXISTS sds_db;
USE sds_db;

-- Table: users
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('admin','ngo','beneficiary') NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Table: beneficiaries
CREATE TABLE beneficiaries (
    beneficiary_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    nid_number VARCHAR(20),
    address VARCHAR(255),
    phone VARCHAR(20),
    district VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Table: subsidy_programs
CREATE TABLE subsidy_programs (
    program_id INT AUTO_INCREMENT PRIMARY KEY,
    program_name VARCHAR(100) NOT NULL,
    description TEXT,
    fund_amount DECIMAL(12,2),
    start_date DATE,
    end_date DATE
);

-- Table: applications
CREATE TABLE applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    beneficiary_id INT NOT NULL,
    program_id INT NOT NULL,
    income DECIMAL(10,2),
    family_size INT,
    application_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM('pending','approved','rejected') DEFAULT 'pending',
    FOREIGN KEY (beneficiary_id) REFERENCES beneficiaries(beneficiary_id) ON DELETE CASCADE,
    FOREIGN KEY (program_id) REFERENCES subsidy_programs(program_id)
);

-- Table: transactions (aid_distributions)
CREATE TABLE transactions (
    transaction_id INT AUTO_INCREMENT PRIMARY KEY,
    application_id INT NOT NULL,
    disbursed_amount DECIMAL(10,2),
    distribution_type ENUM('digital','physical'),
    distribution_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    distributed_by INT,
    FOREIGN KEY (application_id) REFERENCES applications(application_id) ON DELETE CASCADE,
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
