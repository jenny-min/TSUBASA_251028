let text = document.querySelector('.text');
let btnHide = document.querySelector('.hide');
let btnShow = document.querySelector('.show');
//ẩn text bằng onclick vào button thì function bên dưới sé được thực hiện
//thêm style {display: none} cho p
btnHide.onclick = function () {
    text.style.display = 'none';
};
btnShow.onclick = function () {
    text.style.display = 'block';
};