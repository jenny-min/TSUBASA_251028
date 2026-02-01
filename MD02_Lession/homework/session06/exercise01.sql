-- Bảng categories
CREATE TABLE categories (
    category_id INT PRIMARY KEY,
    category_name VARCHAR(100)
);

-- Bảng products
CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    price DECIMAL(15,2),
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(category_id)
);

INSERT INTO categories (category_id, category_name)
VALUES
(1, 'Máy tính – Laptop'),
(2, 'Điện thoại – Smartphone'),
(3, 'Phụ kiện máy tính'),
(4, 'Thiết bị gia dụng'),
(5, 'Đồ thể thao');

-- Thêm 3 sản phẩm mới vào bảng products
INSERT INTO products (product_id, product_name, price, category_id)
VALUES
(101, 'Laptop Dell', 25000000, 1),
(102, 'Điện thoại Samsung', 12000000, 2),
(103, 'Chuột Logitech', 500000, 3);

-- Cập nhật giá của một sản phẩm đã có
UPDATE products
SET price = 27000000
WHERE product_id = 101;
 
SELECT * FROM session07.products;

-- Xóa một sản phẩm
DELETE FROM products
WHERE product_id = 103;

SELECT * FROM session07.products;

-- Hiển thị tất cả sản phẩm, sắp xếp giảm dần theo giá
SELECT product_id, product_name, price, category_id
FROM products
ORDER BY price DESC;

-- Thống kê số lượng sản phẩm theo từng danh mục
SELECT c.category_name, COUNT(p.product_id) AS total_products
FROM categories c
LEFT JOIN products p
    ON c.category_id = p.category_id
GROUP BY c.category_name;
 