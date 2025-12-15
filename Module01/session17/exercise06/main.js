const display = document.getElementById("display");

// Thêm ký tự vào màn hình
function append(value) {
    display.value += value;
}

// Xóa màn hình
function clearDisplay() {
    display.value = "";
}

// Tính toán kết quả
function calculate() {
    try {
        // Kiểm tra chia cho 0
        if (display.value.includes("/0")) {
            throw new Error("Không thể chia cho 0");
        }

        const result = eval(display.value);

        if (result === Infinity || isNaN(result)) {
            throw new Error("Biểu thức không hợp lệ");
        }

        display.value = result;
    } catch (error) {
        alert("Lỗi: " + error.message);
        display.value = "";
    }
}