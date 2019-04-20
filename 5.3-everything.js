/*
// using a loop
function every(array, test) {
  for (let i of array) {
    if (!test(i)) return false;
  }
  return true
}
*/

// using the array.some() method
function every(array, test) {
  // since we're using the some method: we need the test to test for
  // cases that fail the test
  if (array.some(notTest => !test(notTest))) {
    return false
  } else {
    return true
  }
}

/*
Solutions:
function every(array, predicate) {
  for (let element of array) {
    if (!predicate(element)) return false;
  }
  return true;
}

function every2(array, predicate) {
  return !array.some(element => !predicate(element));
}
*/

console.log(every([1, 3, 5], n => n < 10));
// → true
console.log(every([2, 4, 16], n => n < 10));
// → false
console.log(every([], n => n < 10));
// → true