let weight = parseFloat(prompt("Nhập cân nặng (kg): "));
let height = parseFloat(prompt("Nhập chiều cao (m): "));

let bmi = weight / (height * height);

if (bmi < 18.5) {
    alert('Bạn thuộc nhóm cân nặng thấp (gầy)');
} else if (18.5 <= bmi <= 24.9) {
    alert('Bạn thuộc nhóm cân nặng bình thường');
}
else if (bmi >= 25) {
    alert('Bạn thuộc nhóm thừa cân');
}
else if (25 <= bmi <= 29.9) {
    alert('Bạn thuộc nhóm tiền béo phì');
}
else if (30 <= bmi <= 34.9) {
    alert('Bạn thuộc nhóm Béo phì độ I');
}
else if (35 <= bmi <= 39.9) {
    alert('Bạn thuộc nhóm Béo phì độ II');
}
else if (bmi >= 40) {
    alert('Bạn thuộc nhóm Béo phì độ III');
}
else {
    alert('Dữ liệu nhập không hợp lệ, vui lòng nhập lại');
}
