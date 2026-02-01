USE session06;

-- Tạo bảng
CREATE TABLE products (
product_id INT PRIMARY KEY,
product_name VARCHAR(200),
category VARCHAR(50),
price DECIMAL(20,2)
); 

-- Tạo index
CREATE INDEX idx_products_category_price
ON products(category, price);