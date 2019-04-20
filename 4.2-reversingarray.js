/*
Arrays have a reverse method that changes the array by inverting the order in which its elements appear. For this exercise, write two functions, reverseArray and reverseArrayInPlace. The first, reverseArray, takes an array as argument and produces a new array that has the same elements in the inverse order. The second, reverseArrayInPlace, does what the reverse method does: it modifies the array given as argument by reversing its elements. Neither may use the standard reverse method.
*/

function reverseArray(input) {
  let array = [];
  for (let i = 0; i < input.length; i++) {
    array.unshift(input[i]); // carefull, shifting is removing, unshifting is adding
  }
  return array;
}


function reverseArrayInPlace(input) {
  for (let i = 0; i < Math.floor(input.length / 2); i++) {
    let end = input.length - i - 1;
    let y = input[end];
    input[end] = input[i];
    input[i] = y;
  }
}
  
console.log(reverseArray(["A", "B", "C"]));
// → ["C", "B", "A"];
let arrayValue = [1, 2, 3, 4, 5];
reverseArrayInPlace(arrayValue);
console.log(arrayValue);
// → [5, 4, 3, 2, 1]