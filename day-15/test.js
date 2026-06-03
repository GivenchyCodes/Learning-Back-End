// // // // // //STEP ONE
// // // // // // // A blocking loop: it holds the single thread for the whole time.
// // // // // // const end = Date.now() + 3000; // a point three seconds from now
// // // // // // while (Date.now() < end) {
// // // // // //   // do nothing, just spin until three seconds pass
// // // // // // }
// // // // // // console.log('Done waiting'); // nothing else could run during the wait

// // // // // //STEP TWO (close either step for either step to work)
// // // // // // Non-blocking: setTimeout schedules the function, then the code continues.
// // // // // setTimeout(() => {
// // // // //   console.log('This runs later');
// // // // // }, 3000);
// // // // // console.log('This runs first'); // the thread did not wait

// // // // //STEP THREE
// // // getPrice simulates a slow lookup, such as reading from a database.
// // // It does not return the price directly. Instead it accepts a callback:
// // // a function to run once the price is ready.
// // function getPrice(product, callback) {
// //   // setTimeout stands in for the slow work. After one second,
// //   // it runs the function we give it.
// //   setTimeout(() => {
// //     if (product === 'coffee') {
// //       // Node.js convention: the first argument is the error.
// //       // Pass null when there is no error. The result comes second.
// //       callback(null, 3);
// //     } else {
// //       // On failure, pass an Error as the first argument.
// //       callback(new Error('Unknown product'), null);
// //     }
// //   }, 1000);
// // }
// // // Call getPrice. The function we pass runs about one second later.
// // getPrice('coffee', (error, price) => {
// //   if (error) {
// //     console.log('Failed:', error.message);
// //     return;
// //   }
// //   console.log('Price:', price); // "Price: 3"
// // });

// // // This line runs immediately, before the price is ready.
// // console.log('Waiting for the price...');
// // // Output order:
// // // "Waiting for the price..."   (runs now)
// // // "Price: 3"                   (runs about one second later)

// // // //STEP FOUR
// // // // note this dosent work for asynchrounous, because its expected to be inside the callback so it could handle the flow of the data above. kindly check how step three handles it for asynchronus
// // // try {
// // //   setTimeout(() => {
// // //     throw new Error('boom'); // thrown later, after try/catch has finished
// // //   }, 100);
// // // } catch (error) {
// // //   // This never runs. By the time the error is thrown,
// // //   // the try/catch block has already ended.
// // //   console.log('caught:', error.message);
// // // }

// //STEP FIVE
// // Three small async steps, each defined with the error-first style.
// function getPrice(product, callback) {
//   setTimeout(() => callback(null, 3), 200);
// }
// function applyTax(price, callback) {
//   setTimeout(() => callback(null, price * 1.1), 200);
// }
// function formatPrice(amount, callback) {
//   setTimeout(() => callback(null, `$${amount.toFixed(2)}`), 200);
// }

// // Chaining them with callbacks forces deep nesting.
// getPrice('coffee', (error, price) => {
//   if (error) {
//     console.log(error.message);
//     return;
//   }
//   applyTax(price, (error2, taxed) => {
//     if (error2) {
//       console.log(error2.message);
//       return;
//     }
//     formatPrice(taxed, (error3, text) => {
//       if (error3) {
//         console.log(error3.message);
//         return;
//       }
//       console.log(text); // "$3.30"
//     });
//   });
// });

//STEP SIX
console.log('A'); // synchronous

setTimeout(() => console.log('B'), 0); // macrotask (timer)

Promise.resolve().then(() => console.log('C')); // microtask (promise)

process.nextTick(() => console.log('D')); // microtask (Node, runs before promises)

console.log('E'); // synchronous

// Output:
// A   synchronous code runs first, top to bottom
// E   still synchronous
// D   microtask: process.nextTick runs before promise callbacks in Node
// C   microtask: the promise callback
// B   macrotask: the timer callback runs last
