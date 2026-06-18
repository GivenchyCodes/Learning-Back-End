import square, { PI } from './mixed-math.ejs';

console.log(
  ' n/ 3. Write a module that has both a default export and at least one named export. Import both into another file: the default without braces, the named one with braces.',
);
console.log(`PI is ${PI}`); // Output: PI is 3.14159
console.log(`Square of 4 is ${square(4)}`); // Output: Square of 4 is 16
