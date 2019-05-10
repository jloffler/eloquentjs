/*
Imagine you have written a story and used single quotation marks throughout to
mark pieces of dialogue. Now you want to replace all the dialogue quotes with
double quotes, while keeping the single quotes used in contractions like aren’t.

Think of a pattern that distinguishes these two kinds of quote usage and craft a
call to the replace method that does the proper replacement.
*/

let text = "'I'm the cook,' he said, 'it's my job.'";

// my answer
console.log(text.replace(/^'|(\W)'|'(\W)|'$/g, "$1\"$2"));

// the following answer from the book is a little more elegant
console.log(text.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'));

// → "I'm the cook," he said, "it's my job."

/* hard mode
Colloquial language can appear in dialogue, this can result in apostrophes
at the start or end of a word, such as:
-goin' 'round the bend (going around...)
These apostrophes should appear in quoted dialogue only.
The above regexp fail and change these to double quotes.
*/

let text = "'I'm the cook,' he said, 'it's my job to be goin' 'round the bend'"

// ^' is still always changed to " because starting contracted words must be dialogue.
// '$ changed to " in all cases, see above
// \W' not always changed--must have a closing ' following
// 'W not always changed--must have an opening ' preceding
