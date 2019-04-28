"use strict";

const box = {
  locked: true,
  unlock() { this.locked = false; },
  lock() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

function withBoxUnlocked(body) {
  // Your code here.
  let wasLocked;
  if (box.locked) {
    wasLocked = true;
    box.unlock();
  }
  try {
    body();
  } finally {
    if (wasLocked) box.lock();
    // now a rogue function can't leave the box unlocked
  }

}


/* Tests */
withBoxUnlocked(function() {
  box.content.push("gold piece");
});

try {
  withBoxUnlocked(function() {
    throw new Error("Pirates on the horizon! Abort!");
    /* note
    This function causes the box to be left in an unlocked state!
    */
  });
} catch (e) {
  console.log("Error raised:", e);
}
console.log("locked? " + box.locked);
// → true
withBoxUnlocked(f => console.log(box.content));
// → ['gold piece']

// test if box stays unlocked
box.unlock();
withBoxUnlocked(f => box.content.push("booty"));
console.log(box.content);
// -> ["gold piece", "booty"]


/* The Locked Box

Consider the following (rather contrived) object:

const box = {
  locked: true,
  unlock() { this.locked = false; },
  lock() { this.locked = true;  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  }
};

It is a box with a lock. There is an array in the box, but you can get at it
only when the box is unlocked. Directly accessing the private _content property
is forbidden.

Write a function called withBoxUnlocked that takes a function value as argument,
unlocks the box, runs the function, and then ensures that the box is locked
again before returning, regardless of whether the argument function returned
normally or threw an exception.

For extra points, make sure that if you call withBoxUnlocked when the box is
already unlocked, the box stays unlocked.
*/