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
