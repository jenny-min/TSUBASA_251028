// Tạo đối tượng original
let original = {
    name: "Bob",
    age: 30
};

// Sao chép
let copy = { ...original }; // dùng spread operator

// Thay đổi giá trị name trong copy
copy.name = "Charlie";

// In ra để kiểm tra sự khác biệt
console.log("Original:", original);
console.log("Copy:", copy);
