-- View phục vụ phân quyền truy cập

USE session06; 

-- Tạo bảng
CREATE TABLE employees(
employee_id INT PRIMARY KEY,
full_name VARCHAR(100),
department VARCHAR(50),
salary DECIMAL(15,0),
national_id INT
); 

-- Tạo view
CREATE VIEW v_employee_public AS
SELECT 
 employee_id,
 full_name,
 department
 FROM employees;