-- [Bài tập] Truy vấn lồng (SubQuery)
-- Tạo bảng
CREATE TABLE products (
    product_id INT,
    product_name VARCHAR(100),
    category VARCHAR(50),
    price DECIMAL(15,0)
);

-- Hiển thị các sản phẩm có giá cao hơn giá trung bình của tất cả sản phẩm
SELECT
    product_id,
    product_name,
    price
FROM products
WHERE price > (
    SELECT AVG(price)
    FROM products
);

-- Hiển thị sản phẩm có giá cao nhất trong từng loại sản phẩm
SELECT
    product_id,
    product_name,
    category,
    price
FROM products p
WHERE price = (
    SELECT MAX(price)
    FROM products
    WHERE category = p.category
);

-- Hiển thị các sản phẩm thuộc loại có ít nhất một sản phẩm giá trên 20.000.000
SELECT
    product_id,
    product_name,
    category,
    price
FROM products
WHERE category IN (
    SELECT DISTINCT category
    FROM products
    WHERE price > 20000000
);

   