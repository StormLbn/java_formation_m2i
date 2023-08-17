CREATE TABLE IF NOT EXISTS student (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(50),
	last_name VARCHAR(50),
	class_number INT,
	degree_date DATE
);

SELECT * FROM public.student;
