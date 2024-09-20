class HashMap {
  constructor() {
    this.buckets = new Array(this.capacity);
    this.capacity = 16;
    this.filledBuckets = 0;
    this.loadfactor = 0.75;
  }
  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      hashCode = hashCode % this.capacity;
    }

    return hashCode;
  }

  checkSize() {
    if (this.filledBuckets >= this.capacity * this.loadfactor) {
      return true;
    } else {
      return false;
    }
  }

  growHash() {
    this.filledBuckets = 0;
    this.capacity *= 2;
    let list = [];
    this.buckets.forEach((entry) => {
      if (entry) {
        entry.arrEntryAdd(list);
      }
    });
    this.clear();
    list.forEach((data) => {
      let key = data[0];
      let value = data[1];
      this.set(key, value);
    });
  }

  set(key = "testKey", value = "testValue") {
    if (this.checkSize()) {
      this.growHash();
    }
    let index = this.hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = new LinkedList();
      this.buckets[index].append(key, value);
      this.filledBuckets++;
      console.log(`${index}, ${this.buckets[index].head.key}`);
    } else if (this.buckets[index]) {
      console.log("collider");
      this.buckets[index].add(key, value);
    } else {
      this.buckets[index].append(key, value);
    }
  }
  test() {
    return this.buckets;
  }

  get(key) {
    console.log(`Key Get ${key}`);
    let index = this.hash(key);
    console.log(index);
    if (this.buckets[index].head.key == key) {
      return this.buckets[index].head.value;
    } else if (
      this.buckets[index].head.key != key &&
      this.buckets[index].head.nextNode
    ) {
      return this.buckets[index].match(key);
    } else {
      return null;
    }
  }
  has(key) {
    let index = this.hash(key);
    if (this.buckets[index].head.key == key) {
      return true;
    } else if (
      this.buckets[index].head.key != key &&
      this.buckets[index].head.nextNode
    ) {
      if (this.buckets[index].match(key)) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
  remove(key) {
    let index = this.hash(key);
    if (!this.buckets[index]) {
      return false;
    } else if (this.buckets[index].head.key == key) {
      console.log("Head match");
      this.buckets[index] = this.buckets[index].head.nextNode;
      this.filledBuckets--;
    } else if (
      this.buckets[index].head.key != key &&
      this.buckets[index].head.nextNode
    ) {
      console.log("No head match");
      this.buckets[index].delMatch(key);
    }
  }
  length() {
    let count = 0;
    this.buckets.forEach((data) => {
      if (data) {
        count += data.size;
      }
    });
    return count;
  }
  clear() {
    this.buckets = new Array(this.capacity);
  }
  keys() {
    let list = [];
    this.buckets.forEach((key) => {
      if (key) {
        key.arrKeyAdd(list);
      }
    });
    return list;
  }
  values() {
    let list = [];
    this.buckets.forEach((value) => {
      if (value) {
        value.arrValueAdd(list);
      }
    });
    return list;
  }
  entries() {
    let list = [];
    this.buckets.forEach((entry) => {
      if (entry) {
        entry.arrEntryAdd(list);
      }
    });
    return list;
  }
}

// check if the current key match
// if not it has to iterate through the nodes untill it's found

class LinkedList {
  constructor(key, value) {
    this.head = null;
    this.size = 1;
  }
  append(key, value) {
    const node = new Node(key, value);

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
  add(keys, value) {
    let node = new Node(keys, value);
    let current = this.head;
    let changedKey = false;
    // console.log(`Key ${typeof keys}`);
    // console.log(`current ${typeof current.key}`);
    // console.log(current);

    // CHecks if the new key matches one in the bucket
    if (current.key !== keys) {
      console.log("No Match");
      if (current.nextNode) {
        console.log("NextNode");

        // Goes through the linked list if theres no surface level key
        while (current.nextNode) {
          current = current.nextNode;
          if (current.key == keys) {
            current.value = value;
            changedKey = true;
            console.log("changed key");
          } else if (!current.nextNode && !changedKey) {
            console.log("no changed key");
            current.nextNode = node;
            this.size++;
          }
        }
      } else {
        current.nextNode = node;
        this.size++;
      }
    } else {
      console.log("Match");
      current.value = value;
    }
  }
  match(key) {
    let current = this.head;
    console.log(current);
    while (current.value) {
      if (key == current.key) {
        console.log("Match FOund");
        return `value ${current.value};`;
      } else if (!current.nextNode) {
        return null;
      } else {
        console.log("Match Not Found");
        current = current.nextNode;
      }
    }
  }
  delMatch(key) {
    console.log("delMatch triggered");
    let prev = this.head;
    let current = prev.nextNode;
    while (prev.nextNode) {
      console.log(current);
      console.log(current.key);
      console.log(key);
      if (current.key == key) {
        console.log("Match");
        prev.nextNode = current.nextNode;
      } else if (current.nextNode.key == key && !current.nextNode.nextNode) {
        console.log("nextMode Match");
        current.nextNode = null;
      } else {
        return false;
      }
      prev = current;
      current = prev.nextNode;
    }
  }
  arrKeyAdd(arr) {
    let current = this.head;
    arr.push(current.key);
    while (current.nextNode) {
      current = current.nextNode;
      arr.push(current.key);
    }
  }
  arrValueAdd(arr) {
    let current = this.head;
    arr.push(current.value);
    while (current.nextNode) {
      current = current.nextNode;
      arr.push(current.value);
    }
  }

  arrEntryAdd(arr) {
    let current = this.head;
    let entryArr = new Array(current.key, current.value);
    arr.push(entryArr);
    while (current.nextNode) {
      current = current.nextNode;
      entryArr = new Array(current.key, current.value);
      arr.push(entryArr);
    }
  }
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}
const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
