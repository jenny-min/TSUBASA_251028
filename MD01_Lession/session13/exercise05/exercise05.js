// Khai báo mảng số nguyên 10 đến 20 phần tử ngẫu nhiên
let arr = [];
let size = Math.floor(Math.random() * 11) + 10;//size 10-20 số nguyên ngẫu nhiên

for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * 100)); //số ngẫu nhiên từ 0 đến 99
}

// Tính tổng các số lẻ và hiển thị ra màn hình bằng alert()
let sumOdd = 0;
let sumEven = 0;
for (let num of arr) {
    if (num % 2 === 0) {
        sumEven = sumEven + num;
    } else {
        sumOdd = sumOdd + num;
    }
}

alert("Mảng: " + arr.join(", "));
alert("Tổng các số lẻ: " + sumOdd);
alert("Tổng các số chẵn: " + sumEven);