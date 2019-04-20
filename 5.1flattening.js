let arrays = [[1, 2, 3], [4, 5], [6]];

console.log( arrays.reduce( (total, item) => (total.concat(item)), []) );

// → [1, 2, 3, 4, 5, 6]