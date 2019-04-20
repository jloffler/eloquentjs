function dominantDirection(text) {
  let directions = countBy(text, char => {
    let direction = characterScript(char.codePointAt(0));
    return direction ? direction.direction : "none";
  }).filter(({name}) => name != "none");

  let dominant = directions.reduce((n, {count}) => n + count, 0);
  if (dominant == 0) return "No directions found";

}

console.log(dominantDirection("Hello!"));
// → ltr
console.log(dominantDirection("Hey, مساء الخير"));
// → rtl