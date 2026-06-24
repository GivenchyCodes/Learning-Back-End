## Day 13 Prototypes

```js
`Task 1`;
// Define the Constructor Function

// Add the method to the prototype

//Creating an instance using the 'new' keyword (on the dog object)

//call the speak method (prototype chain)
console.log(dog.speak());

//prove the method lives on the prototype, not the instance
const instanceHasit = dog.hasOwnProperty('speak'); // it is not on the target object
const prototypeHasit = Object.getPrototypeOf(dog).hasOwnProperty('speak'); //  it automaticall finds it here

console.log(`Thus the instance directly own 'speak'? ${instanceHasit}`); // it will return false

console.log(`Thus, Does the prototype own 'speak'? ${prototypeHasit}`); // it will return true
```

sir, Because of time, i could only do task 1.

** Continue from yesterdays tasks **

# Journal: Object-Oriented JavaScript & Web Components

## Task 1: Managing 'this' Context

- **Problem**: Execution context is stripped when a method is assigned to a variable, causing `this` to become undefined.
- **Fix 1**: Use `.bind(object)` to permanently lock the context to the target instance.
- **Fix 2**: Wrap the call in an arrow function to lexically inherit `this` from the outer scope.

## Task 2: Class Syntax Conversion

- **Action**: Converted factory/prototype patterns into clean ES6 `class` definitions.
- **Key Concept**: Methods inside the class body automatically attach to `Class.prototype` without needing comma separators.
- **Feature**: Integrated native getter properties (`get loudLabel`) to compute formatted values dynamically without invocation parentheses.

## Task 3: Subclassing & Inheritance

- **Action**: Created a `Dog` class that inherits properties and methods from `Animal` using the `extends` keyword.
- **Pitfall**: Attempting to reference `this` before invocation of `super()` crashes the runtime.
- **Fix**: Always call `super(arguments)` first inside the constructor to instantiate the parent context.

## Task 4: Factory Creation with Static Methods

- **Action**: Implemented utility methods directly on the class constructor rather than its instances using the `static` keyword.
- **Use Case**: Created a data-parsing factory method (`fromObject`) that converts plain JSON objects into structured class instances.

---

## Complete Verified JavaScript Implementation

```javascript // i had to use the ignore for mulitple classes being flagged by my IDE setup.
/* eslint-disable */
// sonarjs:disable-next-line
// nosonar

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
  static fromObject(data) {
    return new Animal(data.name);
  }
}

// Confirming Task 2 behavior
const cat = new Animal('WorkShopCat');
console.log(cat.speak()); // Output: Hello, my name is WorkShopCat.
console.log(cat.loudLabel); // Output: ANIMAL: WORKSHOPCAT

// Task 3: Subclassing with Dog
class Dog extends Animal {
  constructor(name, breed) {
    super(name); // Pitfall Fix: Must call super() before using 'this'
    this.breed = breed;
  }

  bark() {
    return `${this.name} says Woof!`;
  }
}

// Verify Dog inheritance
const myDog = new Dog('Catcher', 'Road Wildler');
console.log(myDog.speak()); // Output: Hello, my name is Catcher.
console.log(myDog.bark()); // Output: Catcher says Woof!

// Verify Task 4 Static Method
const builtFromObj = Animal.fromObject({ name: 'Marlo' });
console.log(builtFromObj.speak()); // Output: Hello, my name is Marlo.

// TASK 1: PROTOTYPES & 'THIS' CONTEXT

function LegacyAnimal(name) {
  this.name = name;
}
LegacyAnimal.prototype.speak = function () {
  return `Hello, my name is ${this.name}.`;
};

const mouse = new LegacyAnimal('Jerry');

// 1. Standard Method Invocation
console.log(mouse.speak()); // Output: Hello, my name is Jerry.

// 2. Context Loss Pitfall
const looseSpeak = mouse.speak;
try {
  console.log(looseSpeak());
} catch (error) {
  console.log("Error caught: 'this' context is lost!");
}

// FIX 1: Explicit Binding
const fixedWithBind = mouse.speak.bind(mouse);
console.log(fixedWithBind()); // Output: Hello, my name is Jerry.

// FIX 2: Lexical Arrow Function Wrapper
const fixedWithArrow = () => mouse.speak();
console.log(fixedWithArrow()); // Output: Hello, my name is Jerry.
```

## Key terms

- Prototype: the hidden object an object falls back to when a property is missing.
- Prototype chain: the series of prototype links JavaScript follows during a property search, ending at null.
- Object.getPrototypeOf(): the standard function that returns an object's prototype.
  **proto**: an older getter and setter for the prototype link; recognise it, prefer Object.getPrototypeOf().
- Constructor function: a function written to build objects, called with new, named with a capital letter.
- new: a keyword that creates an object, links its prototype, runs the function with this as that object, and returns it.
- Instance: one object made from a class or constructor function.
  Class: a shorter syntax for setting up a constructor and a shared prototype.
- Method: a function attached to an object.
  Getter: a method you read like a property, with no parentheses.
  Setter: a method that runs when you assign to a property name.
  Static method: a method that belongs to the class itself, not to instances.
  Inheritance: building one class on top of another to reuse its behaviour.
  extends: the keyword that makes one class a subclass of another.
  Subclass / parent class: the new class, and the class it builds on.
  super: calls the parent constructor, or a parent method, from a subclass.
  this: a keyword pointing to an object, decided by how a function is called.
  Callback: a function passed to another function to be run later.
  Private field: a property whose name starts with #, reachable only inside its class.
