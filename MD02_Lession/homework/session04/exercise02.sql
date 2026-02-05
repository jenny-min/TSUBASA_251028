-- [Bài tập] Cập nhật và xóa dữ liệu (UPDATE + DELETE)
USE session04;

SELECT *
FROM students;

-- Cập nhật email cho sinh viên chưa có email
SET SQL_SAFE_UPDATES = 0;
UPDATE students
SET email = 'default@email.com'
WHERE email IS NULL;
-- Kiểm tra lại 
SELECT *
FROM students
WHERE email = 'default@email.com';
 

-- Cập nhập giới tính cho sinh viên có mã sinh viên là SV005
UPDATE students
SET gender = 'Male'
WHERE student_id = 5;

-- Kiểm tra lại
	SELECT *
	FROM students
	WHERE student_id = 5;

-- Xóa sinh viên có mã số sinh viên SV003
DELETE FROM students
WHERE student_id = 3;
  