CREATE DATABASE fitness_diaries;
USE fitness_diaries;

CREATE TABLE member_name(
    my_name VARCHAR(250) NOT NULL,
    id INTEGER AUTO_INCREMENT PRIMARY KEY
)

CREATE TABLE member_info(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    my_name VARCHAR(250) NOT NULL,
    weight DECIMAL(4,2),
    height DECIMAL(4,2),
    BMI DECIMAL(4,2),
    goal VARCHAR(250),
    diet VARCHAR(250),
    goalCompleted BOOLEAN DEFAULT false,
    FOREIGN KEY (PersonId) REFERENCES login_credential(id)
);


CREATE TABLE login_credential(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    my_name VARCHAR(250)
    username VARCHAR(250),
    user_password VARCHAR(250)
    FOREIGN KEY 
);