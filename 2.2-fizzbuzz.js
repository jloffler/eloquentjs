/*
Write a program that uses console.log to print all the numbers from 1 to 100, with two exceptions. For numbers divisible by 3, print "Fizz" instead of the number, and for numbers divisible by 5 (and not 3), print "Buzz" instead.

When you have that working, modify your program to print "FizzBuzz" for numbers that are divisible by both 3 and 5 (and still print "Fizz" or "Buzz" for numbers divisible by only one of those).
*/

// simple solution

for (let x = 1; x <= 100; x += 1) {
  if ( (x%3==0) && (x%5==0) ) {
    console.log("FizzBuzz");
  } else if (x%3==0) {
    console.log("Fizz");
  } else if (x%5==0) {
    console.log("Buzz");
  } else {
    console.log(x);
  }
}

// elegant solution

for (let x = 1; x <= 100; x += 1) { // instead of "x += 1" just use "x++"
  let fizzle = ""  // i forgot to end this with ";"
  if (x%3==0) {fizzle += "Fizz";} // it looks like the "{}" curly braces are not needed for a 1 line if
  if (x%5==0) {fizzle += "Buzz";}
  console.log(fizzle || x);
}