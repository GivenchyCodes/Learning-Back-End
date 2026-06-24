// // CHALLENGE 1: Async Stream via Array Iteration (No Generators/Loops)
// // Helper function to create a time delay
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// // Define an array of tasks that return values after a delay
// const streamTasks = [
//   () => Promise.resolve('Loading...'),
//   () => delay(1000).then(() => 'Processing data...'),
//   () => delay(1000).then(() => 'Done!'),
// ];

// console.log(' Starting Async Array Iteration Stream ');

// // Use array reduction to sequentially resolve and process tasks without loops
// await streamTasks.reduce(async (previousPromise, currentTask) => {
//   await previousPromise;
//   const message = await currentTask();
//   console.log(message);
// }, Promise.resolve());

// // CHALLENGE 3: Go-Style Error Handling Helper (tryCatch)

// /**
//  * Wraps a promise to return a [error, data] array.
//  * @param {Promise} promise
//  * @returns {Promise<[any, any]>}
//  */
// async function tryCatch(promise) {
//   try {
//     const data = await promise;
//     return [null, data];
//   } catch (error) {
//     return [error, null];
//   }
// }

// // Mock API function that succeeds or fails based on the ID
// const fetchUserData = (userId) => {
//   return new Promise((resolve, reject) => {
//     if (userId === 42) {
//       resolve({ id: 42, name: 'Alice' });
//     } else {
//       reject(new Error('User not found'));
//     }
//   });
// };

// // CHALLENGE 2 & EXECUTION: Top-Level Await
// // Note: We are using 'await' directly at the root level of this module file.
// // Constraint: This blocks the execution of this entire module until completed.

// console.log('\n--- Starting Go-Style Error Handling Tests ---');

// // Test Case 1: Successful Promise Resolution
// const [err1, user1] = await tryCatch(fetchUserData(42));
// if (err1) {
//   console.error('Test 1 Failed:', err1.message);
// } else {
//   console.log('Test 1 Success:', user1.name); // Output: Alice
// }

// // Test Case 2: Failed Promise Rejection
// const [err2, user2] = await tryCatch(fetchUserData(99));
// if (err2) {
//   console.error('Test 2 Caught Expected Error:', err2.message); // Output: User not found
// } else {
//   console.log('Test 2 Success:', user2.name);
// }

// CHALLENGE 1: Async Stream via Array Iteration (No Generators/Loops)
// This is a header comment labeling the first programming challenge.

// Helper function to create a time delay
// This comment explains that the following line defines a utility function for pausing execution.

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
// Defines a function 'delay' taking milliseconds 'ms', returning a Promise that resolves after that duration using 'setTimeout'.

// Define an array of tasks that return values after a delay
// States that the upcoming variable is a collection of asynchronous operations.

const streamTasks = [
  // Declares a constant array named 'streamTasks' to hold a list of functions.

  () => Promise.resolve('Loading...'),
  // The first item is an arrow function that instantly returns a resolved Promise containing the string 'Loading...'.

  () => delay(1000).then(() => 'Processing data...'),
  // The second item is a function that waits 1000ms via 'delay', then returns 'Processing data...'.

  () => delay(1000).then(() => 'Done!'),
  // The third item is a function that waits another 1000ms via 'delay', then returns 'Done!'.
];
// Closes the 'streamTasks' array definition.

console.log(' Starting Async Array Iteration Stream ');
// Prints a decorative introductory message to the console log.

// Use array reduction to sequentially resolve and process tasks without loops
// Explains that '.reduce()' is being used here as a functional alternative to a 'for' or 'while' loop.

await streamTasks.reduce(async (previousPromise, currentTask) => {
  // Pauses execution for the entire reduction chain; '.reduce()' iterates through each task using an async accumulator function.

  await previousPromise;
  // Forces the current iteration to wait until the previous task's Promise has completely finished resolving.

  const message = await currentTask();
  // Executes the current task function, waits for its Promise to resolve, and stores the resulting string in 'message'.

  console.log(message);
  // Logs the resolved string message ('Loading...', 'Processing data...', or 'Done!') to the console.
}, Promise.resolve());
// Closes the reducer callback and passes an instantly resolved 'Promise.resolve()' as the initial starting value.

