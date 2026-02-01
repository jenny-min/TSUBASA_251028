CREATE SCHEMA session06;

USE session06;

-- Tạo bảng 
CREATE TABLE students(
student_id INT PRIMARY KEY,
full_name VARCHAR(100),
birthday DATE,
class VARCHAR(50),
address VARCHAR(200)
);

-- Thêm dữ liệu
INSERT INTO students (student_id, full_name, birthday, class, address)
VALUES
(1, 'Nguyễn Văn An', '2002-05-10', 'CNTT01', 'Hà Nội'),
(2, 'Trần Thị Bình', '2001-09-22', 'CNTT01', 'Hải Phòng'),
(3, 'Lê Văn Cường', '2002-12-03', 'QTKD02', 'Đà Nẵng'),
(4, 'Phạm Thị Dung', '2001-03-18', 'QTKD02', 'TP. Hồ Chí Minh'),
(5, 'Hoàng Văn Em', '2003-07-25', 'CNTT02', 'Cần Thơ');

-- Tạo view 
CREATE VIEW v_student_basic AS
SELECT student_id,
full_name,
class
FROM students;
