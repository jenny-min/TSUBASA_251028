let year = Number(prompt('Vui lòng nhập vào năm muốn kiểm tra: '));
if (year % 4 === 0 && year % 100 !== 0) {
    alert(`Năm ${year} là năm nhuận`);
} else {
    alert(`Năm ${year} không phải năm nhuận`);
}