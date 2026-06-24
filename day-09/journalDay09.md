# Day 9 — Scope, Hoisting & Closures

Welcome to Day 9 of the JavaScript curriculum and architectural patterns demonstrating how the JavaScript engine handles variable lookups, runtime lifecycle states, and persistent execution contexts.

## 🚀 Learning Outcomes

- Differentiate between **Global**, **Function**, and **Block** scopes.
- Master variable lifecycles using `var`, `let`, and `const`.
- Trace JavaScript engine behavior during **Hoisting** and the **Temporal Dead Zone (TDZ)**.
- Design private data patterns using functional **Closures**.
- Understand code execution architecture via **Lexical Scoping** rules.

---

## 📂 Project Structure

text
day-09/
├── all-tasks.js # Master script containing all tasks, fixes, and stretch goals.
└── JournalDay09.md # Documentation and concept analysis.

## 🛠️ Code Implementations & Core Concepts

### 1. Scope Boundaries & Hoisting Mechanics

Variables assigned with `var` disregard conditional statement blocks and loop bodies, leaking out into the outer context. Variables bounded with `let` and `const` adhere to structural brackets (`{}`).

- **The Temporal Dead Zone (TDZ):** While `var` is hoisted and initialized as `undefined`, variables bound with `let` and `const` enter a protected state from the beginning of their scope execution until the exact line they are initialized. Accessing them prematurely yields a `ReferenceError`.

### 2. Encapsulation via Closures

A **closure** is created when an inner function maintains a live reference to variables defined within its outer lexical environment, even after that parent environment has executed and returned.

- **State Management:** The factory function `createCounter()` which binds an internal private variable `count`. This data can exclusively be interacted with via the returned object methods (`increment()`, `decrement()`), effectively establishing data privacy.

### 3. The Asynchronous Loop Context Bug

The legendary `setTimeout` loop bug is resolved.

- **The Root Cause:** Because `var` handles scope globally or at the function level, a loop overwrites a single slot in memory five times. The asynchronous payload within `setTimeout` evaluates only _after_ the synchronous execution thread has fully expired, thus displaying the finalized index boundary value (`5`).
- **The Resolution:** Implementing `let` enforces block scoping, dynamically creating an entirely separate, immutable lexical ring environment with its own unique value for each individual loop index step.

// I will continue with the mastery tasks tomorrow.
