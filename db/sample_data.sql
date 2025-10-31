USE sds_db;

INSERT INTO users (name,email,password,role,nid_number,district)
VALUES
('Rahim Uddin','rahim@example.com','hashedpass','beneficiary','1234567890','Dhaka'),
('NGO Officer','ngo@example.com','hashedpass','ngo','9876543210','Chittagong');

INSERT INTO applications (user_id,income,family_size,aid_type,status)
VALUES
(1,5000.00,4,'food','pending');
