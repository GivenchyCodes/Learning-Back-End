// Defines a function named capitalize that takes one input argument named string
function capitalize(string) {
  // Takes the first character, makes it uppercase, and joins it with the rest of the string
  return string.charAt(0).toUpperCase() + string.slice(1); // using concept of ladder
} // Closes the capitalize function block

// Defines a function named double that takes one input argument named num
function double(num) {
  // Multiplies the input number by two and returns the result
  return num * 2;
} // Closes the double function block

// Packages the functions into a Node.js module object so other files can use them
module.exports = {
  capitalize, // Includes the capitalize function in the exported module object
  double, // Includes the double function in the exported module object
}; // Closes the module exports object
