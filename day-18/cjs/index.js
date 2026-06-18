console.log(
  '/n 1. Create a `day-18/cjs/` folder. Write a `utils.js` module that exports several small functions of your own using `module.exports`. In an `index.js` in the same folder, `require` them and use each one.',
);
// const { capitalize, double } = require('./utils');

// console.log(capitalize('GivenchiCodes file extension is cjs')); // Output: Hello cjs
// console.log(double(21)); // Output: 42

// Uses object destructuring to extract capitalize and double from the utils file
const { capitalize, double } = require('./utils');

// Calls capitalize, but the comment note has a mistake since it outputs 'GivenchiCodes file extension is cjs'
console.log(capitalize('givenchiCodes file extension is cjs')); // Output: GivenchiCodes file extension is cjs
// Calls double with 21, multiplying it by 2 to successfully output 42
console.log(double(21)); // Output: 42
