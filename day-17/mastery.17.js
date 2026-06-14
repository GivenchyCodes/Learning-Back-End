// CHALLENGE 1: Async Stream via Array Iteration (No Generators/Loops)
// Helper function to create a time delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Define an array of tasks that return values after a delay
const streamTasks = [
  () => Promise.resolve('Loading...'),
  () => delay(1000).then(() => 'Processing data...'),
  () => delay(1000).then(() => 'Done!'),
];

console.log(' Starting Async Array Iteration Stream ');

// Use array reduction to sequentially resolve and process tasks without loops
await streamTasks.reduce(async (previousPromise, currentTask) => {
  await previousPromise;
  const message = await currentTask();
  console.log(message);
}, Promise.resolve());

// CHALLENGE 3: Go-Style Error Handling Helper (tryCatch)

/**
 * Wraps a promise to return a [error, data] array.
 * @param {Promise} promise
 * @returns {Promise<[any, any]>}
 */
async function tryCatch(promise) {
  try {
    const data = await promise;
    return [null, data];
  } catch (error) {
    return [error, null];
  }
}

// Mock API function that succeeds or fails based on the ID
const fetchUserData = (userId) => {
  return new Promise((resolve, reject) => {
    if (userId === 42) {
      resolve({ id: 42, name: 'Alice' });
    } else {
      reject(new Error('User not found'));
    }
  });
};

// CHALLENGE 2 & EXECUTION: Top-Level Await
// Note: We are using 'await' directly at the root level of this module file.
// Constraint: This blocks the execution of this entire module until completed.

console.log('\n--- Starting Go-Style Error Handling Tests ---');

// Test Case 1: Successful Promise Resolution
const [err1, user1] = await tryCatch(fetchUserData(42));
if (err1) {
  console.error('Test 1 Failed:', err1.message);
} else {
  console.log('Test 1 Success:', user1.name); // Output: Alice
}

// Test Case 2: Failed Promise Rejection
const [err2, user2] = await tryCatch(fetchUserData(99));
if (err2) {
  console.error('Test 2 Caught Expected Error:', err2.message); // Output: User not found
} else {
  console.log('Test 2 Success:', user2.name);
}
