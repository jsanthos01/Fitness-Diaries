DROP DATABASE IF EXISTS fitness_diaries;
CREATE DATABASE fitness_diaries;
USE fitness_diaries;

CREATE TABLE login_credential(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    my_name VARCHAR(250),
    username VARCHAR(250),
    user_password VARCHAR(250),
    user_img VARCHAR(250)
);


-- CREATE TABLE member_name(
--     my_name VARCHAR(250) NOT NULL,
--     id INTEGER AUTO_INCREMENT PRIMARY KEY
-- );

CREATE TABLE member_info(
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_img VARCHAR(250),
    username VARCHAR(250),
    my_name VARCHAR(250) NOT NULL,
    my_weight DECIMAL(4,2),
    height DECIMAL(4,2),
    BMI DECIMAL(4,2),
    goal VARCHAR(250),
    diet VARCHAR(250),
    member_id INT,
    FOREIGN KEY (member_id) REFERENCES login_credential(id)
);

-- CREATE TABLE weight_history(
--     weight_id INTEGER AUTO_INCREMENT PRIMARY KEY,
--     weight_past INTEGER 
-- );

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
    my_name VARCHAR(250),
    info VARCHAR(250),
    picture VARCHAR(250),
    thumbs_up INTEGER DEFAULT 0,
    update_time DATETIME ON UPDATE CURRENT_TIMESTAMP
);

-- CREATE TABLE thumbs_up(
--     id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
--     thumbs_upimage VARCHAR(250),
--     total_thumbsup INT,
--     thumbup_id INT,     
--     FOREIGN KEY (member_id) REFERENCES group_posts(id)
-- );

CREATE TABLE new_group (
    group_id INT PRIMARY KEY auto_increment,
    group_name VARCHAR(30) NOT NULL
);
CREATE TABLE member_info (
    member_id INT PRIMARY KEY auto_increment ,
    member_name VARCHAR(30) NOT NULL,
    email_id DECIMAL,
    group_id_fk INT,
    FOREIGN KEY (group_id_fk) REFERENCES new_group(group_id)
);

INSERT INTO login_credential(my_name, username, user_password, user_img,) VALUES('Elsa', 'elsausername', 'hashpasswordelsa', 'assets/userdb/user_one.png');
INSERT INTO login_credential(my_name, username, user_password, user_img,) VALUES('Fiona', 'fionausername', 'hashpasswordfiona', 'assets/userdb/user_two.png');

INSERT INTO member_name (my_name) VALUES('Elsa');
INSERT INTO member_name (my_name) VALUES('Tinker');
INSERT INTO member_name (my_name) VALUES('Hermi');
INSERT INTO member_name (my_name) VALUES('Daria');
INSERT INTO member_name (my_name) VALUES('Brave');
INSERT INTO member_name (my_name) VALUES('Ann');
INSERT INTO member_name (my_name) VALUES('Jane');



INSERT INTO member_info (my_name, my_weight, my_height, BMI, goal, diet) VALUES('Elsa', 116, 156, 29, 5, 'loose weight by walk');
INSERT INTO member_info (my_name, my_weight, my_height, BMI, goal, diet) VALUES('Fiona', 200, 165, 37.8, 10, 'loose weight by walk');


INSERT INTO member_goal (goal_message) VALUES('i want to loose 10pounds');
INSERT INTO member_goal (goal_message) VALUES('i want to loose 5 pounds follow keto diet');

INSERT INTO group_goal (goal_message) VALUES(x);

## INSERT INTO top_three (name, weight, user_img) VALUES('Elsa', 116, 'assets/userdb/user_one.png');
## INSERT INTO top_three (name, weight, user_img) VALUES('Elsa', 116, 'assets/userdb/user_two.png');

INSERT INTO group_posts()