// CHALLENGE 3: Go-Style Error Handling Helper (tryCatch)
// Label comment for the error-handling utility challenge (mimicking Go language's multi-value returns).

/**
 * Wraps a promise to return a [error, data] array.
 * @param {Promise} promise
 * @returns {Promise<[any, any]>}
 */
// JSDoc documentation block describing the 'tryCatch' function's expected inputs and array return structure.

async function tryCatch(promise) {
  // Declares an asynchronous function named 'tryCatch' that accepts a single 'promise' object as an argument.

  try {
    // Opens a try block to attempt execution of the code that might fail or reject.

    const data = await promise;
    // Waits for the passed-in promise to successfully resolve and stores its result inside the 'data' variable.

    return [null, data];
    // Returns a tuple array where the first element (error) is 'null' and the second element is the successful 'data'.
  } catch (error) {
    // Opens a catch block to capture any error if the promise rejects.

    return [error, null];
    // Returns a tuple array where the first element is the caught 'error' object and the second element (data) is 'null'.
  }
  // Closes the catch block structure.
}
// Closes the 'tryCatch' function body.

// Mock API function that succeeds or fails based on the ID
// Explains that the next block simulates a database query or network request.

const fetchUserData = (userId) => {
  // Declares a constant function 'fetchUserData' that accepts a 'userId' parameter.

  return new Promise((resolve, reject) => {
    // Returns a new manually constructed Promise instance with 'resolve' and 'reject' triggers.

    if (userId === 42) {
      // Checks if the provided 'userId' is exactly equal to the number 42.

      resolve({ id: 42, name: 'Alice' });
      // If the ID matches 42, resolves the promise successfully by returning a user object for Alice.
    } else {
      // Executes this block if the 'userId' is anything other than 42.

      reject(new Error('User not found'));
      // Rejects the promise, throwing a standard JavaScript Error object with a "User not found" message.
    }
    // Closes the conditional if/else statement.
  });
  // Closes the Promise executor function body.
};
// Closes the 'fetchUserData' arrow function.

// CHALLENGE 2 & EXECUTION: Top-Level Await
// Explains that the execution code below runs at the module root level.

// Note: We are using 'await' directly at the root level of this module file.
// Explains the syntax approach used for execution.

// Constraint: This blocks the execution of this entire module until completed.
// A reminder that top-level await acts synchronously relative to importing modules.

console.log('\n Starting Go-Style Error Handling Tests ');
// Logs a section separator message to the console with a leading newline character.

// Test Case 1: Successful Promise Resolution
// Comment introducing the happy path test case where data is found.

const [err1, user1] = await tryCatch(fetchUserData(42));
// Calls 'fetchUserData(42)', wraps it in 'tryCatch', awaits the array result, and uses destructuring to assign 'err1' and 'user1'.

if (err1) {
  // Checks if an error was returned (if 'err1' is not null).

  console.error('Test 1 Failed:', err1.message);
  // Logs a failure message alongside the error details if the check surprisingly failed.
} else {
  // Executes if 'err1' is null, meaning the operation succeeded.

  console.log('Test 1 Success:', user1.name); // Output: Alice
  // Logs a success message along with Alice's name, confirming a successful resolution.
}
// Closes the first test case's conditional block.

// Test Case 2: Failed Promise Rejection
// Comment introducing the error path test case where data is missing.

const [err2, user2] = await tryCatch(fetchUserData(99));
// Calls 'fetchUserData(99)' to force a failure, awaits 'tryCatch', and destructured results into 'err2' and 'user2'.

if (err2) {
  // Checks if an error object exists (is not null).

  console.error('Test 2 Caught Expected Error:', err2.message); // Output: User not found
  // Logs the expected error message ("User not found") directly to the error console.
} else {
  // Executes only if the promise unexpectedly succeeded without an error.

  console.log('Test 2 Success:', user2.name);
  // Logs a success message if the test unexpectedly bypassed the failure route.
}
// Closes the second test case's conditional block.
