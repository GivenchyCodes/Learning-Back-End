// // // // const user = {
// // // //   name: 'Givenchi',
// // // //   age: 25,
// // // // };

// // // // const sayHi = function () {
// // // //   console.log('hello');
// // // // };
// // // // user.sayHi(); //hello

// // // // the second method Function Expression & Declaration (Dynamic "this")
// // // const user = {
// // //   name: 'Givens',
// // //   age: 25,
// // //   sayHi: function () {
// // //     console.log('hello');
// // //   },
// // // };

// //Also for the Dynamic 'This'
// //const user = {
// // name: "Givenchi',
// // age: 25,
// // sayHi: function() {
// // console.log(1Hello, my name is ${this.name}`); //this points to user
// // }
// // };
// //user.sayHi(); // Hello, my name is Givenchi

// // // using an arrow function by changing it to read properties from the object they live in
// // const user = {
// //   name: 'Emmah',
// //   age: 25,
// //   sayHi: function () {
// //     console.log(this.name);
// //   },
// // };
// // user.sayHi();

// //THe blue print (The Constructor Method)
// function User(name, age) {
//   this.name = name;
//   this.age = age;
//   this.sayHi = function () {
//     console.log(`Hello, my name is ${this.name}`);
//   };
// }

// // creating instances
// const user1 = new User('Givenchi', 25);
// const user2 = new User('Abraham', 25);

// user1.sayHi();
// user2.sayHi();

const user = { name: 'John' };
const admin = { name: 'Admin' };

function sayHi() {
  console.log(this.name);
}

// use the same function in two objects
user.f = sayHi;
admin.f = sayHi;

// these calls have different this
// "this" inside the function is the object "before the dot"
user.f(); // John  (this == user)
admin.f(); // Admin  (this == admin)

admin.f(); // Admin (dot or square brackets access the method – doesn't matter)
