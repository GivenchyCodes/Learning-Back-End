# Journal: map set weakmap weakset on JavaScript Collections & Memory Management

## 1. Key Collections Reference

### Map

- **What it is**: A collection of key-value pairs allowing any data type as a key.
- **Core Advantage**: Keeps insertion order; allows objects/functions as keys; provides instant `.size`.
- **Methods**: `.set(k, v)`, `.get(k)`, `.has(k)`, `.delete(k)`, `.clear()`

### Set

- **What it is**: A collection of unique values that automatically ignores duplicates.
- **Core Advantage**: Ultra-fast membership checks ($O(1)$ time complexity) compared to arrays ($O(N)$).
- **Methods**: `.add(v)`, `.has(v)`, `.delete(v)`, `.clear()`

### WeakMap & WeakSet

- **What it is**: Collections holding **weak references** to objects only.
- **Core Advantage**: Prevents memory leaks. Objects are automatically garbage-collected when no other references exist.
- **Limitations**: Not iterable; no `.size` property; no `.clear()` method.

---

## 2. Architectural Decision Matrix

| Choose...   | Instead of... | If you need...                                                               |
| :---------- | :------------ | :--------------------------------------------------------------------------- |
| **Map**     | Object        | Non-string keys, frequent additions/deletions, or instant item counting.     |
| **Set**     | Array         | Unique element enforcement and lightning-fast existence checks (`.has()`).   |
| **WeakMap** | Map           | Metadata cache attached to objects without blocking their memory cleanup.    |
| **WeakSet** | Set           | Tagging/branding object instances dynamically without creating memory leaks. |

---

## 3. Core Mechanics Code Snippets

### Object Keys: Map vs. Plain Object

```javascript
const keyObj = { id: 1 };

// Correct way (Map)
const myMap = new Map();
myMap.set(keyObj, 'Success'); // Key remains an object reference

// Incorrect way (Plain Object)
const obj = {};
obj[keyObj] = 'Overwritten'; // Key stringified to "[object Object]"
```

### Fast Set Operations

```javascript
// Union (Combine & deduplicate)
const union = (a, b) => [...new Set([...a, ...b])];

// Intersection (Find common items)
const intersection = (a, b) => {
  const setB = new Set(b);
  return a.filter((item) => setB.has(item));
};
```

### Custom Iterators & Generators

```javascript
// Making an object iterable via Symbol.iterator
const iterableObj = {
    data:,
    [Symbol.iterator]() {
        let i = 0;
        return {
            next: () => ({ value: this.data[i += 1], done: i > this.data.length })
        };
    }
};

// Generator Function syntax
function* countGenerator() {
    yield 1;
    yield 2;
}
```

---

## 4. Memory Management Rules

- **Reachable**: A value is kept in memory if it can be accessed through a live chain of variables.
- **Strong Reference**: Standard `Map` and `Set` elements remain reachable forever until explicitly deleted.
- **Weak Reference**: `WeakMap` keys and `WeakSet` values do not count as reachable, allowing automatic **Garbage Collection**.
- **WeakRef / FinalizationRegistry**: Advanced low-level tools used to read or monitor garbage collection. **Do not use for normal application state logic** because execution timing is unpredictable.
