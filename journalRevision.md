## Revision on all task from 0 to 19

CHALLENGE 1: Day 17 Async Stream via Array Iteration (No Generators/Loops)
2: Day 16 — Promises
3: Day 6 — Variables, Data Types & Operators
4: Day 7 — Control Flow
5: Day 12 — Modern JavaScript Features
// Fix for the first loop (for...of)

```
itemPrices.forEach((price) => {
  console.log(`Price: ${price}`);
});

// Fix for the second loop (for...in)
Object.entries(itemManifest).forEach(([key, value]) => {
  console.log(`Key: ${key} -> Value: ${value}`);
});

forEach replaces `for...of`: It iterates over array values directly without creating heavyweight iterators.
Object.entries() replaces `for...in`: It converts object properties into a standard array of [key, value] pairs.

			    6: Day 13 Prototypes
//Creating an instance using the 'new' keyword (on the dog object)

// TASKS 2, 3, & 4: CLASSES & INHERITANCE

// Task 2: Animal Class Definition
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `Hello, my name is ${this.name}.`;
  }

  get loudLabel() {
    return `ANIMAL: ${this.name.toUpperCase()}`;
  }

  // Task 4: Static Factory Method
  static fromObject(data) { //Created a data-parsing factory method (`fromObject`) that converts plain JSON objects into structured class instances
    return new Animal(data.name);
  }
}

			    7: Day-14 JavaScript Error Handling
The implementation of robust error handling strategies in JavaScript, covering built-in error types, defensive parsing, custom error inheritance, type-based routing, and resource lifecycle management.

instanceof vs typeof
Use typeof for basic primitive data types and instanceof for structural objects or custom classes.


			    8: Day 18 CommonJS vs ES Modules

# 🧠 Self-Check & Quick Answers

### 1. In a CommonJS module, what happens to a variable you declare but do not put on `module.exports`?

It remains scoped completely private to that file and cannot be accessed by other files.

### 2. Why must an ES Module import include the `.js` file ending when `require` does not?

ES Modules are built to align with web standards. Browsers explicitly need exact file extensions/paths to fetch files correctly over the network, whereas Node's legacy `require` handles background lookups automatically.

### 3. A file is named `data.js` and the project's `package.json` has no `"type"` field?

It defaults to **CommonJS**.

### 4. When can a CommonJS file not `require` an ES Module, and why?

A CommonJS file cannot synchronously `require` an ES Module if that ES Module contains top-level `await` asynchronous patterns, or because ESM loads asynchronously by nature while `require` is fundamentally synchronous.

##In Conclusion
Today I reviewed JS basics like data types, control flow, and modern loop alternatives like forEach and Object.entries().I practiced async patterns using Promises and stream processing with array iteration instead of standard loops.I brushed up on OOP by building classes with constructors, getters, and static factory data-parsing methods.I tested my knowledge on robust error handling, type checking, and the core differences between CommonJS and ES Modules.

```
