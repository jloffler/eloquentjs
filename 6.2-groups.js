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
    /*
     *!!! you have to remember that it doesn't iterate the index. it iterates each actual value stored.
    for (let i of value) {
      // newGroup.add(value[i]);
    }
    */
    // changed i (index) to val
    for (let val of value) {
      newGroup.add(val);
    }
    return newGroup;
  }
}
