// objects can hold other objects, so must call deepEqual recursively
// iterating an object is difficult. it's easier to iterate an array
// hint: remember the special way to iterate an array you used in the previous program?

/*
 * Notes: the solution from the book is much nicer. It just uses single if statements
 * If the individual statement fails it returns false. None of this confusing if else stuff
 * in my solution.
 */

function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true; // check this first, can't check it last.
    
  // check if both are objects
  if ((typeof obj1 == "object" && obj1 != null)&&(typeof obj2 == "object" && obj2 != null)) {
    
    let arr1 = Object.keys(obj1);
    let arr2 = Object.keys(obj2);
    
    // check same number of properties
    if (arr1.length != arr2.length) return false;
      
    for (let i of arr1) { // 'i' here, is the *value* at that spot in the array, not a reference number
      if (arr2.includes(i)) { //check they have the same property name
        if (deepEqual(obj1[i], obj2[i]) == false) return false;
      } else {
      return false;
      }
    }  
  } else {
    return false;
  }
  return true;
}


let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true


function deepEqualBookSoln(a, b) {
  if (a === b) return true;
  
  if (a == null || typeof a != "object" ||
      b == null || typeof b != "object") return false;

  let keysA = Object.keys(a), keysB = Object.keys(b);

  if (keysA.length != keysB.length) return false;

  for (let key of keysA) {
    console.log(a[key]);
    console.log(b[key]);
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }

  return true;
}