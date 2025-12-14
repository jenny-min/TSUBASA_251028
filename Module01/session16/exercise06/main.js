const array1 = [1, 2, 3, 4, 5, 6];//Tổng = 21
const array2 = [10, 20, 30, 40, 50];//Tổng = 150
const array3 = [1, 3, 5, 7, 9];//Tổng = 25

function calculateSum(array) {
    sum = 0;
    sum = array.reduce((total, current) => total + current, 0);
}

console.log("Tổng của array1 là: " + calculateSum(array1));
console.log("Tổng của array2 là: " + calculateSum(array2));
console.log("Tổng của array3 là: " + calculateSum(array3));
