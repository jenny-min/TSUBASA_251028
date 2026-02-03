-- [Bài tập] Tối ưu hóa tốc độ tìm kiếm khách hàng (Index)
-- Tạo bảng
CREATE TABLE customers(
	customer_id INT PRIMARY KEY AUTO_INCREMENT,
	customer_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL,
    address VARCHAR(255) NOT NULL
); 

-- Tạo Unique index cho cột email
CREATE UNIQUE INDEX idx_email ON customers(email);

-- Tạo Non-Unique index cho cột phone
CREATE INDEX idx_phone ON customers(phone);

-- Thêm dữ liệu
INSERT INTO customers (customer_name, email, phone, address) VALUES
('Nguyen Van An', 'an.nguyen@gmail.com', '0901234567', 'Ha Noi'),
('Tran Thi Binh', 'binh.tran@gmail.com', '0901234568', 'Hai Phong'),
('Le Van Cuong', 'cuong.le@gmail.com', '0901234569', 'Da Nang'),
('Pham Thi Dao', 'dao.pham@gmail.com', '0901234570', 'Hue'),
('Hoang Van Em', 'em.hoang@gmail.com', '0901234571', 'Quang Nam'),
('Do Thi Phuong', 'phuong.do@gmail.com', '0901234572', 'Ha Noi'),
('Bui Van Giang', 'giang.bui@gmail.com', '0901234573', 'Bac Ninh'),
('Vu Thi Hang', 'hang.vu@gmail.com', '0901234574', 'Ha Nam'),
('Dang Van Kien', 'kien.dang@gmail.com', '0901234575', 'Nam Dinh'),
('Phan Thi Lan', 'lan.phan@gmail.com', '0901234576', 'Thai Binh'),

('Nguyen Van Minh', 'minh.nguyen@gmail.com', '0241234567', 'Ha Noi'),
('Tran Thi Nga', 'nga.tran@gmail.com', '0241234567', 'Ha Noi'),
('Le Van Oanh', 'oanh.le@gmail.com', '0281234567', 'TP HCM'),
('Pham Thi Phuong', 'phuong.pham@gmail.com', '0281234567', 'TP HCM'),
('Hoang Van Quang', 'quang.hoang@gmail.com', '0236123456', 'Da Nang'),
('Do Thi Thao', 'thao.do@gmail.com', '0236123456', 'Da Nang'),
('Bui Van Tuan', 'tuan.bui@gmail.com', '0912345678', 'Vinh'),
('Vu Thi Uyen', 'uyen.vu@gmail.com', '0912345679', 'Thanh Hoa'),
('Dang Van Vinh', 'vinh.dang@gmail.com', '0912345680', 'Can Tho'),
('Phan Thi Xuan', 'xuan.phan@gmail.com', '0912345681', 'Ca Mau');

-- Kiểm tra chỉ mục
EXPLAIN SELECT * FROM customers WHERE email = 'minh.nguyen@gmail.com';

EXPLAIN SELECT * FROM customers WHERE phone = '0241234567';