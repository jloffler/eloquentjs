/*
Write an expression that matches only JavaScript-style numbers. It must support
an optional minus or plus sign in front of the number, the decimal dot, and
exponent notation—5e-3 or 1E10—again with an optional sign in front of the
exponent. Also note that it is not necessary for there to be digits in front of
or after the dot, but the number cannot be a dot alone. That is, .5 and 5. are
valid JavaScript numbers, but a lone dot isn’t.
*/

/* notes and cases
\+\d
-\d

digits and dot but not just dot
\d*(\d\.?|\.?\d)\d*    // can this be shortened?
\d+\.?\d*|\.\d+    // if start digit, can have dot or not. if start dot, must have digit follow

\d+
\d\.
\.\d
\d\.\d

exponents
\d+[eE][+\-]?\d+

\d[eE]\d
\d\[eE]\+\d
\d-[eE]-\d

preceding + or -
^[+\-]?    (all of the above with preceding \+ or -)

not a case
\.
*/

// My answer
let number = /^[+\-]?(\d+\.?\d*|\.\d+)([eE][+\-]?\d+)?$/;

/* mine works but the provided solution has one change
/^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/;
            ^     ^
            brackets
I guess in my regex if there is no period it looks like \d+\d* which is silly.
Could this cause problems? Like trying to match over and over for long
numbers?
*/


// Tests:
for (let str of ["1", "-1", "+15", "1.55", ".5", "5.",
                 "1.3e2", "1E-4", "1e+12"]) {
  if (!number.test(str)) {
    console.log(`Failed to match '${str}'`);
  }
}
for (let str of ["1a", "+-1", "1.2.3", "1+1", "1e4.5",
                 ".5.", "1f5", "."]) {
  if (number.test(str)) {
    console.log(`Incorrectly accepted '${str}'`);
  }
}