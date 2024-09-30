--MySql Database Scripts

CREATE DATABASE tour_bookings;

USE tour_bookings;

CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100),
  password VARCHAR(255),
  email VARCHAR(100) UNIQUE
);
CREATE TABLE payments (
  payment_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  email VARCHAR(100),
  name VARCHAR(255),
  contact VARCHAR(100),
  package_selected VARCHAR(255),
  number_of_people INT,
  total_cost DECIMAL(10, 2),
  payment_status VARCHAR(50),
  start_date DATE, 
  reference_number VARCHAR(255),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    place VARCHAR(255) NOT NULL,
    room_type VARCHAR(255) NOT NULL,
    date VARCHAR(255) NOT NULL,  -- Storing date as a string for simplicity
    total_cost DECIMAL(10, 2) NOT NULL  -- Assumes a format suitable for currency
);

CREATE TABLE RideBookingDetails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    pickup_location VARCHAR(255) NOT NULL,
    drop_location VARCHAR(255) NOT NULL,
    datetime VARCHAR(255) NOT NULL,
    total_cost DECIMAL(10, 2) NOT NULL
);
