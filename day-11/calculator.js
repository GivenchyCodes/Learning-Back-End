// Create a calculator
// importance: 5
// Create an object calculator with three methods:

// read() prompts for two values and saves them as object properties with names a and b respectively.
// sum() returns the sum of saved values.
// mul() multiplies saved values and returns the result.
// let calculator = {
//   // ... your code ...
// };

// calculator.read();
// console.log( calculator.sum() );
// console.log( calculator.mul() );
import PromptSync from 'prompt-sync';

const prompt = PromptSync();
const calculator = {
  sum() {
    return this.a + this.b; //as the reference so that 'this can work
  },

  mul() {
    return this.a * this.b; //as the reference so that 'this' can work
  },

  sub() {
    return this.a - this.b; // as the reference so that 'this' can work
  },

  div() {
    if (this.b === 0) {
      return 'cannot divide by zero';
    }
    return this.a / this.b;
  },

  read() {
    this.a = +prompt('input value for a?', 0); // NOTE: +prompt(0); == Number(prompt)
    this.b = +prompt('input value for b?', 0);
  },
};

calculator.read();
console.log('SUM ANSWER:', calculator.sum());
console.log('MUL ANSWER:', calculator.mul());
console.log('DIV ANSWER:', calculator.div());
console.log('SUB ANSWER:', calculator.sub());
