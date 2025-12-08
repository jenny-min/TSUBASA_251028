// Khai báo mảng số nguyên có sẵn (10–20 phần tử)
let arr = [3, 5, 7, 3, 9, 12, 3, 7, 15, 3, 20, 7];

// Nhập vào một số nguyên k để kiểm tra
let k = Number(prompt("Nhập vào số nguyên muốn kiểm tra:"));

// Đếm số lần xuất hiện của k
let count = 0;

for (let i = 0; i < arr.length; i++) {
    if (arr[i] === k) {
        count++;
    }
}

// Hiển thị kết quả
alert("Mảng: " + arr.join(", "));
alert("Số " + k + " xuất hiện " + count + " lần trong mảng.");
