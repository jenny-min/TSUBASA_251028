// Tạo mảng có sẵn với các phần tử số
let numbers = [3, 5, 17, 28, 55, 98, 43, 6, 12, 34];

// Cho người dùng nhập vào một số bất kỳ
let userInput = Number(prompt("Nhập vào một số bất kỳ"));

let hasNumber = false;

//Tiến hành kiểm tra

for (let i = 0; i < numbers.length; i++) {
    if (numbers[i] === userInput) {
        hasNumber = true;
    }
}

// Số có trong mảng -->alert(bingo), không có trong mảng  --> (Chúc bạn may mắn lần sau)
if (hasNumber) {
    alert(`Bingo`);
} else {
    alert(`Chúc bạn may mắn lần sau`);
}