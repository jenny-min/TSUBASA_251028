let a = Number(prompt('Mời bạn nhập vào số a'));
let b = Number(prompt('Mời bạn nhập vào số b'));
let operate = prompt('Mời bạn nhập vào các phép tính (+, -, *, /)');

let result;

switch (operate) {
    case "+":
        result = a + b;
        break;
    case "-":
        result = a - b;
        break;
    case "*":
        result = a * b;
        break;
    case "/":
        result = a / b;
        break;
    default:
        result = "Phép tính không hợp lệ!";
}

alert(`Kết quả của phép tính trên: ${result}`);