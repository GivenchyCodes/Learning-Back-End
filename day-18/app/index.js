// using Day 13 error handling task to try and catch
import { subtract } from './calculator.ejs';

console.log(
  " n/ 5. Take one earlier day's exercise that kept everything in a single file, and split it into several modules, each with one clear responsibility. Wire them together from an `index.js`.",
);
try {
  console.log(`Result: ${subtract(50, 18)}`); // Output: Result: 32
} catch (error) {
  console.error(error.message);
}
