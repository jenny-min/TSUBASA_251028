// Thao tác khởi tạo mảng
const numbers = [
    10, 20, 40, 50, 60, 20, 100
];

// Đếm số lượng phần tử trong mảng
const numbersLenght = numbers.length;

// Kết luận: Mảng bắt đầu từ vị trí bằng 0 và kết thúc ở numbers.lenght - 1
console.log("Mảng numbers: ", numbers);
console.log("Độ dài của mảng numbers: ", numbersLenght);
// Các thao tác C/R/U/D (Create - Read - Update - Delete)
// 1. Thao tác dọc dữ liệu:
// 1.1 Đọc từng phần tử, dựa vào chỉ số của từng phần tử
console.log("Giá trị của phần tử đầu tiên: ", numbers[0]);
console.log("Giá trị của phần tử thứ 2: ", numbers[1]);
console.log("Giá trị của phần tử cuối cùng: ", numbers[numbers.length - 1]);

// 1.2 Đọc tất cả các phần tử có trong mảng

// 1.2.1 Duyệt theo chiều xuôi
console.log("=====Mảng in xuôi=====");
for (let i = 0; i < numbers.length; i++) {
    // number[i]: Đại diện cho từng phần tử trong mảng
    // if (numbers[i] >= 100) {
    //     console.log(numbers[i]);
    // }
    console.log(numbers[i]);
}

// 1.2.2 Duyệt theo chiều ngược
console.log("====Mảng in ngược====");
for (let i = numbers.length - 1; i >= 0; i--) {
    console.log(numbers[i]);
}

// 2. Thao tác thêm phần tử vào trong mảng
// 2.1 Thêm phần tử vào cuối mảng
numbers.push(120);
numbers.push(130);
numbers.push(140);
numbers.push(150);

console.log("Mảng numbers sau khi push: ", numbers);


// 2.2 Thêm phần tử vào đầu mảng
numbers.unshift(2);
numbers.unshift(3);
numbers.unshift(5);

console.log("Mảng numbers sau khi unshift: ", numbers);

// 2.3 Thêm phần tử vào vị trí bất kỳ trong mảng
numbers.splice(1, 0, 2.5);

console.log("Mảng numbers sau khi splice: ", numbers);


// 3. Thao tác cập nhật phần tử trong mảng
numbers[0] - 3.5;
numbers[1] - 4.5;

console.log("Mảng sau khi được cập nhật: ", numbers);

// 4. Xóa phần tử trong mảng
// 4.1 Xóa phần tử ở cuối mảng
numbers.pop();
numbers.pop();

console.log("Mảng sau khi pop(): ", numbers);

// 4.2 Xóa phần tử ở đầu mảng
numbers.shift();
numbers.shift();

console.log("Mảng sau khi shift(): ", numbers);

// 3.3 Xóa phần tử vào vị trí bất kỳ trong mảng
numbers.splice(3, 1);

console.log("Mảng sau khi splice(): ", numbers);
