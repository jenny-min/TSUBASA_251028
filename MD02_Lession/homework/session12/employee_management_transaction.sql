USE employee_management;

-- Stored Procedure IncreaseSalary
-- Mục tiêu: Tăng lương cho nhân viên và lưu lịch sử lương, đảm bảo rollback nếu nhân viên không tồn tại 
DELIMITER $$

CREATE PROCEDURE IncreaseSalary(
    IN emp_id INT,
    IN new_salary DECIMAL(10,2),
    IN reason_text TEXT
)
BEGIN
    DECLARE emp_exists INT;

    -- Bắt đầu giao dịch
    START TRANSACTION;

    -- Kiểm tra sự tồn tại của nhân viên
    SELECT COUNT(*) INTO emp_exists
    FROM employees
    WHERE employee_id = emp_id;

    IF emp_exists = 0 THEN
        -- Nếu nhân viên không tồn tại, rollback và thoát
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Nhân viên không tồn tại!';
    ELSE
        -- Lấy lương cũ để lưu vào lịch sử
        INSERT INTO salary_history(employee_id, old_salary, new_salary, reason)
        SELECT s.employee_id, s.base_salary, new_salary, reason_text
        FROM salaries s
        WHERE s.employee_id = emp_id;

        -- Cập nhật lương mới
        UPDATE salaries
        SET base_salary = new_salary
        WHERE employee_id = emp_id;

        -- Xác nhận giao dịch
        COMMIT;
    END IF;
END$$

DELIMITER ;

-- Stored Procedure DeleteEmployee
-- Mục tiêu: Xóa nhân viên và lương, nhưng vẫn giữ lịch sử lương 
DELIMITER $$

CREATE PROCEDURE DeleteEmployee(
    IN emp_id INT
)
BEGIN
    DECLARE emp_exists INT;

    -- Bắt đầu giao dịch
    START TRANSACTION;

    -- Kiểm tra sự tồn tại của nhân viên
    SELECT COUNT(*) INTO emp_exists
    FROM employees
    WHERE employee_id = emp_id;

    IF emp_exists = 0 THEN
        -- Nếu nhân viên không tồn tại, rollback và thoát
        ROLLBACK;
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Nhân viên không tồn tại!';
    ELSE
        -- Xóa lương trước để tránh vi phạm khóa ngoại
        DELETE FROM salaries WHERE employee_id = emp_id;

        -- Xóa nhân viên
        DELETE FROM employees WHERE employee_id = emp_id;

        -- Xác nhận giao dịch
        COMMIT;
    END IF;
END$$

DELIMITER ;

-- gọi Stored Procedure
-- Tăng lương nhân viên có employee_id = 1 lên 12000 với lý do
CALL IncreaseSalary(2, 12000.00, 'Tăng lương định kỳ 2026');

-- Kiểm tra kết quả
-- Xem bảng salaries
SELECT * FROM salaries;

-- Xem bảng salary_history
SELECT * FROM salary_history;

-- Xem bảng employees
SELECT * FROM employees;
 