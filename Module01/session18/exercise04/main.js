const textarea = document.getElementById("text");
const keys = document.querySelectorAll(".key");

keys.forEach(key => {
    key.addEventListener("click", () => {
        if (key.classList.contains("delete")) {
            textarea.value = textarea.value.slice(0, -1);
        } else {
            textarea.value += key.innerText;
        }
    });
});