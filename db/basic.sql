CREATE DATABASE fitness_diaries;
USE fitness_diaries;

CREATE TABLE member_name(
    my_name VARCHAR(250) NOT NULL,
    id INTEGER AUTO_INCREMENT PRIMARY KEY
);

CREATE TABLE member_info(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    user_img VARCHAR(250),
    my_name VARCHAR(250) NOT NULL,
    weight DECIMAL(4,2),
    height DECIMAL(4,2),
    BMI DECIMAL(4,2),
    goal VARCHAR(250),
    diet VARCHAR(250),
    FOREIGN KEY (PersonId) REFERENCES login_credential(id)
);

CREATE TABLE member_goal(
    goal_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    goal_message VARCHAR(250),
    goalCompleted BOOLEAN DEFAULT false
 
);

CREATE TABLE group_goal(
    goal_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    goal_message VARCHAR(250)
);

CREATE TABLE top_three(
    name VARCHAR(250) PRIMARY KEY,
    weight DECIMAL(4,2),
    user_img VARCHAR(250)
);

CREATE TABLE group_posts(
    id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    my_name VARCHAR(250) PRIMARY KEY,
    info VARCHAR(250),
    picture VARCHAR(250),
    thumbs_up INTEGER DEFAULT 0,
    update_time DATETIME ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE login_credential(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    my_name VARCHAR(250),
    username VARCHAR(250),
    user_password VARCHAR(250),
    user_img VARCHAR(250),
);

