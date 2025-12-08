// Cho người dùng nhập vào dãy số bất kỳ
let str = prompt('Vui lòng nhập dãy số bất kỳ:');
// Sử dụng split() để chuyển đổi kiểu dữ liệu từ string sang kiểu array
let arr = str.split('');
//Tiến hành đảo ngược các phần tử trong mảng
let arrReverse = arr.reverse('');

alert(arrReverse);