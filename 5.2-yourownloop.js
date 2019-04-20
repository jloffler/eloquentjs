// (value, test(), update(), body())
// 1 run test function
// 2 then do body function
// 3 then update and repeat

// my solution: works
function loop(val, test, update, body) {
  let counter = val;
  while (test(counter)) {
    body(counter);
    counter = update(counter);
  }
}

// provided solution
function loop(start, test, update, body) {
  for (let value = start; test(value); value = update(value)) {
    body(value);
  }
}

loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1