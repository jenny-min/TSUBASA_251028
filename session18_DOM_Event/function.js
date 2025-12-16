//Giả sử chúng ta có bài toán tính tổng các số có trong mảng
const firstArray = [1, 2, 3, 4, 5, 6, 7, 8];
const secondArray = [1, 2, 3, 4, 5, 6, 0, 10, 7, 8];

//Tính tổng các phần tử có trong mảng firstArray

//Bước 1: Duyệt qua mảng
// let sum = 0; //Biến lưu trữ giá trị
// for (let i = 0; i < firstArray.length; i++) {
//     //Tích trữ / cộng dồn các phần tử
//     sum = sum + firstArray[i];
// }

console.log("sum = ", sum);
function totalElements(array) {
    let sum = 0; //Biến lưu trữ giá trị
    for (let i = 0; i < array.length; i++) {
        //Tích trữ / cộng dồn các phần tử
        sum = sum + array[i];
    }
    return sum;
}
//Sủ dụng hàm
console.log(totalElements(firstNumber));
console.log(totalElements(secondNumber));

//IIFE - Không có tên hàm nhưng được chạy luôn khi chương trình bắt đầu chạy
(function getHello() {
    console.log("Hello world");

})();


// Cần phải nắm cái này
// Function declaration
// + Cho phép khai báo lại hàm trùng tên, JS sẽ lấy hàm được khai báo sau
// + Có cơ chế hoisting (sử dụn trước khi khai báo)
// + Cần phải có từ khóa return để trả về giá trị cho hàm, nếu không có thì trả về undefined
// function function_name(tham_so_1, tham_so_2, ...) {
//     //Nơi xử lý logic nghiệp vụ và trả về kết quả
// }

// Tham số: giá trị truyền vào khi khai báo
// Đối số: giá trị được truyền vào khi hàm được gọi


// Xây dựng hàm tính tổng hai số nguyên
function total(firstNumber, secondNumber) {
    console.log("FirstNumber, SecondNumber: ", firstNumber, secondNumber);
    return firstNumber + secondNumber;
}

// Để hàm được thực thi thì bắt buộc hàm phải được gọi
console.log('Total 1: ', total(10, 20));
console.log('Total 2: ', total(100, 20));
console.log('Total 3: ', total(20, 240));
console.log('Total 4: ', total(107, 201));

