-- [Bài tập] Group by và Having
-- Tạo bảng
CREATE TABLE employees (
    emp_id INT,
    full_name VARCHAR(100),
    department VARCHAR(50),
    salary DECIMAL(15,0)
);

-- Thống kê mỗi phòng ban có bao nhiêu nhân viên
SELECT
    department,
    COUNT(*) AS total_employees
FROM employees
GROUP BY department;

-- Tính mức lương trung bình của từng phòng ban
SELECT
    department,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department;

-- Chỉ hiển thị các phòng ban có trên 3 nhân viên
SELECT
    department,
    COUNT(*) AS total_employees
FROM employees
GROUP BY department
HAVING COUNT(*) > 3;

-- Chỉ hiển thị các phòng ban có lương trung bình > 12.000.000
SELECT
    department,
    AVG(salary) AS avg_salary
FROM employees
GROUP BY department
HAVING AVG(salary) > 12000000;