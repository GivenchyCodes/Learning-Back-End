## After watching the Philip Roberts event-loop video:

- call stack: this can be seen as LIFO to handle a thread running function
- Runtime ApIs: it has to do with synchronous and asynchrounous background taasks handled by Web APIs or Node.js
- the callback queue: this are FIFO threads waiting line of callbacks ready to run
- Event loop: this manages the flow of all these processes by pushing queues to empty stack
  All these mentioned above fit each other because they have their hierarchi scopes of workflow from "Microtask to Macrotask to Promise. so that sync code run immediately on the call stack, while async tasks are send to runtime APIs / when they finish, their callbacks enter the callback queue / then the event loop continuously checks the call stack and the moment it is empty, it pushes the next queued callback onto the stack to execute..

## JavaScript Asynchronous Execution & The Event Loop (Day 15)

## This repository contains study notes, code implementations, and runtime architectural diagrams detailing how JavaScript handles asynchronous execution despite being a single-threaded runtime environment.

## 🔑 Key Terms Reference

- Thread: A single sequence of steps a program follows, one after another.
- Single-threaded: Having one thread, so only one piece of code runs at a time.
- Synchronous: Code that runs in order, each step finishing before the next begins.
- Asynchronous: Code that starts a slow task, continues, and handles the result later.
- Blocking: Code that holds the single thread and stops anything else from running.
- Non-blocking: Code that starts a task and lets the thread continue.
- Call stack: The list of functions currently running; there is only one.
- Runtime API: A feature the surrounding system provides, such as a timer; called a Web API in the browser, and provided by the runtime in Node.js.
- Callback: A function passed to another function, to be run later when work is done.
- Error-first callback: The Node.js style where a callback receives the error first and the result second.
- Callback queue: The waiting line of callbacks that are ready to run.
- Event loop: The constant check that runs the next queued callback whenever the call stack is empty.
- Callback hell: Deeply nested callbacks that are hard to read and to maintain.
- setTimeout: Runs a function once after at least a given delay.
- setInterval: Runs a function repeatedly until you stop it with clearInterval.
- process.nextTick: A Node.js function that schedules a callback to run very soon, before the loop moves to timers.
- Macrotask: An ordinary queued task, such as a timer callback; one runs per loop turn.
- Microtask: A higher-priority task, such as a promise or process.nextTick callback; all run before the next macrotask.
- Promise: A placeholder for a value that arrives later.

---

## 🏗️ The Asynchronous Runtime Architecture

JavaScript handles multiple tasks concurrently by offloading slow, blocking tasks to system-level Runtime APIs.

+-------------------------------------------------------------+

| RUNTIME ENVIRONMENT |
| +-----------------------+ +-------------------------+ |
| | JAVASCRIPT ENGINE | | WEB / NODE APIs | |
| | | | | |
| | +-----------------+ | | [ timer ] [ network ]| |
| | | Call Stack | | | [ file ] [ crypto ] | |
| | +-----------------+ | +------------+------------+ |
| +-----------+-----------+ | |
| ^ v |
| | +------------------+ | |
| | | EVENT LOOP | | |
| | +--------^---------+ | |
| | | | |
| +-----------+--------------+---------------+------------+ |
| | QUEUES / TASKS | |
| | | |
| | Microtask Queue: [ nextTick ] -> [ Promises ] | |
| | Callback Queue: [ setTimeout ] -> [ DOM Events ] | |
| +-------------------------------------------------------+ |
+-------------------------------------------------------------+

## 💻 Code Exercises## day-15/callbacks.js

This file implements asynchronous simulations and models the structural shift into callback hell.

- Task 2: Simulated File Reader
- Simulates an asynchronous file read operation using the error-first style.

## COMMENT ON READING NESTED CODE:

Reading this code feels highly straining and mentally taxing.
The logic crawls horizontally across the screen forming a deeply indented pyramid.
Tracking variables across different scopes becomes tedious, and duplicating error-handling
logic (`if (err)`) at every single level makes the file messy and prone to bugs.

## day-15/event-loop.js

This file benchmarks priority ranking between runtime microtasks and macrotasks.

## PREDICTION & REASONING:

Expected Order: "Synchronous log" -> "Promise callback" -> "SetTimeout callback"

`Reasoning:`

- "Synchronous log" runs immediately via the Call Stack.
- setTimeout schedules a Macrotask to the Callback Queue.
- Promise schedules a Microtask to the high-priority Microtask Queue.
- The Event Loop drains the Microtask queue completely before processing any Macrotasks.

```java
console.log("Synchronous log");

setTimeout(() => {
console.log("SetTimeout callback");
}, 0);

Promise.resolve().then(() => {
console.log("Promise callback");
});

## Core Concept Self-Checks
## Quick Q&A
- Why does the line after a setTimeout run before its callback?
  setTimeout is non-blocking. It registers with the runtime system and pops off the stack immediately so the main thread can continue.
- What is callback hell, and what problems does it cause?
  It is deep functional nesting that ruins legibility, fragments lexical variable scopes, and forces error-handling duplication.
- In a Node error-first callback (error, result), why check error first?
  If an operation fails, the result argument is null or undefined. Accessing it directly will cause an application crash.
- Synchronous code, a microtask, and a macrotask are waiting. What order do they run?

1. Synchronous Code 2. Microtasks (Promises, process.nextTick) 3. Macrotasks (setTimeout, setInterval)
```
