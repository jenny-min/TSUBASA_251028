let boxes = document.querySelectorAll('.box');
boxes.forEach((el) => {
    el.onmouseover = function () {
        let bgColor = el.getAttribute('id');
        document.body.style.backgroundColor = bgColor;
    };
});