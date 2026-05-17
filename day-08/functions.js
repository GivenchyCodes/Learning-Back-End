// TASK 1: The three Styles of Writing Functions
// 1. Function Declaration
function getAreaDeclaration(width, length) {
  return width * length;
}

// 2. Function Expression
const getAreaExpression = function (width, length) {
  return width * length;
};

// 3. Arrow Function (with implicit return)
const getAreaArrow = (width, length) => width * length;

// Test of Task 1
console.log('TASK 1: The three Styles of Writing Functions');
console.log(getAreaDeclaration(5, 4)); // Output: 20
console.log(getAreaExpression(5, 4)); // Output: 20
console.log(getAreaArrow(5, 4)); // Output: 20

// TASK 2: Default Parameters
function greet(name, greeting = 'Hello') {
  return `${greeting}, ${name}!`;
}

// Test of Task 2
console.log('\n TASK 2: Default Parameters');
console.log(greet('Mr Melroy')); // Output: Hello, My Melroy! (uses default)
console.log(greet('Mr Adam', 'Goodbye')); // Output: Goodbye, Mr Adam! (overrides default)

// TASK 3: Rest Parameters (...any Number of args)
function sum(...numbers) {
  // try to reduces the array of arguments to a single cumulative total number.
  // the function will be of the arrow head
  return numbers.reduce((total, current) => total + current, null);
}

// Test  of Task 3
console.log('\n TASK 3: Rest Parameters ');
console.log(sum(1, 2, 3, 4)); // Output: 10
console.log(sum(10, 20)); // Output: 30
console.log(sum()); // Output: 0

// TASK 4: Demonstrating Hoisting
console.log('\n Demonstrating Hoisting');

// Calling a Function Declaration before it is defined works perfectly.
console.log(hoistedDeclaration()); // Output: "I am hoisted!"

function hoistedDeclaration() {
  return 'I am hoisted!';
}

/*
  EXPLANATION OF FUNCTION DECLARATION HOISTING:
  - JavaScript moves function declarations to the top of their scope during compilation.
  Also, notethat, this allows you to safely execute the function anywhere in that scope before its actual text block.
*/

// Try the same with a Function Expression:
try {
  console.log(unhoistedExpression());
} catch (error) {
  console.log(`Error caught: ${error.message}`);
  // Output: Error caught: Cannot access 'unhoistedExpression' before initialization
}

const unhoistedExpression = function () {
  return 'I am not hoisted!';
};

/*
  EXPLANATION OF FUNCTION EXPRESSION HOISTING:
  Variables declared with 'let' or 'const' are hoisted but placed in a "Temporal Dead Zone".
  They cannot be accessed prior to their physical declaration line. If 'var' was used instead,
  the variable would be hoisted as 'undefined', throwing a "TypeError: unhoistedExpression is not a function".
*/

// TASK 5: Higher-Order Functions
function repeat(fn, n) {
  for (let i = 0; i < n; i += 1) {
    fn();
  }
}

// Test Task 5
console.log('\n TASK 5: Higher-Order Functions');
repeat(() => console.log('Spark'), 3);
// Output:
// Spark
// Spark
// Spark
