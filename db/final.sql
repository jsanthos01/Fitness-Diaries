DROP DATABASE IF EXISTS fitness_diaries;
CREATE DATABASE fitness_diaries;
USE fitness_diaries;

---------------------------------- Login/Registration html page ---------------------------------------------

CREATE TABLE login_credential(
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    my_name VARCHAR(250),
    username VARCHAR(250),
    user_password VARCHAR(250),
    user_img VARCHAR(250),
    createdAt TIMESTAMP not null default CURRENT_TIMESTAMP
);

---------------------------------- Individual html page ---------------------------------------------

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

CREATE TABLE new_group (
    group_id INT PRIMARY KEY AUTO_INCREMENT,
    group_name VARCHAR(100) NOT NULL,
    group_goal INT,
    group_imageUrl VARCHAR(250),
    createdAt TIMESTAMP not null default CURRENT_TIMESTAMP
);

CREATE TABLE group_member (
    grp_mbr_id INT PRIMARY KEY AUTO_INCREMENT ,
    member_name VARCHAR(100) NOT NULL,
    member_id_frk INT,
    FOREIGN KEY (member_id_frk) REFERENCES personal_info(id),
    group_id_fk INT,
    FOREIGN KEY (group_id_fk) REFERENCES new_group(group_id),
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
    post_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    group_member_name VARCHAR(250),
    info VARCHAR(250),
    creation_time DATETIME DEFAULT CURRENT_TIMESTAMP,
    update_time DATETIME ON UPDATE CURRENT_TIMESTAMP,
    member_id INT,
    thumbs_up INT DEFAULT 0,
    user_comments VARCHAR(1000),
    FOREIGN KEY (member_id) REFERENCES personal_info(id),
    posts_group_id INT,
    FOREIGN KEY (posts_group_id) REFERENCES new_group(group_id),
    createdAt TIMESTAMP not null default CURRENT_TIMESTAMP
);

CREATE TABLE post_comments(
	comment_id INTEGER PRIMARY KEY NOT NULL AUTO_INCREMENT,
    commenters_name VARCHAR(250),
    commenters_id INT,
    comments VARCHAR(1000),
    cmnts_post_id INT,
    FOREIGN KEY (commenters_id) REFERENCES personal_info(id),
    FOREIGN KEY (cmnts_post_id) REFERENCES group_posts(post_id),
	createdAt TIMESTAMP not null default CURRENT_TIMESTAMP

);


SELECT COUNT(*) comments FROM post_comments WHERE cmnts_post_id = 1;

SELECT post_comments.commenters_name, post_comments.comment_id, post_comments.comments, post_comments.createdAt,
	personal_info.id, personal_info.user_img, personal_info.my_name,
    group_posts.post_id,group_posts.posts_group_id
	FROM post_comments, personal_info, group_posts 
    WHERE post_comments.commenters_id = personal_info.id 
    AND post_comments.cmnts_post_id = group_posts.post_id 
    AND cmnts_post_id = 1
    ORDER BY post_comments.createdAt ASC;
        
SELECT group_posts.group_member_name, group_posts.post_id, group_posts.info, group_posts.creation_time, group_posts.thumbs_up, group_posts.user_comments,
 personal_info.id, personal_info.user_img,
 new_group.group_id, new_group.group_name 
 FROM group_posts, personal_info, new_group WHERE
 group_posts.posts_group_id=new_group.group_id AND group_posts.member_id=personal_info.id; #AND new_group.group_id = 1 ;

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

SELECT * FROM personal_goal;
SELECT * FROM personal_goal WHERE goalCompleted=0;
SELECT * FROM personal_goal WHERE goalCompleted= 1 AND userId=3;
SELECT * FROM personal_goal WHERE goalCompleted= 1 AND userId=3 ORDER BY updatedTime DESC LIMIT 20;
SELECT * FROM personal_goal WHERE goalCompleted= 1 ORDER BY updatedTime DESC LIMIT 5; 
SELECT * FROM personal_goal WHERE goalCompleted = 0 AND userId = 1;

SELECT * FROM personal_goal WHERE goalCompleted= 1 AND userId=? ORDER BY updatedTime DESC LIMIT 20;


SELECT new_group.group_name,new_group.group_id,personal_info.id,personal_info.my_name, personal_info.my_weight, personal_info.height, personal_info.BMI, personal_info.goal, group_member.grp_mbr_id FROM new_group, personal_info, group_member WHERE new_group.group_id=group_member.group_id_fk AND personal_info.id=group_member.member_id_frk AND new_group.group_id = 1 ;

SELECT new_group.group_id,new_group.group_name,new_group.group_imageUrl,new_group.group_goal,new_group.createdAt,
personal_info.id, personal_info.user_img, personal_info.username, personal_info.my_name, personal_info.my_weight, personal_info.height, personal_info.goal,
group_member.grp_mbr_id
FROM new_group, personal_info, group_member WHERE new_group.group_id=group_member.group_id_fk AND personal_info.id=group_member.member_id_frk AND new_group.group_id = 1 ;
