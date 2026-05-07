# Phase: JavaScript Fundamentals (Days 6–22)

This directory contains progress, exercises, and notes for the **JavaScript Fundamentals** phase. The goal of this phase is to build a deep, unshakeable understanding of how the JavaScript engine thinks about scope, types, memory, and asynchronous execution before moving on to framework or server-side development.

---

## 📅 Phase Syllabus Overview

| Day(s)        | Topic                                 | Core Focus                                                          | Status         |
| :------------ | :------------------------------------ | :------------------------------------------------------------------ | :------------- |
| **Day 6**     | **Variables, Data Types & Operators** | Memory declaration, primitive types, coercion, and strict equality. | 🔄 In Progress |
| **Days 7–21** | _Upcoming Modules_                    | Scope, Closures, `this`, Prototypes, Async JS, Promises, etc.       | ⏳ Pending     |
| **Day 22**    | _Phase Capstone_                      | Comprehensive CLI Application.                                      | ⏳ Pending     |

---

## 🚀 Day 6 — Variables, Data Types & Operators

Every program works with data. Today covers the core building blocks: how JavaScript stores, types, and manipulates data in memory.

### 🎯 Learning Outcomes

- Declare variables using `const` and `let` (and understand why `var` is avoided).
- Identify and isolate all primitive types (`string`, `number`, `bigint`, `boolean`, `undefined`, `null`, `symbol`).
- Utilize arithmetic, comparison, logical, and assignment operators.
- Master implicit type coercion and the absolute necessity of strict equality (`===`) over loose equality (`==`).

### 📚 Curated Resources

- [JavaScript.info — Variables](https://javascript.info)
- [JavaScript.info — Data Types](https://javascript.info)
- [JavaScript.info — Operators](https://javascript.info)
- [JavaScript.info — Comparisons](https://javascript.info)
- [MDN — JavaScript Data Types and Data Structures](https://mozilla.org)

---

## 🛠️ Practical Tasks & Deliverables

### [ ] Task 1: Primitive Declarations

- **File:** `day-06/variables.js`
- **Requirement:** Declare distinct variables for every JavaScript primitive type using `const` and `let`. Include documentation comments highlighting initialization boundaries (`const` vs `let`).

### [ ] Task 2: Arithmetic Engine

- **File:** `day-06/variables.js` (or inline module)
- **Requirement:** Build an evaluator that takes two arbitrary inputs and outputs their mathematical sum, difference, product, quotient, and remainder via the console.

### [ ] Task 3: Coercion & Equality Sandbox

- **File:** `day-06/coercion.js`
- **Requirement:** Document predictions and evaluate engine behaviors for the following expressions (with explicit explanation comments for the resulting types):
  - `'5' + 3` (String concatenation behavior)
  - `'5' - 3` (Numeric subtraction coercion)
  - `true + 1` (Boolean-to-number casting)
  - `null + 5` (Null initialization value)
  - `undefined + 5` (`NaN` evaluation)
  - `'5' === 5` (Strict type matching)
  - `'5' == 5` (Abstract/loose comparison mechanism)

### [ ] Task 4: Mutation of Const Objects

- **File:** `day-06/variables.js`
- **Requirement:** Declare a `const` object, mutate its key/value mapping, and document why this is valid under JavaScript's reference-based memory allocation strategy.

---

## 🧠 Stretch & Mastery Milestones

- **Advanced Primitives (`Symbol`):** Write an isolated snippet utilizing a unique `Symbol` identifier. Outline use-cases for keeping property keys hidden from routine loops.
- **Arbitrary Precision (`BigInt`):** Document the threshold limits of `Number.MAX_SAFE_INTEGER`. Demonstrate how to calculate beyond it using the `n` suffix.
- **The `typeof null` Legacy Bug:** Document the historical data tag mistake from JavaScript 1.0 that causes `typeof null` to erroneously return `'object'`.

---

## 📥 Git Commit Standard

Upon successful completion of all checks and configurations, i will commit my workspace changes using the standardized convention:
bash
git commit -m "feat(day-06): variables, types, and operators exercises"

# problem i faced

i got stucked on the eslint standard, until i finally remembered i could use "&&" instead of "==". when i did, the flag went off.
