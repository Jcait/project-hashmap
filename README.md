# Project HashMap

This projects goal is to use the knowledge of hashmaps and implement our own

The full project specifications and assignments can be found [here](https://www.theodinproject.com/lessons/javascript-hashmap)

## Starting out

Having trouble visualising a bucket to start with, building off the LinkedList from last lesson and seeing where we'll go from there

```js
class Hashmap {
  constructor() {
    this.bucket = [];
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % 16;
    }
    return hashCode;
  }
  set(key, value) {
    const test = new Node(this.hash(key), value);

    this.bucket.push(test);
  }
}
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
}
```

## Hash and Set

Has was easier than set, visualising the bucket as an array made it easier. The set is there to ensure values aren't overwritten, next is to make sure the same hash but different key doesnt overwrite

```js
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
    const pair = new Node(key, value);
    let index = this.hash(key);

    if (!this.bucket[index]) {
      this.bucket[index] = pair;
    } else if ((pair.key = this.bucket[index].key)) {
      this.bucket[index].value = pair.value;
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
```

## Revamped the code afting sitting back and taking it on more slowly.

```js
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
```
