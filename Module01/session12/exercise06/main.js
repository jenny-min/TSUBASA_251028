//Người dùng khi báo
let name = "";
let age = 0;
//Kiểm tra số nguyên
function isPrime(n) {
    if (n < 2) return false;
    for (let i = 2; i <= Math.sqrt(n); i++) {
        if (n % i === 0) return false;
    }
    return true;
}
//Hiển thị menu
function showMenu() {
    return prompt(
        `=== MENU ===
1: Nhập tên
2: Nhập tuổi
3: In tên và tuổi
4: In bảng cửu chương
5: Kiểm tra số chẵn hay lẻ
6: Tính tổng từ 1 đến N
7: In các số trong một dãy
8: Kiểm tra số nguyên tố
9: Đảo ngược chuỗi
10: Thoát
Nhập lựa chọn của bạn (1-10):`
    );
}
//dùng do while kết hợp switch case cho từng TH
let choice;
do {
    choice = showMenu();
    switch (choice) {
        //Nhập tên
        case "1":
            name = prompt("Nhập tên của bạn:");
            break;

        //Nhập tuổi
        case "2":
            age = parseInt(prompt("Nhập tuổi của bạn:"));
            if (isNaN(age) || age < 0) {
                alert("Vui lòng nhập số tuổi hợp lệ!");
                age = 0;
            }
            break;

        //In tên và tuổi
        case "3":
            alert(`Tên: ${name || "Chưa nhập"}\nTuổi: ${age || "Chưa nhập"}`);
            break;
        //In bảng cửu chương
        case "4":
            let number = parseInt(prompt("Nhập số để in bảng cửu chương:"));
            if (!isNaN(number)) {
                let table = "";
                for (let i = 1; i <= 10; i++) {
                    table += `${number} x ${i} = ${number * i}\n`;
                }
                alert(table);
            } else {
                alert("Vui lòng nhập số hợp lệ!");
            }
            break;
        //Kiểm tra số chẵn hay lẻ
        case "5":
            let n = parseInt(prompt("Nhập một số để kiểm tra chẵn/lẻ:"));
            if (!isNaN(n)) {
                alert(n % 2 === 0 ? `${n} là số chẵn` : `${n} là số lẻ`);
            } else {
                alert("Vui lòng nhập số hợp lệ!");
            }
            break;
        //Tính tổng từ 1 đến N
        case "6":
            let N = parseInt(prompt("Nhập N để tính tổng từ 1 đến N:"));
            if (!isNaN(N) && N > 0) {
                let sum = (N * (N + 1)) / 2; // công thức tổng
                alert(`Tổng từ 1 đến ${N} là ${sum}`);
            } else {
                alert("Vui lòng nhập số nguyên dương hợp lệ!");
            }
            break;

        //In các số trong một dãy
        case "7":
            let sequence = prompt("Nhập dãy số, cách nhau bằng dấu phẩy (,):");
            if (sequence) {
                let arr = sequence.split(",").map(Number);
                alert("Các số trong dãy là: " + arr.join(", "));
            } else {
                alert("Không có dữ liệu nhập!");
            }
            break;
        //Kiểm tra số nguyên tố
        case "8":
            let primeNum = parseInt(prompt("Nhập số để kiểm tra số nguyên tố:"));
            if (!isNaN(primeNum)) {
                alert(isPrime(primeNum) ? `${primeNum} là số nguyên tố` : `${primeNum} không phải số nguyên tố`);
            } else {
                alert("Vui lòng nhập số hợp lệ!");
            }
            break;
        //Đảo ngược chuỗi
        case "9":
            let str = prompt("Nhập chuỗi để đảo ngược:");
            if (str !== null) {
                let reversed = str.split("").reverse().join("");
                alert("Chuỗi đảo ngược: " + reversed);
            }
            break;
        //Thoát chương trình
        case "10":
            alert("Thoát chương trình. Tạm biệt!");
            break;
        default:
            alert("Vui lòng chọn từ 1 đến 10!");
    }
} while (choice !== "10");