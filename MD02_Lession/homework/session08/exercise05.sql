-- Stored Procedure sử dụng nhiều tham số và IF

USE session08;

-- Tạo bảng
CREATE TABLE employees(
employee_id INT PRIMARY KEY,
full_name VARCHAR(100),
salary DECIMAL(20,0),
department VARCHAR(50)
);

-- tạo PROCEDURE
DELIMITER $$ 
CREATE PROCEDURE sp_check_employee_income(
IN p_full_name VARCHAR(100),
IN p_salary DECIMAL(20,0)
)
BEGIN
DECLARE income_level VARCHAR(50);

-- Xác định mức thu nhập
 IF p_salary >= 15000000 THEN
	SET income_level = 'Thu nhập cao';
ELSEIF p_salary >= 8000000 THEN
	SET income_level = 'Thu nhập trung bình';
ELSE
	SET income_level = 'Thu nhập thấp';
END IF;

-- Hiển thị kết quả
SELECT p_full_name AS employee_name,
	   income_level AS income_level;
END $$
DELIMITER ;

-- Gọi PROCEDURE
CALL  sp_check_employee_income();