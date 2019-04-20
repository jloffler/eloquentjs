/*
 * A List:
 * Create the following functions:
*/

// building a list is easier back to front
function arrayToList(array) {
  let list = null;
  for (let i = array.length - 1; i >= 0; i--) {
    list = {value: array[i], rest: list};
  }
  // console.log(list); // test
  return list;
}


function listToArray(list) {
  let array = [];
  for (let node = list; node; node = node.rest) {
    array.push(node.value);
    // console.log(array); // test
  }
  return array;
}


// prepend an element to a list
function prepend(element, list) {
  let newlist = {value: element, rest: list};
  return newlist;
}


// return value of the nth list node
// write this as a recursive function
function nth(list, num) {
  // console.log(list); // testing
  // console.log(num); // testing
  if (num === 0) {
    return list.value;
  } else if (list.rest) {
    return nth(list.rest, num - 1);
  } else {
    return undefined;
  }
}


console.log(arrayToList([10, 20]));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(listToArray(arrayToList([10, 20, 30])));
// → [10, 20, 30]
console.log(prepend(10, prepend(20, null)));
// → {value: 10, rest: {value: 20, rest: null}}
console.log(nth(arrayToList([10, 20, 30]), 1));
// → 20