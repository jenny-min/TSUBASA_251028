-- [Bài tập] Truy vấn nâng cao cơ bản (LIKE + IS NULL + NOT)
-- Hiển thị sinh viên chưa có email
SELECT student_id, full_name, birth_date, gender, email
FROM students
WHERE email IS NULL;

-- Hiển thị sinh viên đã có email
SELECT student_id, full_name, birth_date, gender, email
FROM students
WHERE email IS NOT NULL;

-- Hiển thị sinh viên có họ tên bắt đầu bằng “Ng”
SELECT student_id, full_name, birth_date, gender, email
FROM students
WHERE full_name LIKE 'Ng%';

-- Hiển thị sinh viên không phải giới tính Nam
SELECT student_id, full_name, birth_date, gender, email
FROM students
WHERE gender <> 'Nam';     