-- [Bài tập] Truy vấn với điều kiện (WHERE + BETWEEN + IN)

-- Hiển thị sinh viên có năm sinh từ 2003 đến 2005
SELECT student_id, full_name, birth_date
FROM students
WHERE YEAR(birth_date) BETWEEN 2003 AND 2005;

-- Hiển thị sinh viên có giới tính là Nam hoặc Nữ
SELECT student_id, full_name, birth_date
FROM students
WHERE gender IN ('Nam', 'Nữ');

-- Hiển thị sinh viên có mã sinh viên thuộc một trong các mã: SV001, SV004, SV005
SELECT student_id, full_name, birth_date
FROM students
WHERE student_id IN (1, 4, 5);

