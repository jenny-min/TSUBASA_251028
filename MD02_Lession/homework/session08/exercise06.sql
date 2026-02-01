-- Stored Procedure sử dụng biến + CASE + Tham số OUT

USE session08; 

-- Tạo bảng
CREATE TABLE students(
student_id INT PRIMARY KEY,
full_name VARCHAR(100),
avg_score DECIMAL(4,2)
);

-- Tạo PROCEDURE
DELIMITER $$ 
CREATE PROCEDURE sp_classify_student(
IN p_avg_score DECIMAL(4,2),
OUT p_grade VARCHAR(20)
)
BEGIN
-- Tạo biến trung gian
DECLARE grade_level VARCHAR(50);

 -- Xác định xếp loại bằng CASE
 SET grade_level = CASE
	WHEN p_avg_score >= 8.0 THEN 'Giỏi'
	WHEN p_avg_score >= 6.5 THEN 'Khá'
	WHEN p_avg_score >= 5.0 THEN 'Trung bình'
	ELSE 'Yếu'
END;

-- Gán kết quả cho tham số OUT
SET p_grade = grade_level;
    
END $$
DELIMITER ;

-- Gọi PROCEDURE 
-- Khai báo biến để nhận kết quả OUT
SET @student_grade = '';

-- Kiểm tra kết quả
SELECT @student_grade AS grade;
 