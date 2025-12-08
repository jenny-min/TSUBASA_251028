const numbers = [];

for (let i = 0; i < 10; i++) {
    numbers.push(Math.floor(Math.random() * 100));

    //Math.floor - làm tròn xuống
    //Math.random - số ngẫu nhiên, duy nhất
}

console.log(numbers);