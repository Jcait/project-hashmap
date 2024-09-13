class Hashmap {
  constructor() {
    this.bucket = new Array(16);
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % 16;
    }
    return hashCode;
  }
  set(key, value) {
    const pair = new node(key, value);
    const list = new LinkedList();
    let index = this.hash(key);

    if (!this.bucket[index]) {
      this.bucket[index] = list;
      list.append(pair);
    }
  }
  //   has(key) {
  //     for (i = 0; i < this.bucket.length; i++) {
  //       if (index < 0 || index >= buckets.length) {
  //         throw new Error("Trying to access index out of bound");
  //       } else if ((this.bucket[i] = key)) {
  //         return true;
  //       } else {
  //         return false;
  //       }
  //     }
  //   }
}
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }
  append(value) {
    const node = new Node(value);

    if (!this.head) {
      this.head = node;
    } else {
      let current = this.head;

      while (current.nextNode) {
        current = current.nextNode;
      }

      current.nextNode = node;
    }
  }

  prepend(value) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else {
      let cHead = this.head;
      this.head = node;
      this.head.nextNode = cHead;
    }
  }

  size() {
    let counter = 1;
    let current = this.head;
    while (current.nextNode) {
      current = current.nextNode;
      counter++;
    }
    return counter;
  }

  headd() {
    return this.head;
  }

  tail() {
    let current = this.head;
    while (current.nextNode) {
      current = current.nextNode;
    }
    return current;
  }
  at(index) {
    const indx = index;
    let currentIndex = 0;
    let current = this.head;

    while (indx != currentIndex) {
      current = current.nextNode;
      currentIndex++;
      console.log(currentIndex);
    }
    return current;
  }

  pop() {
    let current = this.head;
    while (current.nextNode) {
      if (!current.nextNode.nextNode) {
        current.nextNode = null;
      } else {
        current = current.nextNode;
      }
    }
  }

  contains(value) {
    let current = this.head;
    while (value != current.value) {
      current = current.nextNode;
      if (!current) {
        return "Value not found";
      }
    }
    return true;
  }
  find(value) {
    let current = this.head;
    let count = 0;
    while (value != current.value) {
      count++;
      current = current.nextNode;
      if (!current) {
        return null;
      }
    }

    return `"Index ${count} is ${value}`;
  }
  toString() {
    let current = this.head;
    let string = `( ${current.value} ) -> `;
    while (current.nextNode) {
      string += `( ${current.value} ) -> `;
      current = current.nextNode;
      if (!current.nextNode) {
        string += ` ${current.nextNode} `;
      }
    }
    return string;
  }
}
