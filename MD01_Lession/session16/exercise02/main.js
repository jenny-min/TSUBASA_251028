function findMin(arr) {
    var min = arr[0];

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
        }
    }

    return min;
}

const arr1 = [3, 5, 1, 8, -3, 7, 8];
let min1 = findMin(arr1);
console.log(`min của mảng arr1 là: ${min1}`);

const arr2 = [7, 12, 6, 9, 20, 56, 89];
let min2 = findMin(arr2);
console.log(`min của mảng arr2 là: ${min1}`);

const arr3 = [];
let min3 = findMin(arr3);
console.log(`min của mảng arr3 là: ${min3}`);

const arr4 = [0, 0, 0, 0, 0, 0];
let min4 = findMin(arr4);
console.log(`min của mảng arr4 là: ${min4}`);