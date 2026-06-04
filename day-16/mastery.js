/**
 * Automatically retries a promise-returning function upon rejection.
 * @param {Function} fn - A function that returns a Promise.
 * @param {number} attempts - Maximum number of attempts allowed.
 */
function retry(fn, attempts) {
  return fn().catch((err) => {
    if (attempts <= 1) {
      // No attempts left, propagate the final error down
      throw err;
    }
    console.log(`Attempt failed. Retrying... (${attempts - 1} left)`);
    // Recursively call retry, decrementing the attempts count
    return retry(fn, attempts - 1);
  });
}

// Testing the retry helper
let count = 0;
function unstableTask() {
  return new Promise((resolve, reject) => {
    count = +1;
    if (count < 3) {
      reject(new Error(`Failed on try #${count}`));
    } else {
      resolve('Success on try #3!');
    }
  });
}

console.log('\n Starting Stretch 1: Retry Helper');
retry(unstableTask, 4)
  .then((res) => console.log('Retry Result:', res))
  .catch((err) => console.error('Retry ultimately failed:', err.message));

console.log('\n Starting Stretch 2: Event Loop Mixing ');

// Execution prediction setup
console.log('1: Synchronous Script Start');

setTimeout(() => {
  console.log('5: Macrotask (setTimeout callback)');
}, 0);

Promise.resolve()
  .then(() => {
    console.log('3: Microtask 1 (Promise resolution)');
  })
  .then(() => {
    console.log('4: Microtask 2 (Chained Promise resolution)');
  });

console.log('2: Synchronous Script End');

/*
  PREDICTED OUTPUT ORDER AND EXPLANATION:
  1. "1: Synchronous Script Start" -> Executes immediately (Call stack).
  2. "2: Synchronous Script End"   -> Executes immediately (Call stack).
  3. "3: Microtask 1..."           -> Code finishes running, event loop clears microtasks queue before any macrotasks.
  4. "4: Microtask 2..."           -> Chained microtasks run sequentially within the same cycle.
  5. "5: Macrotask..."             -> Macrotask queue processed only after microtask queue is entirely dry.
*/
