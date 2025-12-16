function handleClick() {
    console.log("clicked...");
}

// Lấy ra phần tử btn-2
const btn_2 = document.getElementById("btn-2");

// Cách 2 bắt sự kiện arrow function
btn_2.onclick = () => {
    console.log("clicked 2");
};

// Lấy ra phần tử btn-3
const btn_3 = document.getElementById("btn-3");

document.addEventListener("click", function (event) {
    console.log("Click 3", event);
});


// Lấy ra phần tử input
const inputElement = document.getElementById("input");

inputElement.addEventListener("input", function (event) {
    console.log("input changed", event.target.value);

});