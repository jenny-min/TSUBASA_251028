//Bài 3: Tính diện tích hình vuông khi biết cạnh a.
// parseFloat() để nhập số thực
let a = parseFloat(prompt('Vui lòng nhập vào cạnh a:'));

let squareArea = a * a;

console.log('Diện tích hình vuông là: ' + squareArea + 'm2');

//Bài 4: Tính diện tích hình chữ nhật khi biết 02 cạnh a, b.
let b = parseFloat(prompt('Vui lòng nhập vào chiều dài b:'));
let c = parseFloat(prompt('Vui lòng nhập vào chiều rộng c:'));

let rectangleArea = b * c;
console.log('Diện tích hình chữ nhật là: ' + rectangleArea + 'm2');

//Bài 5: Tính diện tích tam giác vuông khi biết 02 cạnh kề a, b.
let d = parseFloat(prompt('Vui lòng nhập vào cạnh kề d:'));
let e = parseFloat(prompt('Vui lòng nhập vào cạnh kề e:'));

let triangleArea = (d + e) / 2;

console.log('Diện tích tam giác vuông là: ' + triangleArea + 'm2');

//Bài 6: Giải phương trình bậc 1 có dang ax + b = 0
let f = parseFloat(prompt('Nhập vào số f'));
let g = parseFloat(prompt('Nhập vào số g'));

if (f === 0) {
    if (g === 0) {
        console.log('Phương trình có vô số nghiệm');
    } else {
        console.log('Phương trình vô nghiệm');
    }
} else {
    let x = -b / a;
    console.log('Nghiệm của phương trình là: ' + x);
}

