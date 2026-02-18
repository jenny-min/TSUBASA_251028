CREATE SCHEMA employee_management;

USE employee_management;

-- [Bài tập] Luyện tập Trigger trong quản trị nhân sự
-- 1. Bảng departments (Phòng ban)
CREATE TABLE departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    department_name VARCHAR(255) NOT NULL
);

-- 2. Bảng employees (Nhân viên)
CREATE TABLE employees (
    employee_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    hire_date DATE NOT NULL,
    department_id INT NOT NULL,
    FOREIGN KEY (department_id) REFERENCES departments(department_id) ON DELETE CASCADE
);

-- 3. Bảng attendance (Chấm công)
CREATE TABLE attendance (
    attendance_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    check_in_time DATETIME NOT NULL,
    check_out_time DATETIME,
    total_hours DECIMAL(5,2),
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);

-- 4. Bảng salaries (Bảng lương)
CREATE TABLE salaries (
    employee_id INT PRIMARY KEY,
    base_salary DECIMAL(10,2) NOT NULL,
    bonus DECIMAL(10,2) DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);

-- 5. Bảng salary_history (Lịch sử lương)
CREATE TABLE salary_history (
    history_id INT PRIMARY KEY AUTO_INCREMENT,
    employee_id INT NOT NULL,
    old_salary DECIMAL(10,2),
    new_salary DECIMAL(10,2),
    change_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    reason TEXT,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id) ON DELETE CASCADE
);

-- Trigger BEFORE INSERT: Chuẩn hóa email
-- Mục tiêu: Nếu nhân viên mới nhập email không có đuôi @company.com, Trigger sẽ tự động thêm đuôi này

DELIMITER $$

CREATE TRIGGER before_insert_employee_email
BEFORE INSERT ON employees
FOR EACH ROW
BEGIN
    -- Kiểm tra nếu email chưa có đuôi @company.com
    IF NEW.email NOT LIKE '%@company.com' THEN
        SET NEW.email = CONCAT(NEW.email, '@company.com');
    END IF;
END$$

DELIMITER ;

-- Trigger AFTER INSERT: Tạo bản ghi lương mặc định
-- Mục tiêu: Khi một nhân viên mới được thêm, tự động tạo bản ghi trong salaries với base_salary = 10000.00 và bonus = 0 
DELIMITER $$

CREATE TRIGGER after_insert_employee_salary
AFTER INSERT ON employees
FOR EACH ROW
BEGIN
    INSERT INTO salaries(employee_id, base_salary, bonus)
    VALUES (NEW.employee_id, 10000.00, 0);
END$$

DELIMITER ;

-- Trigger BEFORE UPDATE: Tính tổng giờ làm khi checkout
-- Mục tiêu: Khi cập nhật check_out_time trong bảng attendance, tự động tính total_hours = check_out - check_in 
DELIMITER $$

CREATE TRIGGER before_update_attendance_hours
BEFORE UPDATE ON attendance
FOR EACH ROW
BEGIN
    -- Chỉ tính giờ nếu có check_out_time mới
    IF NEW.check_out_time IS NOT NULL THEN
        SET NEW.total_hours = TIMESTAMPDIFF(MINUTE, NEW.check_in_time, NEW.check_out_time) / 60;
    END IF;
END$$

DELIMITER ;

-- Trigger BEFORE DELETE: Lưu lịch sử lương khi nhân viên nghỉ việc (tuỳ chọn)
-- Mục tiêu: Khi nhân viên bị xóa, lưu thông tin lương hiện tại vào salary_history 
DELIMITER $$

CREATE TRIGGER before_delete_employee_salary_history
BEFORE DELETE ON employees
FOR EACH ROW
BEGIN
    DECLARE current_salary DECIMAL(10,2);

    SELECT base_salary INTO current_salary
    FROM salaries
    WHERE employee_id = OLD.employee_id;

    INSERT INTO salary_history(employee_id, old_salary, new_salary, reason)
    VALUES (OLD.employee_id, current_salary, NULL, 'Nhân viên nghỉ việc');
END$$

DELIMITER ;

-- Kiểm tra Trigger
-- Thêm phòng ban
INSERT INTO departments(department_name) VALUES ('Phòng Kế toán');
 
-- Thêm nhân viên mới không có đuôi email
INSERT INTO employees(employee_name, email, phone, hire_date, department_id)
VALUES ('Nguyen Van A', 'nguyenvana', '0909123456', '2026-02-18', 1);

-- Xem bảng employees
SELECT * FROM employees;

-- Xem bảng salaries
SELECT * FROM salaries;

-- Cập nhật thời gian checkout
INSERT INTO attendance(employee_id, check_in_time)
VALUES (1, '2026-02-18 08:30:00');

SET SQL_SAFE_UPDATES = 0;
UPDATE attendance
SET check_out_time = '2026-02-18 17:15:00'
WHERE attendance_id = 1;

-- Xem bảng attendance
SELECT * FROM attendance;