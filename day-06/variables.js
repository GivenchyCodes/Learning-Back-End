// I use 'const' by default for values that will never be reassigned.
// I use 'let' only when i know the variable's value must change later.

// String: The value never changes, so i use const.
const greeting = 'Good-day, Human Resource!';

// Number: Age changes over time, so i use let.
let currentAge = 25;

// Boolean: The system state toggle, so i will use let.
let isLoggedIn = true;

// Null: It is an intentionally empty value with a placeholder that might change.
let databaseResult = null;

// Undefined: Automatically assigned by JS, but explicitly initialized here.
let userSelection = '';

// Arithmetic Program
const firstNumber = 12;
const secondNumber = 5;

const sum = firstNumber + secondNumber;
const difference = firstNumber - secondNumber;
const product = firstNumber * secondNumber;
const quotient = firstNumber / secondNumber;
const remainder = firstNumber % secondNumber;

console.log('Sum:', sum);
console.log('Difference:', difference);
console.log('Product:', product);
console.log('Quotient:', quotient);
console.log('Remainder:', remainder);

currentAge += 1;
isLoggedIn = false;
databaseResult = 'Data found';
userSelection = 'Option A';

console.log(greeting, currentAge, isLoggedIn, databaseResult, userSelection);
