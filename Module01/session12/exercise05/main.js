let n = parseInt(prompt("Nhập một số nguyên dương:"));

if (isNaN(n) || n < 0) {
    alert("Vui lòng nhập một số nguyên dương hợp lệ!");
} else {
    let factorial = 1;
    for (let i = 1; i <= n; i++) {
        factorial *= i;
    }
    alert("Giai thừa của " + n + " là: " + factorial);
}

//Bài 4: In hình chữ nhật rỗng

let width = parseInt(prompt("Nhập chiều rộng:"));
let height = parseInt(prompt("Nhập chiều cao:"));

if (isNaN(width) || isNaN(height) || width <= 0 || height <= 0) {
    alert("Vui lòng nhập số nguyên dương hợp lệ!");
} else {
    let rectangle = "";

    for (let i = 1; i <= height; i++) {
        for (let j = 1; j <= width; j++) {
            // Vẽ viền: dòng đầu/dòng cuối hoặc cột đầu/cột cuối
            if (i === 1 || i === height || j === 1 || j === width) {
                rectangle += "*";
            } else {
                rectangle += " "; // bên trong rỗng
            }
        }
        rectangle += "\n"; // xuống dòng
    }

    console.log(rectangle);
    alert("Hình chữ nhật rỗng đã được in ra console.");
}