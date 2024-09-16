class HashMap {
  constructor() {
    this.buckets = new Array(16);
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

  set(key = "testKey", value = "testValue") {
    if (!this.buckets[this.hash(key)]) {
      this.buckets[this.hash(key)] = new LinkedList();
      this.buckets[this.hash(key)].append(key, value);
    } else if (
      this.buckets[this.hash(key)] != key &&
      !this.buckets[this.hash(key)].nextNode
    ) {
      this.buckets[this.hash(key)].append(key, value);
    } else {
      return this.buckets[this.hash(key)];
    }
  }
}

class LinkedList {
  constructor(key, value) {
    this.head = null;
  }
  append(key, value) {
    let current = this.head;
    const node = new Node(key, value);
    if (!this.head) {
      this.head = node;
    } else {
      while (current.nextNode) {
        current = current.nextNode;
      }
      current.nextNode = node;
    }
  }
  match(key, value) {
    return this.head;
  }
}

class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.nextNode = null;
  }
}
