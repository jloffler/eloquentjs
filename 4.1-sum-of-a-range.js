/* 
 * This is the answer from the book, mine worked but was more verbose.
 * I accidentally overwrote it in the sandbox with this answer. Oops.
 * I've made notes where I've taken notes where this answer was much better.
 */

function range(start, end, step = start < end ? 1 : -1) {
  // ***note*** above: step when undefined will be given a value using the ternary operator.
  let array = [];

  if (step > 0) {
    for (let i = start; i <= end; i += step) array.push(i);
  } else {
    for (let i = start; i >= end; i += step) array.push(i);
  }
  return array;
}

function sum(array) {
  let total = 0;
  for (let value of array) {
    // ***note*** a special for loop that iterates the object it's given
    total += value;
  }
  return total;
}

console.log(range(1, 10))
// ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
console.log(range(5, 2, -1));
// ? [5, 4, 3, 2]
console.log(sum(range(1, 10)));
// ? 55