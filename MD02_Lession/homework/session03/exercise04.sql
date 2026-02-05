-- [Bài tập] Quản lý tài khoản người dùng

-- ERD (1 bảng)
-- USERS
-- -------------------------
-- user_id (PK)
-- username (UNIQUE, NOT NULL)
-- password (NOT NULL)
-- email (UNIQUE)
-- status (DEFAULT)

--  Tạo bảng
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    status VARCHAR(20) DEFAULT 'active'
);

-- ALTER TABLE – Thêm ràng buộc CHECK
ALTER TABLE users
ADD CONSTRAINT chk_status
CHECK (status IN ('active', 'inactive', 'blocked'));

-- DROP TABLE – Xóa bảng khi cần
DROP TABLE users;
  