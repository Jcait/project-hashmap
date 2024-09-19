class HashMap {
  constructor() {
    this.buckets = new Array(this.capacity);
    this.capacity = 16;
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

  set(key = "testKey", value = "testValue") {
    let index = this.hash(key);
    if (!this.buckets[index]) {
      this.buckets[index] = new LinkedList();
      this.buckets[index].append(key, value);
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
}
// check if the current key match
// if not it has to iterate through the nodes untill it's found

class LinkedList {
  constructor(key, value) {
    this.head = null;
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
          }
        }
      } else {
        current.nextNode = node;
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
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}
