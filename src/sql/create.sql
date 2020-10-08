CREATE TABLE student_registration (
	ra int PRIMARY KEY,
	name VARCHAR(50)  NOT NULL,
	email VARCHAR(50) UNIQUE NOT NULL,
	CPF bigint UNIQUE NOT NULL
);