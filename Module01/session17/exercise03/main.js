let btnOpen = document.querySelector('.btn-open');
let btnClose = document.querySelector('.btn-close');
let boxOverlay = document.querySelector('.box-overlay');

btnOpen.onclick = function () {
    boxOverlay.style.display = 'block';
};

btnClose.onclick = function () {
    boxOverlay.style.display = 'none';
};