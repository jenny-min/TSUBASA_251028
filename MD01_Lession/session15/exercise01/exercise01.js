//---Bài 1--- 
function bai1() {
    //Khai báo dãy rỗng
    let arr = [];

    //Nhập vào 10 số nguyên
    for (let i = 0; i < 10; i++) {
        let num = Number(prompt(`Nhập số nguyên thứ ${i + 1}:`));
        arr.push(num);
    }

    //Đếm số phần tử >=10
    let count = 0;

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] >= 10) {
            count++;
        }
    }
    //Hiển thị
    document.getElementById("output").innerText =
        "Mảng: " + arr.join(", ") + "\nCó " + count + " số >= 10.";
}

//---Bài 2---
function bai2() {
    let arr = [];
    for (let i = 0; i < 10; i++) arr.push(Number(prompt(`Nhập phần tử thứ ${i + 1}:`)));

    let max = arr[0];
    let index = 0;

    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            max = arr[i];
            index = i;
        }
    }

    document.getElementById("output").innerText =
        `Mảng: ${arr.join(", ")}\nMax = ${max} tại vị trí index = ${index}`;
}

//---Bài 3---
function bai3() {
    let arr = [];
    let n = Number(prompt("Nhập số lượng phần tử mảng:"));

    for (let i = 0; i < n; i++) arr.push(Number(prompt(`Nhập phần tử thứ ${i + 1}:`)));

    let max = Math.max(...arr);
    let tb = arr.reduce((a, b) => a + b, 0) / arr.length;

    document.getElementById("output").innerText =
        `Mảng: ${arr.join(", ")}\nMax = ${max}\nTrung bình = ${tb}`;
}

//---Bài 4---
function bai4() {
    let arr = [];
    let n = Number(prompt("Nhập số lượng phần tử mảng:"));

    for (let i = 0; i < n; i++) arr.push(Number(prompt(`Nhập phần tử thứ ${i + 1}:`)));

    arr.reverse();
    document.getElementById("output").innerText =
        "Mảng đảo ngược: " + arr.join(", ");
}

//---Bài 5---
function bai5() {
    let input = prompt("Nhập chuỗi số:");
    let arr = input.split(",").map(Number);
    let count = arr.filter(n => n < 0).length;
    document.getElementById("output").innerText =
        "Chuỗi: " + arr.join(", ") + "\nCó " + count + " số âm.";
}