//

// 1. The original callback-based function
function getPrice(product, callback) {
  setTimeout(() => {
    if (product === 'coffee') {
      callback(null, 3);
    } else {
      callback(new Error('Product not found'), null);
    }
  }, 1000); // 1 second delay
}

// 2. The corrected Promise wrapper function
function getPricePromise(product) {
  return new Promise((resolve, reject) => {
    getPrice(product, (error, price) => {
      if (error) {
        reject(error);
      } else {
        resolve(price);
      }
    });
  });
}

// 3. How to use it correctly
getPricePromise('coffee')
  .then((price) => {
    console.log('Price:', price); // Runs on success: "Price: 3"
  })
  .catch((error) => {
    console.log('Failed:', error.message); // Runs on failure
  })
  .finally(() => {
    console.log('Done'); // Runs either way
  });
