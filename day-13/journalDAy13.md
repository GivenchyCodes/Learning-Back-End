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
