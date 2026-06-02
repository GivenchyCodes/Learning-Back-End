function Animal(name) {
  this.name = name;
}
Animal.prototype.speak = function () {
  return `Hello, my name is ${this.name}.`;
};

const mouse = new Animal('Jerry');

// 1. Calling normally works perfectly
// The object left of the dot ('duck') becomes the execution context for 'this'.
console.log(mouse.speak()); // Output: Hello, my name is Jerry.

// 2. Losing 'this' context
// Assigning the method to a variable strips away the object reference.
const looseSpeak = mouse.speak;

try {
  // This fails (or prints undefined) because JavaScript evaluates this globally or as undefined in strict mode
  console.log(looseSpeak());
} catch (error) {
  console.log("Error caught: 'this' is lost!");
}

// FIX 1: Using .bind()
// Why it works: .bind() creates a brand new function wrapper and permanently
// locks its internal 'this' keyword to whatever object you pass in (duck).
const fixedWithBind = mouse.speak.bind(mouse);
console.log(fixedWithBind()); // Output: Hello, my name is Jerry.

// FIX 2: Using an inline Arrow Function
// Why it works: Arrow functions do not have their own 'this'. They look outward
// to the surrounding scope where they were written. Here, 'duck' is accessible in scope.
const fixedWithArrow = () => mouse.speak();
console.log(fixedWithArrow()); // Output: Hello, my name is Jerry.
