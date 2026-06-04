/**
 * DAY 16: PROMISES EXERCISES
 * File: day-16/promises.js
 * Using C language comments
 */

// FIX: Prevent unused or unhandled testing rejections from crashing the script globally
process.on('unhandledRejection', (reason) => {
  // Swallows unhandled rejections from raw test instances safely
});

// TASK 1: Simulated File-Reading Function

/**
 * Simulates reading a file asynchronously using Promises.
 * @param {string} filename - The name of the file to read.
 * @returns {Promise<string>} Resolves with file content or rejects with an error.
 */
function readFilePromise(filename) {
  // Return a new Promise instance
  return new Promise((resolve, reject) => {
    // Simulate an asynchronous delay using setTimeout
    setTimeout(() => {
      if (!filename) {
        // If filename is missing or empty, transition promise to 'rejected' state
        reject(new Error('Read Error: Filename is missing.'));
      } else {
        // If filename exists, transition promise to 'fulfilled' state with dummy data
        resolve(
          `Content of ${filename}: {"user": "Givenchicodes", "role": "Admin"}`,
        );
      }
    }, 500); // 500ms delay
  });
}

// Simulated helper functions for the rest of the chain
function processDataPromise(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`${data} -> [Processed]`);
    }, 300);
  });
}

function saveDataPromise(data) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(`Success: Saved (${data})`);
    }, 300);
  });
}

// TASK 2 & 3: Chaining steps and .catch() handling

console.log('Starting Task 2 & 3: Promise Chain');

// We kick off the asynchronous operations sequentially
readFilePromise('config.json')
  .then((fileData) => {
    console.log('Step 1 Complete:', fileData);
    // Returning a promise here makes the next .then wait for its resolution
    return processDataPromise(fileData);
  })
  .then((processedData) => {
    console.log('Step 2 Complete:', processedData);
    return saveDataPromise(processedData);
  })
  .then((saveMessage) => {
    console.log('Step 3 Complete:', saveMessage);
  })
  // TASK 3: A single .catch handles errors from any previous step in the chain.
  .catch((error) => {
    console.error('Chain caught an error:', error.message);
  });

/*
  COMMENT COMPARING PROMISES TO CALLBACKS (TASK 2):
  --------------------------------------------------
  The callback version from Day 15 forced us into a deeply nested structure
  ("Callback Hell" or the "Pyramid of Doom") where each dependent step lived
  inside the success block of the previous step. Error handling had to be
  manually repeated at every single layer.

  This Promise version reads completely flat and top-to-bottom, like linear
  synchronous code. Instead of nesting code inward, we chain it downward
  using `.then()`. This vastly improves readability and maintainability.
*/

// Demonstration of Task 3 Error Propagation:
// If we pass an empty string, the chain immediately breaks at Step 1 and jumps directly to .catch
readFilePromise('')
  .then((data) => processDataPromise(data))
  .then((processed) => saveDataPromise(processed))
  .catch((error) => {
    console.log('\n Task 3 Verification');
    console.log(
      'Confirmed: Empty filename skipped later steps and hit catch ->',
      error.message,
    );
  });

// TASK 4: Promise Combinator Examples

// fake(dummy) promises to use for testing combinators
const fastResolve = new Promise((res) => {
  setTimeout(() => res('Fast Success'), 100);
});

const slowResolve = new Promise((res) => {
  setTimeout(() => res('Slow Success'), 400);
});

// FIXED: Added a direct internal catch to keep the raw promise instance safe from Node's strict exit code
const fastReject = new Promise((_, rej) => {
  setTimeout(() => rej(new Error('Fast Failure')), 200);
});
fastReject.catch(() => {});

const slowReject = new Promise((_, rej) => {
  setTimeout(() => rej(new Error('Slow Failure')), 500);
});
slowReject.catch(() => {});

setTimeout(() => {
  console.log('\n Starting Task 4: Combinators ');

  // 1. Promise.all
  Promise.all([fastResolve, slowResolve])
    .then((results) => console.log('Promise.all Success:', results))
    .catch((err) => console.log('Promise.all Failed:', err.message));

  Promise.all([fastResolve, fastReject, slowResolve])
    .then((results) => console.log('Promise.all Success:', results))
    .catch((err) =>
      console.log(
        'Promise.all Rejection Treatment (Catches first failure):',
        err.message,
      ),
    );

  // 2. Promise.allSettled
  Promise.allSettled([fastResolve, fastReject, slowResolve]).then((results) => {
    console.log(
      'Promise.allSettled Result (Contains both successes and failures):',
    );
    console.log(results);
  });

  // 3. Promise.race
  Promise.race([slowResolve, fastReject])
    .then((val) => console.log('Promise.race Won by value:', val))
    .catch((err) =>
      console.log(
        'Promise.race Rejection Treatment (Won by fastest rejection):',
        err.message,
      ),
    );

  // 4. Promise.any
  Promise.any([fastReject, slowResolve])
    .then((val) =>
      console.log(
        'Promise.any Result (Ignored fast reject, took slow success):',
        val,
      ),
    )
    .catch((err) => console.log('Promise.any Failed:', err.errors));
}, 1500);

// TASK 5: Promisify Utility

/**
 * Converts a standard Node.js callback-style function into a Promise-returning function.
 * @param {Function} fn - Function expecting (arg, callback) where callback is (err, data)
 * @returns {Function} A wrapper function that returns a Promise
 */
function promisify(fn) {
  return function (arg) {
    return new Promise((resolve, reject) => {
      fn(arg, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  };
}

// Test function: Callback-style function from Day 15
function legacyReadFileCallback(filename, callback) {
  setTimeout(() => {
    if (!filename) {
      callback(new Error('Callback Error: No file name provided'));
    } else {
      callback(null, `Legacy Data from ${filename}`);
    }
  }, 100);
}

// Convert legacy function using our helper
const modernReadFile = promisify(legacyReadFileCallback);

// Test the newly promisified function
setTimeout(() => {
  console.log('\n Starting Task 5: Promisify Test');

  modernReadFile('archive.txt')
    .then((data) => console.log('Promisify Success:', data))
    .catch((err) => console.error('Promisify Failure:', err.message));
}, 2500);
