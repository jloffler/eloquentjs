class Group {
  constructor() {
    this.members = [];
  }

  add(value) {
    if (!this.members.includes(value)) this.members.push(value);
  }

  delete(value) {
    let i = this.members.indexOf(value);
    if (i > -1) this.members.splice(i, 1);
  }

  has(value) {
    return this.members.includes(value);
  }

  static from(value) {
    let newGroup = new Group;
    for (let val of value) {
      newGroup.add(val);
    }
    return newGroup;
  }

  [Symbol.iterator] = function() {
    return new GroupIterator(this)
  }
}

// I had trouble with this. Should probably try again after learning more JS
// The following is mostly copied from the answer.
class GroupIterator {
  constructor(group) {
    this.position = 0;
    this.group = group;
  }

  next() {
    if (this.position >= this.group.members.length) {
      return {done: true};
    } else {
      let result = {value: this.group.members[this.position],
                   done: false};
      this.position++
      return result
    }
  }
}