DROP DATABASE IF EXISTS fitness_diaries;
CREATE DATABASE fitness_diaries;
USE fitness_diaries;
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
DROP TABLE IF EXISTS new_group;
CREATE TABLE new_group (
    group_id INT PRIMARY KEY AUTO_INCREMENT,
    group_name VARCHAR(100) NOT NULL,
    group_goal INT,
    group_imageUrl VARCHAR(250),
    createdAt TIMESTAMP not null default CURRENT_TIMESTAMP
);
DROP TABLE IF EXISTS group_member;
CREATE TABLE group_member (
    grp_mbr_id INT PRIMARY KEY AUTO_INCREMENT ,
    member_name VARCHAR(100) NOT NULL,
    member_id_frk INT,
    FOREIGN KEY (member_id_frk) REFERENCES personal_info(id),
    group_id_fk INT,
    FOREIGN KEY (group_id_fk) REFERENCES new_group(group_id),
    createdAt TIMESTAMP not null default CURRENT_TIMESTAMP
);
SELECT * FROM group_member;
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
CREATE TABLE group_goal(
    goal_id INTEGER AUTO_INCREMENT PRIMARY KEY,
    goal_message VARCHAR(250),
    createdAt TIMESTAMP not null default CURRENT_TIMESTAMP
);
CREATE TABLE top_three(
    name VARCHAR(250) PRIMARY KEY,
    weight DECIMAL(4,2),
    user_img VARCHAR(250),
    createdAt TIMESTAMP not null default CURRENT_TIMESTAMP
);
CREATE TABLE group_posts(
    id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    my_name VARCHAR(250),
    info VARCHAR(250),
    creation_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME ON UPDATE CURRENT_TIMESTAMP,
    member_id INT,
    thumbs_up INT DEFAULT 0,
    user_comments VARCHAR(1000),
    FOREIGN KEY (member_id) REFERENCES personal_info(id),
    createdAt TIMESTAMP not null default CURRENT_TIMESTAMP
);
CREATE TABLE personal_goal(
    goal_id INTEGER AUTO_INCREMENT PRIMARY KEY,
	goal_range VARCHAR(250),
    goal_message VARCHAR(250),
    goalCompleted BOOLEAN default FALSE,
    userId INTEGER,
	FOREIGN KEY (userId) REFERENCES personal_info(id),
	createdAt TIMESTAMP not null default CURRENT_TIMESTAMP,
    updatedTime DATETIME ON UPDATE CURRENT_TIMESTAMP
);
SELECT * FROM personal_goal WHERE goalCompleted=0 OR userId = 2;
SELECT * FROM personal_goal WHERE goalCompleted=1 OR userId = 2;
-- CREATE TABLE weight_tracker(
--     user_id INTEGER AUTO_INCREMENT PRIMARY KEY,
--     weight decimal,
-- 	createdAt TIMESTAMP not null default CURRENT_TIMESTAMP
-- );
SELECT * FROM personal_goal;
SELECT * FROM personal_goal WHERE goalCompleted=0;
SELECT * FROM personal_goal WHERE goalCompleted= 1 AND userId=3;
SELECT * FROM personal_goal WHERE goalCompleted= 1 AND userId=3 ORDER BY updatedTime DESC LIMIT 20;
SELECT * FROM personal_goal WHERE goalCompleted= 1 ORDER BY updatedTime DESC LIMIT 5; 
SELECT * FROM personal_goal WHERE goalCompleted = 0 AND userId = 1;
SELECT * FROM personal_goal WHERE goalCompleted= 1 AND userId=? ORDER BY updatedTime DESC LIMIT 20;
-- CREATE TABLE thumbs_up(
--     id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
--     thumbs_upimage VARCHAR(250),
--     total_thumbsup INT,
--     thumbup_id INT,     
--     FOREIGN KEY (member_id) REFERENCES group_posts(id)
-- );
-- INSERT INTO login_credential(my_name, username, user_password, user_img,) VALUES('Elsa', 'elsausername', 'hashpasswordelsa', 'assets/userdb/user_one.png');
-- INSERT INTO login_credential(my_name, username, user_password, user_img,) VALUES('Fiona', 'fionausername', 'hashpasswordfiona', 'assets/userdb/user_two.png');
-- INSERT INTO personal_info(user_img, username, my_name, my_weight, height) VALUES('https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 'rand@gmail.com', 'randy many', '60', '15');
-- INSERT INTO personal_info(user_img, username, my_name, my_weight, height) VALUES('https://image.freepik.com/free-photo/close-up-portrait-adorable-woman_23-2148369601.jpg', 'heljobr@gmail.com', 'kelly klackrson', '50', '85');
-- INSERT INTO personal_info(user_img, username, my_name, my_weight, height) VALUES('https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500', 'joanna@gmail.com', 'joanna santhosh', '90', '95');
-- INSERT INTO personal_info(user_img, username, my_name, my_weight, height) VALUES('https://thumbs.dreamstime.com/b/handsome-young-man-portrait-intense-look-eye-catching-beauty-fashionable-hair-beard-wearing-white-shirt-132578103.jpg', 'norma@gmail.com', 'norma moras', '60', '35');
-- INSERT INTO personal_info(user_img, username, my_name, my_weight, height) VALUES('https://i.ytimg.com/vi/x_HL0wiK4Zc/maxresdefault.jpg', 'akanksha@gmail.com', 'akanksha gupta', '40', '35');
-- INSERT INTO personal_info(user_img, username, my_name, my_weight, height) VALUES('https://www.writeups.org/wp-content/uploads/Leonard-Hofstadter-Big-Bang-Theory-Johnny-Galecki.jpg', 'leonard@gmail.com', 'leonard hoffstetard', '40', '35');
-- INSERT INTO personal_info(user_img, username, my_name, my_weight, height) VALUES('https://ichef.bbci.co.uk/news/410/cpsprodpb/3085/production/_106312421_19e4a6b4-4f8a-4a79-8ebd-c1c1d0308b97.jpg', 'minna@gmail.com', 'mina kumi', '40', '35');
-- INSERT INTO personal_info(user_img, username, my_name, my_weight, height) VALUES('https://upload.wikimedia.org/wikipedia/en/thumb/4/41/Penny_bigbangtheory.jpg/250px-Penny_bigbangtheory.jpg', 'penny@gmail.com', 'penny peterson', '40', '35');
-- INSERT INTO personal_info(user_img, username, my_name, my_weight, height) VALUES('https://the-big-bang-theory.com/images/uploads/5/rs_3463ec66edb459bd1dd.jpg', 'Sheldon@gmail.com', 'Sheldon Cooper', '40', '35');
-- INSERT INTO personal_info(user_img, username, my_name, my_weight, height) VALUES('https://api.time.com/wp-content/uploads/2019/09/rachel-green-friends-ralph-lauren-collection.jpg?quality=85&w=1012&h=569&crop=1', 'rachelGreen@gmail.com', 'Rachel Green', '40', '35');
-- INSERT INTO personal_info(user_img, username, my_name, my_weight, height) VALUES('https://www.cheatsheet.com/wp-content/uploads/2019/10/matt-le-blanc-1024x745.jpg', 'joeyTR@gmail.com', 'Joey Tribbiani', '40', '35');
-- INSERT INTO personal_info(user_img, username, my_name, my_weight, height) VALUES('', '', '', '', '');
-- SELECT TOP 23 column_name(s) FROM table_name WHERE condition;
-- INSERT INTO member_name (my_name) VALUES('Elsa');
-- INSERT INTO member_name (my_name) VALUES('Tinker');
-- INSERT INTO member_name (my_name) VALUES('Hermi');
-- INSERT INTO member_name (my_name) VALUES('Daria');
-- INSERT INTO member_name (my_name) VALUES('Brave');
-- INSERT INTO member_name (my_name) VALUES('Ann');
-- INSERT INTO member_name (my_name) VALUES('Jane');
-- INSERT INTO member_info (my_name, my_weight, my_height, BMI, goal, diet) VALUES('Elsa', 116, 156, 29, 5, 'loose weight by walk');
-- INSERT INTO member_info (my_name, my_weight, my_height, BMI, goal, diet) VALUES('Fiona', 200, 165, 37.8, 10, 'loose weight by walk');
-- UPDATE personal_info SET user_img = ('https://image.shutterstock.com/image-vector/beauty-260nw-361612655.jpg') WHERE id = 1;
-- SELECT * FROM personal_info;
-- # UPDATE personal_info SET user_img = ('https://freedesignfile.com/upload/2019/10/Beautiful-girl-cartoon-portrait-vector.jpg') WHERE id = 2;
-- UPDATE personal_info SET user_img = ('https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/how-tocontour-1559935395.jpg?crop=0.922xw:0.615xh;0.0493xw,0.0110xh&resize=480:*') WHERE id = 3;
-- UPDATE personal_info SET user_img = ('https://image.shutterstock.com/image-vector/funny-cartoon-nerd-girl-on-600w-737526154.jpg') WHERE id = 2;
-- INSERT INTO member_goal (goal_message) VALUES('i want to loose 10pounds');
-- INSERT INTO member_goal (goal_message) VALUES('i want to loose 5 pounds follow keto diet');
-- INSpersonal_infoERT INTO group_goal (goal_message) VALUES(x);
-- ## INSERT INTO top_three (name, weight, user_img) VALUES('Elsa', 116, 'assets/userdb/user_one.png');
-- ## INSERT INTO top_three (name, weight, user_img) VALUES('Elsa', 116, 'assets/userdb/user_two.png');
-- INSERT INTO group_posts();
SELECT new_group.group_name,new_group.group_id,personal_info.id,personal_info.my_name, personal_info.my_weight, personal_info.height, personal_info.BMI, personal_info.goal, group_member.grp_mbr_id FROM new_group, personal_info, group_member WHERE new_group.group_id=group_member.group_id_fk AND personal_info.id=group_member.member_id_frk AND new_group.group_id = 1 ;
SELECT new_group.group_id,new_group.group_name,new_group.group_imageUrl,new_group.group_goal,new_group.createdAt,
personal_info.id, personal_info.user_img, personal_info.username, personal_info.my_name, personal_info.my_weight, personal_info.height, personal_info.goal,
group_member.grp_mbr_id
FROM new_group, personal_info, group_member WHERE new_group.group_id=group_member.group_id_fk AND personal_info.id=group_member.member_id_frk AND new_group.group_id = 1 ;