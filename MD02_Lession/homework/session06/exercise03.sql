-- Tìm kiếm sản phẩm nâng cao

CREATE TABLE products (
    product_id INT PRIMARY KEY,
    product_name VARCHAR(100),
    price DECIMAL(15,2),
    category_id INT
);

-- Tìm các sản phẩm có giá nằm trong một khoảng cụ thể
SELECT product_id, product_name, price
FROM products
WHERE price BETWEEN 2000000 AND 10000000;

-- Tìm các sản phẩm có tên chứa một chuỗi ký tự nhất định
SELECT product_id, product_name, price
FROM products
WHERE product_name LIKE '%Laptop%';

-- Tính giá trung bình của sản phẩm cho mỗi danh mục
SELECT category_id, AVG(price) AS avg_price
FROM products
GROUP BY category_id;

-- Tìm những sản phẩm có giá cao hơn mức giá trung bình của toàn bộ sản phẩm
SELECT product_id, product_name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);

-- Tìm sản phẩm có giá thấp nhất cho từng danh mục
SELECT p1.product_id, p1.product_name, p1.price, p1.category_id
FROM products p1
INNER JOIN (
    SELECT category_id, MIN(price) AS min_price
    FROM products
    GROUP BY category_id
) p2
ON p1.category_id = p2.category_id AND p1.price = p2.min_price;
 