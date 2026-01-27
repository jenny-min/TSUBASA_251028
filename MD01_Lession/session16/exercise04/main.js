// Viết một hàm isEven nhận vào một số và trả về true nếu số đó là số chẵn, ngược lại trả về false.

// Yêu cầu người dùng nhập vào 1 số nguyên bất kỳ bằng hàm prompt()
// Hiển thị kết quả bằng alert()
function isEven(number) {
    return number % 2 === 0;
}

let number = Number(prompt('Nhập vào số cần kiểm tra: '));
let result = isEven(number);
console.log('Kết quả là ' + result);
