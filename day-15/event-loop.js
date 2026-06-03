//    TASK 4: Predictive Event Loop Timing Execution

//    PREDICTION & REASONING (Written before execution):

//    Expected Output Order:
//    1. "1. Synchronous execution thread active"
//    2. "3. Promise microtask resolved"
//    3. "2. SetTimeout macrotask executed"

//    Reasoning:
//    - Synchronous Log: Runs instantly because it hits the Call Stack directly.
//    - SetTimeout (0ms): Offloads its callback to the Runtime API, which immediately
//      pushes it to the Callback Queue (Macrotask). It must wait for the stack to empty.
//    - Promise.then(): Places its callback straight into the high-priority Microtask Queue.
//    - Prioritization: The Event Loop must completely drain the Microtask Queue before
//      it allows a single Macrotask from the Callback Queue to step onto the Call Stack.
//

// 1. Synchronous task execution
(() => {
  const type = 'Synchronous execution thread active';
  console.log(`1. ${type}`);
})();

// 2. Macrotask scheduling (Timer)
setTimeout(() => {
  const type = 'SetTimeout macrotask executed';
  console.log(`2. ${type}`);
}, 0);

// 3. Microtask scheduling (Promise resolution path)
Promise.resolve().then(() => {
  const type = 'Promise microtask resolved';
  console.log(`3. ${type}`);
});
