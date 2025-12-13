//parseInt() chuyển sang số nguyên
//Bài 1: Nhập 2 số a và b, kiểm tra a có chia hết cho b không, có thì thông báo qua console hoặc alert
let a = parseInt(prompt('Vui lòng nhập số a:'));
let b = parseInt(prompt('Vui lòng nhập số b:'));

if (b === 0) {
    console.log('Không thể chia cho 0');

} else if (a % b === 0) {
    console.log('a chia hết cho b');

} else {
    console.log('a không chia hết cho b');

}

//Bài 2: Nhập tuổi và in ra kết quả nếu tuổi học sinh đó không đủ điều kiện vào học lớp 10 
let age = parseInt(prompt('Vui lòng nhập tuổi của học sinh:'));

if (age < 15) {
    console.log('Học sinh không đủ điều kiện vào lớp 10');
} else {
    console.log('Học sinh đủ điều kiện vào lớp 10');
}

//Bài 3: Nhập một số nguyên bất kỳ và in kết quả ra màn hình để nói cho người dùng biết số đó là lớn hay nhỏ hơn 0
let number = parseInt(prompt('Vui lòng nhập vào số bất kỳ:'));

if (number < 0) {
    console.log('Số nhập vào nhỏ hơn 0');
} else if (number > 0) {
    console.log('Số nhập vào lớn hơn 0');
} else {
    console.log('Số nhập vào bằng 0');
}

//Bài 4: Nhập 3 số nguyên và tìm giá trị lớn nhất của ba số nguyên đó
let c = parseInt(prompt('Vui lòng nhập số thứ nhất:'));
let d = parseInt(prompt('Vui lòng nhập số thứ hai:'));
let e = parseInt(prompt('Vui lòng nhập số thứ ba:'));

let max = c;

if (d > max) {
    max = d
}

if (e > max) {
    max = e
}

console.log('Giá trị lớn nhất của ba số là ' + max);





