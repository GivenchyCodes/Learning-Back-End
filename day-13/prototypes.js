// Define the Constructor Function
function Animal(name) {
  this.name = name; // instance property
}

// Add the method to the prototype
Animal.prototype.speak = function () {
  //Defining speak on Animal.prototype
  return `${this.name} makes a friendly sound.`;
};

//Creating an instance using the 'new' keyword (on the dog object)
const dog = new Animal('Sammy');

//call the speak method (prototype chain)
console.log(dog.speak());

//prove the method lives on the prototype, not the instance
const instanceHasit = dog.hasOwnProperty('speak'); // it is not on the target object
const prototypeHasit = Object.getPrototypeOf(dog).hasOwnProperty('speak'); //  it automaticall finds it here

console.log(`Thus the instance directly own 'speak'? ${instanceHasit}`); // it will return false

console.log(`Thus, Does the prototype own 'speak'? ${prototypeHasit}`); // it will return true

// Retrieve the prototype object of our instance
const proto = Object.getPrototypeOf(dog);
console.log(proto.hasOwnProperty('speak')); // true (the method lives here!)
console.log(proto === Animal.prototype); // true (confirms the link)
