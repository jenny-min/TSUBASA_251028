USE session03;

-- [ Luyện tập ] Quản lý đơn hàng - Sản phẩm

-- ERD (Sơ đồ quan hệ)
-- ORDERS
-- ------------------
-- order_id (PK)
-- order_date
-- customer_name


-- PRODUCTS
-- ------------------
-- product_id (PK)
-- product_name
-- price


-- ORDER_ITEMS
-- ------------------
-- order_id (PK, FK)
-- product_id (PK, FK)
-- quantity

-- Tạo bảng
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    order_date DATE NOT NULL,
    customer_name VARCHAR(100)
);

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(100) NOT NULL,
    price DECIMAL(10,2) NOT NULL
);

CREATE TABLE order_items (
    order_id INT,
    product_id INT,
    quantity INT NOT NULL,

    PRIMARY KEY (order_id, product_id),

    FOREIGN KEY (order_id) REFERENCES orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
 
