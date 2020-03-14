
USE hfotawzm63znjqmt;

SELECT * from login_credential;

INSERT INTO login_credential(my_name, username, user_password) values ("Dobby", "dobby@mail.com", "12345678A");

CREATE TABLE login_credential(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    my_name VARCHAR(250),
    username VARCHAR(250),
    user_password VARCHAR(250),
    user_img VARCHAR(250),
	createdAt TIMESTAMP not null default CURRENT_TIMESTAMP
);

CREATE TABLE personal_info(
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
    FOREIGN KEY (member_id) REFERENCES login_credential(id),
	createdAt TIMESTAMP not null default CURRENT_TIMESTAMP
);

-- CREATE TABLE weight_history(
--     weight_id INTEGER AUTO_INCREMENT PRIMARY KEY,
--     weight_past INTEGER 
-- );

CREATE TABLE member_goal(
    goal_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    goal_message VARCHAR(250),
    goalCompleted BOOLEAN DEFAULT false,
	createdAt TIMESTAMP not null default CURRENT_TIMESTAMP

);

---------------------------------- groups list html page ---------------------------------------------
CREATE TABLE new_group (
    group_id INT PRIMARY KEY auto_increment,
    group_name VARCHAR(100) NOT NULL,
    group_goal VARCHAR(350),
    group_imageUrl VARCHAR(250),
	createdAt TIMESTAMP not null default CURRENT_TIMESTAMP

);

CREATE TABLE member_info (
    member_id INT PRIMARY KEY auto_increment ,
    member_name VARCHAR(100) NOT NULL,
    email_id VARCHAR(100) NOT NULL,
    group_id_fk INT,
    FOREIGN KEY (group_id_fk) REFERENCES personal_info(id),
        createdAt TIMESTAMP not null

);

CREATE TABLE personal_goal(
    goal_id INTEGER AUTO_INCREMENT PRIMARY KEY,
	goal_range VARCHAR(250),
    goal_message VARCHAR(250),
    goalCompleted BOOLEAN default FALSE,
    userId INTEGER,
	 FOREIGN KEY (userId) REFERENCES new_group(group_id),
	createdAt TIMESTAMP not null default CURRENT_TIMESTAMP

);

CREATE TABLE group_goal(
    goal_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    goal_message VARCHAR(250),    
	createdAt TIMESTAMP not null default CURRENT_TIMESTAMP

);

CREATE TABLE weight_tracker(
    user_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    weight decimal,
	createdAt TIMESTAMP not null default CURRENT_TIMESTAMP

);

CREATE TABLE group_posts(
    id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    my_name VARCHAR(250),
    info VARCHAR(250),
    picture VARCHAR(250),
    thumbs_up INTEGER DEFAULT 0,
    update_time DATETIME ON UPDATE CURRENT_TIMESTAMP,
	createdAt TIMESTAMP not null default CURRENT_TIMESTAMP
);

-- CREATE TABLE thumbs_up(
--     id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
--     thumbs_upimage VARCHAR(250),
--     total_thumbsup INT,
--     thumbup_id INT,     
--     FOREIGN KEY (member_id) REFERENCES group_posts(id)
-- );





