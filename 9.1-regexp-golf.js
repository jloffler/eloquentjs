// car and cat
verify(/ca[rt]/,
       ["my car", "bad cats"],
       ["camper", "high art"]);

// pop and prop
verify(/pr?op/,
       ["pop culture", "mad props"],
       ["plop", "prrrop"]);

// ferret, ferry, and ferrari
verify(/ferr[(et)|(y)|(ari)]/,
       ["ferret", "ferry", "ferrari"],
       ["ferrum", "transfer A"]);
// works but, given answer: /ferr(et|y|air)/

// Any word ending in ious
verify(/[a-z]*ious\b/i,
       ["how delicious", "spacious room"],
       ["ruinous", "consciousness"]);
// works but, given answer: /ious\b/

// A whitespace character followed by a period, comma, colon, or semicolon
verify(/\s[.,:;]/,
       ["bad punctuation ."],
       ["escape the period"]);

// A word longer than six letters
verify(/[a-z]{7,}/i,
       ["hottentottententen"],
       ["no", "hotten totten tenten"]);
// works but, given answer: /\w{7}/
// however; given answer will accept "123456_" as a word, but not capitals.

// A word without the letter e (or E)
verify(/\b[^\We]+\b/i,
       ["red platypus", "wobbling nest"],
       ["earth bed", "learning ape", "BEET"]);
// had trouble with this one, couldn't figure out needing \W without checking
// answer.

function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == "...") return;
  for (let str of yes) if (!regexp.test(str)) {
    console.log(`Failure to match '${str}'`);
  }
  for (let str of no) if (regexp.test(str)) {
    console.log(`Unexpected match for '${str}'`);
  }
}

/* Instructions
For each of the following items, write a regular expression to test whether any
of the given substrings occur in a string. The regular expression should match
only strings containing one of the substrings described. Do not worry about word
boundaries unless explicitly mentioned. When your expression works, see whether
you can make it any smaller.
*/