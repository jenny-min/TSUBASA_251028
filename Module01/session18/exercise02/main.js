let products = [
    { id: 1, name: 'Milk', count: 100 },
    { id: 2, name: 'Orange', count: 100 },
    { id: 3, name: 'Butter', count: 100 }
];

//Thêm đối tượng vào mảng
products.push({ id: 4, name: 'Cheese', count: 50 });
console.log(products);


//Xóa đối tượng có id 2
products = products.filter(product => product.id !== 2);
console.log(products);

//Truy vấn đến đối tượng có id là 3, sau đó cập nhật lại giá trị count = 0
let productUpdate = products.find(product => product.id === 3);

if (productUpdate) {
    productUpdate.count = 0;
}

console.log(products);

//Cho từ khóa “Butter”. Kiểm tra từ khóa có trong mảng “products” hay không? Nếu Có in toàn bộ thông tin, nếu Không hiển thị thông báo “Không có dữ liệu bạn tìm kiếm”

let keyword = "Butter";

let result = products.find(product => product.name === keyword);

if (result) {
    console.log("Tìm thấy sản phẩm:", result);
} else {
    console.log("Không có dữ liệu bạn tìm kiếm");
}