# Learning Journal: Day 16 — Promises

## Today's Reflection

Today, I moved away from the deep nesting of callback functions and learned how to structure cleaner asynchronous code using Promises. Promises make it much easier to write flat, highly readable code that reads sequentially from top to bottom.

---

## Key Takeaways

## Key terms

- `Thread:` a single sequence of steps a program follows, one after another.
- `Single-threaded:` having one thread, so only one piece of code runs at a time.
- `Synchronous:` code that runs in order, each step finishing before the next begins.
- `Asynchronous:` code that starts a slow task, continues, and handles the result later.
- `Blocking:` code that holds the single thread and stops anything else from running.
- `Non-blocking:` code that starts a task and lets the thread continue.
- `Call stack:` the list of functions currently running; there is only one.
- `Runtime API:` a feature the surrounding system provides, such as a timer; called a Web API in the browser, and provided by the runtime in Node.js.
- `Callback:` a function passed to another function, to be run later when work is done.
- `Error-first callback:` the Node.js style where a callback receives the error first and the result second.
- `Callback queue:` the waiting line of callbacks that are ready to run.
- `Event loop:` the constant check that runs the next queued callback whenever the call stack is empty.
- `Callback hell:` deeply nested callbacks that are hard to read and to maintain.
- `setTimeout:` runs a function once after at least a given delay.
- `setInterval:` runs a function repeatedly until you stop it with clearInterval.
- `process.nextTick:` a Node.js function that schedules a callback to run very soon, before the loop moves to timers.
- `Macrotask:`an ordinary queued task, such as a timer callback; one runs per loop turn.
- `Microtask:` a higher-priority task, such as a promise or process.nextTick callback; all run before the next macrotask.
- `Promise:` a placeholder for a value that arrives later (taught fully on Day 16).

### 1. Promise States

- **Pending:** The initial state where work is still running.
- **Fulfilled:** The work finished successfully and returned a value.
- **Rejected:** The work failed and threw an error.
- **Settled:** The final state (either Fulfilled or Rejected). Once settled, a promise never changes again.

### 2. Group Methods (Combinators) Summary

- **`Promise.all`**: All-or-nothing. Fails immediately if even one promise rejects.
- **`Promise.allSettled`**: Safe bet. Waits for all promises to finish and reports every outcome.
- **`Promise.race`**: Speed match. Takes the outcome of whichever promise completes fastest.
- **`Promise.any`**: First success. Returns the first fulfillment; fails only if every single promise fails.

---

## 🛠️ Code Snippet of the Day

This snippet shows how easy it is to chain multiple steps and handle all errors at the very end with a single catch block:

```javascript
readFilePromise('config.json')
  .then((fileData) => processDataPromise(fileData))
  .then((processedData) => saveDataPromise(processedData))
  .catch((error) =>
    console.error('An error occurred anywhere in the chain:', error.message),
  );
```

---

## Self-Check Answers

- **Fulfillment vs. Settled:** Fulfilled means success. Settled means finished (either `success` or `failure`).
- **Waiting Chains:** Returning a promise from a `.then()` handler tells the JavaScript engine to pause the next chain steps until that specific promise resolves.
- **Early Rejection:** If step 1 fails in a 5-step chain, steps 2 through 5 are completely skipped, and execution jumps straight to the closest `.catch()`.
- **Gathering All Network Results:** Use `Promise.allSettled` because it never stops early for failures and collects data from both successful and broken requests.
