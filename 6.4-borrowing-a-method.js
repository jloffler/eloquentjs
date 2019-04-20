/*
 * Can you think of a way to call hasOwnProperty on an object that has its own
 * property by that name?
 */

// test object
let map = {one: true, two: true, hasOwnProperty: true};

// my fix
console.log(map.this.hasOwnProperty("one"));

// Fix this call
console.log(map.hasOwnProperty("one"));
// → true