USE session05;

-- [Bài tập] Sử dụng các hàm SQL thông dụng

-- Tạo bảng
CREATE TABLE students (
	student_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    birth_year INT NOT NULL,
    gender VARCHAR(10),
    score DECIMAL(4,2)
); 

-- Thêm dữ liệu vào bảng
INSERT INTO students (full_name, birth_year, gender, score)
VALUES
('Nguyen Van An', '2002-03-15', 'Nam', 8.25),
('Tran Thi Binh', '2001-07-22', 'Nu', 7.80),
('Le Minh Chau', '2003-01-10', 'Nu', 9.10),
('Pham Quoc Dat', '2000-11-05', 'Nam', 6.95),
('Hoang Thi Em', '2002-06-18', 'Nu', 8.60),
('Do Van Phuc', '2001-09-30', 'Nam', 7.25),
('Bui Minh Giang', '2003-12-02', 'Nam', 9.45),
('Vu Thi Huong', '2000-04-27', 'Nu', 6.80),
('Dang Quang Khanh', '2002-08-14', 'Nam', 8.90),
('Nguyen Thi Lan', '2001-02-09', 'Nu', 7.55);

-- Hiển thị mã sinh viên và họ tên viết hoa toàn bộ
SELECT 
    student_id,
    UPPER(full_name) AS full_name_upper
FROM students;

-- Hiển thị họ tên và số tuổi của sinh viên (dựa vào năm hiện tại) 
SELECT
    full_name,
    YEAR(CURDATE()) - birth_year AS age
FROM students;

-- Hiển thị điểm trung bình được làm tròn 1 chữ số thập phân
SELECT
    full_name,
    ROUND(score, 1) AS rounded_score
FROM students;

-- Hiển thị: Tổng số sinh viên, Điểm cao nhất, Điểm thấp nhất  
SELECT
    COUNT(*) AS total_students,
    MAX(score) AS highest_score,
    MIN(score) AS lowest_score
FROM students;
