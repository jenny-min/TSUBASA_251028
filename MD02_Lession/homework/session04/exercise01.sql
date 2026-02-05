-- [Bài tập] Thêm dữ liệu sinh viên (INSERT + SELECT)
USE session04;

-- Tạo bảng 
CREATE TABLE students (
    student_id INT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    birth_date DATE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    email VARCHAR(100)
);

-- Thêm dữ liệu vào bảng
INSERT INTO students (student_id, full_name, birth_date, gender, email) VALUES
(1, 'Nguyễn Văn An', '2002-03-15', 'Nam', 'an.nguyen@gmail.com'),
(2, 'Trần Thị Bình', '2001-11-22', 'Nữ', 'binh.tran@gmail.com'),
(3, 'Lê Minh Cường', '2002-07-05', 'Nam', NULL),
(4, 'Phạm Thu Dung', '2003-01-18', 'Nữ', 'dung.pham@gmail.com'),
(5, 'Hoàng Quốc Huy', '2001-09-30', 'Nam', 'huy.hoang@gmail.com');

-- Kiểm tra dữ liệu
SELECT * FROM students;

-- Chỉ hiển thị mã sinh viên, họ tên, email
SELECT student_id, full_name, email
FROM students;
 