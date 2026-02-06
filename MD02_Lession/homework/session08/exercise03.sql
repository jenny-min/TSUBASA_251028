-- [Bài tập] Sử dụng biến trong Stored Procedure

-- Tạo Stored Procedure sp_get_avg_salary
DELIMITER $$

CREATE PROCEDURE sp_get_avg_salary()
BEGIN
    -- Khai báo biến lưu lương trung bình
    DECLARE v_avg_salary DECIMAL(15,2);

    -- Gán giá trị cho biến bằng kết quả truy vấn
    SELECT AVG(salary) INTO v_avg_salary
    FROM employees;

    -- Hiển thị giá trị biến ra màn hình
    SELECT v_avg_salary AS average_salary;
END $$

DELIMITER ;

-- Gọi Procedure
CALL sp_get_avg_salary();    