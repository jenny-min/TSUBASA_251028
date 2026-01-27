//Trong phần này, chúng ta sẽ khai báo 3 biến đại diện cho điểm các môn học ở đây là 3 môn học là (math, physics, chemistry), thực hiện tính điểm trung bình 3 môn học trên và hiển thị lên màn hình
const math = Number(prompt("Hãy nhập điểm Toán:"));
const physics = Number(prompt("Hãy nhập điểm Vật lý:"));
const chemistry = Number(prompt("Hãy nhập điểm Hóa học:"));

console.log('Điểm trung bình 3 môn là: ' + ((math + physics + chemistry) / 3));
