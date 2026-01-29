CREATE SCHEMA session05;

USE session05;
-- Tạo bảng scores --  
CREATE TABLE scores(
student_id INT PRIMARY KEY,
subject VARCHAR(50),
score DECIMAL(3,1)
);

ALTER TABLE scores
DROP PRIMARY KEY;

ALTER TABLE scores
ADD PRIMARY KEY (student_id, subject);


-- Thêm dữ liệu -- 
INSERT INTO scores (student_id, subject, score) VALUES
(1, 'Math',     8.0),
(1, 'English',  7.5),
(1, 'Physics',  6.5),

(2, 'Math',     6.0),
(2, 'English',  6.5),
(2, 'Physics',  7.0),

(3, 'Math',     9.0),
(3, 'English',  8.5),
(3, 'Physics',  9.5),

(4, 'Math',     7.0),
(4, 'English',  7.0),
(4, 'Physics',  7.5);


SELECT * FROM scores;

-- Tính điểm trung bình của mỗi sinh viên -- 
SELECT student_id, AVG(score) AS avg_score FROM scores
GROUP BY student_id;

-- hiển thị sinh viên có điểm trung bình ≥ 7.0 -- 
SELECT student_id, AVG(score) AS avg_score FROM scores
GROUP BY student_id
HAVING AVG(score) >= 7.0;

-- hiển thị sinh viên có điểm trung bình cao nhất trong toàn bộ danh sách -- 
SELECT
    student_id,
    AVG(score) AS avg_score
FROM scores
GROUP BY student_id
HAVING AVG(score) = (
    SELECT MAX(avg_score)
    FROM (
        SELECT AVG(score) AS avg_score
        FROM scores
        GROUP BY student_id
    ) t
);

-- hiển thị sinh viên có điểm trung bình cao hơn điểm trung bình chung của tất cả sinh viên -- 
SELECT
    student_id,
    AVG(score) AS avg_score
FROM scores
GROUP BY student_id
HAVING AVG(score) > (
    SELECT AVG(score)
    FROM scores
);


