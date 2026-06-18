# 📔 Day 18 Journal: CommonJS vs ES Modules

## 🛠️ Exercises & Task Solutions

### Task 1: CommonJS (CJS) Module System

- **Folder:** `day-18/cjs/`

#### `package.json`

```json
{
  "name": "cjs",
  "version": "1.0.0",
  "main": "index.js",
  "author": "GivenchiCodes",
  "license": "ISC",
  "type": "commonjs"
}
```

#### `utils.js`

```javascript
// Capitalizes the first character of a string
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Multiplies the input number by two
function double(num) {
  return num * 2;
}

// Exporting functions using CommonJS
module.exports = {
  capitalize,
  double,
};
```

#### `index.js`

```javascript
console.log('\n1. CommonJS Execution:');

// Destructuring exports from utils
const { capitalize, double } = require('./utils');

console.log(capitalize('givenchiCodes file extension is cjs'));
// Output: GivenchiCodes file extension is cjs

console.log(double(21));
// Output: 42
```

---

### Task 2: ES Modules (ESM) System

- **Folder:** `day-18/esm/`

#### `package.json`

```json
{
  "name": "esm",
  "version": "1.0.0",
  "description": "Day 18 — Modules (CommonJS vs ES Modules)",
  "main": "index.js",
  "author": "GivenchiCodes",
  "license": "ISC",
  "type": "module"
}
```

#### `utils.js`

```javascript
export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function double(num) {
  return num * 2;
}
```

#### `index.js`

```javascript
import { capitalize, double } from './utils.js';

console.log('\n2. ES Modules Execution:');
console.log(capitalize('givenchiCodes Extension is esm')); // Output: GivenchiCodes Extension is esm
console.log(double(50)); // Output: 100
```

---

### Task 3: Mixed Exports (Default + Named)

#### `mixed-math.ejs`

```javascript
// Named export
export const PI = 3.14159;

// Default export
export default function square(x) {
  return x * x;
}
```

#### `index.js`

```javascript
import square, { PI } from './mixed-math.ejs';

console.log('\n3. Mixed Exports Execution:');
console.log(`PI is ${PI}`); // Output: PI is 3.14159
console.log(`Square of 4 is ${square(4)}`); // Output: Square of 4 is 16
```

---

### Task 5: Code Splitting & Error Handling

Refactoring a single-file script into distinct utility modules.

#### `validator.ejs`

```javascript
export default function isValidNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}
```

#### `calculator.ejs`

```javascript
import { isValidNumber } from './validator.ejs';

export default function subtract(a, b) {
  if (!isValidNumber(a)) {
    throw new TypeError(
      `Invalid argument 'a': expected finite number, received ${typeof a}`,
    );
  }
  if (!isValidNumber(b)) {
    throw new TypeError(
      `Invalid argument 'b': expected finite number, received ${typeof b}`,
    );
  }
  return a - b;
}
```

#### `index.js`

```javascript
import { subtract } from './calculator.ejs';

console.log('\n5. Code Splitting & Error Handling:');
try {
  console.log(`Result: ${subtract(50, 18)}`); // Output: Result: 32
} catch (error) {
  console.error(error.message);
}
```

---

## 🧠 Self-Check & Quick Answers

### 1. In a CommonJS module, what happens to a variable you declare but do not put on `module.exports`?

It remains scoped completely private to that file and cannot be accessed by other files.

### 2. Why must an ES Module import include the `.js` file ending when `require` does not?

ES Modules are built to align with web standards. Browsers explicitly need exact file extensions/paths to fetch files correctly over the network, whereas Node's legacy `require` handles background lookups automatically.

### 3. A file is named `data.js` and the project's `package.json` has no `"type"` field?

It defaults to **CommonJS**.

### 4. When can a CommonJS file not `require` an ES Module, and why?

A CommonJS file cannot synchronously `require` an ES Module if that ES Module contains top-level `await` asynchronous patterns, or because ESM loads asynchronously by nature while `require` is fundamentally synchronous.

---

## 📝 Key Terms Summary

- **Module:** Single file of code with private scope.
- **CommonJS (CJS):** Legacy Node system (`require` / `module.exports`).
- **ES Modules (ESM):** Modern standard (`import` / `export`).
- **`type: "module"`:** Tells Node.js to treat all standard `.js` files inside that directory as ES Modules.
