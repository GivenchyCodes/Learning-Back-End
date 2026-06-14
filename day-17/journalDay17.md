## Day 17: Async/Await Exercise

Today's practical guide and implementation demonstrating the transition from Promise chains `(.then()/.catch())` to modern asynchronous JavaScript using `async and await`.

## 📌 Project Overview

Today's day-17 lessons contains implementation examples for mastering asynchronous JavaScript control flow. It showcases how to write `flatter, cleaner, and more readable code using async/await syntax, manage errors effectively using standard native structures, and optimize script performance through concurrent execution models`.

## 🚀 Key Features

- `Linear Control Flow`: Flattened Promise-based file system pipelines without nesting.
- `Dual Error Paradigms`: Complete verification of internal scoped try/catch execution vs external unhandled rejection bubble hooks.
- `Performance Benchmarking`: Direct performance comparison measuring the wall-clock execution difference between sequential operations and concurrent operations (Promise.all).
- `Non-Blocking Delays`: Implementation of a reusable promise-driven utility function to pause execution environments.

## 🛠️ Code Structure & Tasks Covered

## Task 1: Promise Chain Architecture Migration

Converts a linear .then() pipeline into a sequential async/await flow inside a single execution wrapper (runFileLifecycle).

## Task 2: Robust Error Handling Paradigms

Demonstrates the two distinct ways to capture runtime execution errors from a rejected promise payload:

1.  Internal Capture: Snapping up errors within the module scope using a try/catch block.
2.  External Capture: Allowing the error to bubble out of the function context and trapping it externally via .catch().

## Task 3: Execution Benchmarking (Sequential vs Parallel)

Calculates and tracks real-time execution speeds using `Date.now()`.
Demonstrates why concurrently dispatching non-dependent events down to the underlying JavaScript Event Loop using Promise.all saves runtime execution time over stacking operations back-to-back.

`Sequential Mode` (~802ms total duration):
[Task 1 (400ms)] -------> [Task 2 (400ms)] (differeent timeline, so it add them together which makes it longer)

`Parallel Mode` (~401ms total duration):
[Task 1 (400ms)]
[Task 2 (400ms)] =======> Executed simultaneously (same timeline)

## Task 4: Aggregated Multi-File Reading

Orchestrates sequential multi-file ingestion routines that dynamically piece together text contents into a consolidated format using error-resilient wrappers.

## Task 5: Asynchronous Sleep Helper Method

Exposes a configurable thread-pause function wrapper using primitive execution limits.

```java
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
```

## Core Concepts Self-Check

Before wrapping up this module, The Answers for these questions:

- What does an async function always return?
  An async function always returns a Promise. If a primitive value is returned explicitly, JavaScript automatically wraps it inside a resolved promise container.
- How do you read a Promise's resolution value directly?
  By prepending the await keyword to the statement. This pauses the local async block execution until the promise finishes, unwrapping the inner payload.
- How are operational errors trapped when utilizing async/await syntax?
  By structural wrapper separation using standard language code control block syntax elements (try {} catch (error) {}).
- Why does synchronous code positioned after an async call execute before the async function completes?
  The await engine parameter only halts runtime operations inside the execution context of that specific function. The main thread immediately delegates the pending execution reference code chunk to the Event Loop, passing over the block to proceed downstream through the rest of the script without blocking performance threads.

### Key terms

- **`async`:** a keyword placed before a function; it makes the function always return a promise.
- **`await`:** a keyword used inside an `async` function; it pauses the function until a promise settles and returns the value.
- **Sequence:** running tasks one after another, where each starts only after the previous finishes.
- **Parallel:** running independent tasks at the same time, then waiting for them together.
- **Top-level `await`:** using `await` outside any function, at the top of a module file (covered on Day 18).
- **Async generator:** a function declared `async function*` that produces a series of values over time, read with `for await...of`.

## Question

1.  what is the best practice for using ("data" | "fetUserData) on function parameter ?
2.  Does "sleep" method trigger means the same for "setTimeout" ?
3.  using combined process, for sequential to convert to parallel, does it mean it changing Asyn back to Sync within the setInterval ?

## Conclusion

`NOTE` - After testing, i got parallel duration = 401ms and Sequential duration = 802 from my machine @ Benchmarking Task 3.
