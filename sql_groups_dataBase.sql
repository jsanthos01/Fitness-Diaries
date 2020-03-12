DROP DATABASE IF EXISTS fitness_diaries;
CREATE DATABASE fitness_diaries;
USE fitness_diaries;
CREATE TABLE new_group (
group_id INT PRIMARY KEY auto_increment,
group_name VARCHAR(100) NOT NULL,
group_goal VARCHAR(350),
group_imageUrl VARCHAR(250) 
);
CREATE TABLE member_info (
member_id INT PRIMARY KEY auto_increment ,
member_name VARCHAR(100) NOT NULL,
email_id VARCHAR(100) NOT NULL,
group_id_fk INT,
FOREIGN KEY (group_id_fk) REFERENCES new_group(group_id)
);
INSERT INTO new_group (group_name, group_imageUrl, group_goal) VALUES('Chatter Box', 'https://www.afaa.com/images/default-source/blog/groupfitness-vs-personaltraining.jpg?sfvrsn=2', 'lose 200 lb');
INSERT INTO new_group (group_name, group_imageUrl) VALUES('Fun WorkOut', 'https://img5.goodfon.com/wallpaper/nbig/1/54/fitness-group-workout-1.jpg');
INSERT INTO member_info (member_name, email_id, group_id_fk) VALUES('joanna', 'jo@gmail.com', '1' );
INSERT INTO member_info (member_name, email_id, group_id_fk) VALUES('sara', 'sara@gmail.com', '1' );
INSERT INTO member_info (member_name, email_id, group_id_fk) VALUES('norma', 'norma@gmail.com', '2' );
INSERT INTO member_info (member_name, email_id, group_id_fk) VALUES('akanksha', 'akanksha@gmail.com', '2' );

SELECT * FROM new_group;
SELECT * FROM member_info;
