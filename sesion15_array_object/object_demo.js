//Khai báo đối tượng
// const object_name { key: value }
const product = {
    id: 1,
    productName: "Iphone 12 pro max",
    price: 12000000,
    address: "Hà Nội, Việt Nam",
    color: "white",
};

//1. Thao tác đọc dữ liệu (Cú pháp: tên_đối_tượng.key)
//1.1 Đọc từng dữ liệu dựa vào key
console.log("Product id: ", product.id);
console.log("Product name: ", product.productName);
console.log("Product price: ", product['price']);

//1.2 Đọc tất cả các thông tin có trong đối tượng
console.log("==== Các key của đối tượng product ====");

for (const key in product) {
    console.log(key);
}

console.log("==== Các value của đối tượng product ====");

for (const key in product) {
    console.log(key + " - " + product[key]);
}

//2. Thao tác thêm key vào trong đối tượng
product.quantity = 100;
product.discount = "10%";
console.log("Đối tượng product sau khi thêm key - value: ", product);

//3. Thao tác cập nhật giá trị trong object
product.quantity = 1000;
console.log("Đối tượng product sau khi cập nhật: ", product);


//4. Thao tác xóa key
console.log("Color product trước khi xóa: ", product.color);

delete product.color;
console.log("Đối tượng product sau khi xóa key: ", product);
console.log("Color product sau khi xóa: ", product.color);
