-- [Bài tập] Trigger after update – Ghi Nhật ký thay đổi

-- Tạo bảng employees
CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    salary DECIMAL(10,2) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone_number VARCHAR(15)
);

-- Tạo bảng salary_log
CREATE TABLE salary_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    old_salary DECIMAL(10, 2) NOT NULL,
    new_salary DECIMAL(10, 2) NOT NULL,
    change_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(id)
);

-- Thêm 10 bản ghi vào bảng employees
INSERT INTO employees (first_name, last_name, salary, email, phone_number) VALUES
('Nguyen', 'An', 5000.00, 'nguyen.an@example.com', '0912345678'),
('Tran', 'Binh', 5500.00, 'tran.binh@example.com', '0912345679'),
('Le', 'Cuong', 6000.00, 'le.cuong@example.com', '0912345680'),
('Pham', 'Dung', 5200.00, 'pham.dung@example.com', '0912345681'),
('Hoang', 'Em', 5800.00, 'hoang.em@example.com', '0912345682'),
('Vu', 'Phong', 6200.00, 'vu.phong@example.com', '0912345683'),
('Dang', 'Hoa', 5300.00, 'dang.hoa@example.com', '0912345684'),
('Bui', 'Khanh', 5700.00, 'bui.khanh@example.com', '0912345685'),
('Do', 'Linh', 6100.00, 'do.linh@example.com', '0912345686'),
('Ngoc', 'Mai', 5900.00, 'ngoc.mai@example.com', '0912345687');


-- Tạo trigger trg_after_update_salary
DELIMITER //

CREATE TRIGGER trg_after_update_salary
AFTER UPDATE ON employees
FOR EACH ROW
BEGIN
    -- Ghi lại thông tin thay đổi vào bảng salary_log
    INSERT INTO salary_log (employee_id, old_salary, new_salary)
    VALUES (OLD.id, OLD.salary, NEW.salary);
END //

DELIMITER ;

-- Kiểm tra trigger
SET SQL_SAFE_UPDATES = 0;
UPDATE employees SET salary = 6000.00 WHERE id = 1;  
UPDATE employees SET salary = 7000.00 WHERE id = 2;  

-- Xem kết quả
SELECT * FROM salary_log;