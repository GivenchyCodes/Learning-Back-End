// // 1. Define the function using error-first callback pattern
// function getPrice(product, callback) {
//   // Simulating a 1-second asynchronous database lookup
//   setTimeout(() => {
//     if (Product === 'coffee') {
//       // Success: pass null for error, data as second argument
//       callback(null, 3);
//     } else {
//       // Failure: pass Error object first, null for data
//       callback(new Error('Unknown product'), null);
//     }
//   }, 1000); // Added the missing 1000ms delay
// // }

// // 2. Consume the function using error-first logic
// console.log('Waiting for the price...');

// getPrice('coffee', (error, price) => {
//   // Step 1: Check for the error first
//   if (error) {
//     console.error('Failed:', error.message);
//     return; // Exit early to prevent executing success logic
//   }

//   // Step 2: Handle success if no error exists
//   console.log('Price:', price);
//   console.log('Done');
// });

//USING  PROMISE STYLE TO FIX .THEN, .CATCH AND .FINNAL
// Refactored to return a Promise

function getPricePromise(product) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (product === 'coffee') {
        resolve(3); // Resolves the promise on success
      } else {
        reject(new Error('Unknown product')); // Rejects the promise on failure
      }
    }, 1000);
  });
}

// Consuming the Promise
console.log('Waiting for the price...');

getPricePromise('coffee')
  .then((price) => {
    console.log('Price:', price);
  })
  .catch((error) => {
    console.error('Failed:', error.message);
  })
  .finally(() => {
    console.log('Done');
  });

// The promise versions of the three steps.
function applyTax(price) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(price * 1.1), 200);
  });
}
function formatPrice(amount) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`$${amount.toFixed(2)}`), 200);
  });
}

// Each step returns a promise. The chain waits for each before the next.
getPrice('coffee')
  .then((price) => applyTax(price))
  .then((taxed) => formatPrice(taxed))
  .then((text) => console.log(text))
  .catch((error) => console.log(error.message)); // one place for any failure
