/* eslint-disable */
// sonarjs:disable-next-line
// nosonar

// Tasks 2, 3, & 4: Rewriting with Class syntax, Subclassing, and Static methods
// Task 2: Rewrite Animal using class syntax
class Animal {
  constructor(name) {
    this.name = name; // Instance property
  }

  // Methods inside a class automatically get attached to Animal.prototype
  // Notice: No commas between class methods!
  speak() {
    return `Hello, my name is ${this.name}.`;
  }

  // Getter method for a formatted label
  get loudLabel() {
    return `ANIMAL: ${this.name.toUpperCase()}`;
  }

  // Task 4: Add a static method
  // Static methods are called on the class itself, not on instances.
  static fromObject(data) {
    // Takes a plain object like { name: "Leo" } and returns a new Animal instance
    return new Animal(data.name);
  }
}

// Confirming Task 2 behavior
const cat = new Animal('WorkShopCat');
console.log(cat.speak()); // Output: Hello, my name is WorkShopCat.
console.log(cat.loudLabel); // Output: ANIMAL: WORKSHOPCAT (no parentheses needed for getters)

// Task 3: Create a Dog class that extends Animal
class Dog extends Animal {
  constructor(name, breed) {
    // Pitfall Fix: Must call super() before using 'this' to let the parent set up
    super(name);
    this.breed = breed; // Subclass specific property
  }

  // Method exclusive to Dog instances
  bark() {
    return `${this.name} says Woof!`;
  }
}

// Verify Dog inheritance
const myDog = new Dog('Catcher', 'Road Wildler');
console.log(myDog.speak()); // Inherited method works: "Hello, my name is Catcher."
console.log(myDog.bark()); // Subclass method works: "Catcher says Woof!"

// Verify Task 4 Static Method
const builtFromObj = Animal.fromObject({ name: 'Marlo' });
console.log(builtFromObj.speak()); // Output: Hello, my name is Marlo.
