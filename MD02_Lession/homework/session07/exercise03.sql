USE session06;

-- Tạo bảng
CREATE TABLE employees (
employee_id INT PRIMARY KEY,
full_name VARCHAR(100),
department  VARCHAR(50),
salary DECIMAL(20,2)
); 

-- Tạo INDEX
CREATE INDEX idx_employees_department
ON employees(department);