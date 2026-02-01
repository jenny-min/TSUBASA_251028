CREATE SCHEMA session08;

USE session08;

-- Tạo bảng
CREATE TABLE students(
student_id INT PRIMARY KEY,
full_name VARCHAR(100),
class VARCHAR(50)
); 

-- Tạo Stored Procedure
DELIMITER $$
CREATE PROCEDURE sp_get_all_students()
BEGIN
SELECT student_id, full_name, class
FROM students;
END $$
DELIMITER ;

-- Gọi procedure
CALL sp_get_all_students();