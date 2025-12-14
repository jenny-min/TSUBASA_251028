function processConfirm() {
    var answer = confirm("Shall we play a game?");
    var result;

    if (answer === true) {
        result = "Excellent. We'll play a nice game of chess.";
    } else {
        result = "Maybe later then.";
    }

    return result;
}

// Gọi hàm và hiển thị kết quả
var message = processConfirm();
alert(message);