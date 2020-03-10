CREATE DATABASE fitness_diaries;
USE fitness_diaries;

CREATE TABLE personal_info(
	name VARCHAR(250),
    username VARCHAR(250),
    password VARCHAR(250),
    weight DECIMAL(4,2),
    height DECIMAL(4,2),
    BMI DECIMAL(4,2),
    goal VARCHAR(250),
    diet VARCHAR(250),
    goalCompleted BOOLEAN DEFAULT false
);

CREATE TABLE group_info(
	group_name VARCHAR(250),
    goal VARCHAR(250),
    diet VARCHAR(250),
    goalCompleted BOOLEAN DEFAULT false
);