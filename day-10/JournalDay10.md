# Day 10: JavaScript Array Operations

This project demonstrates the core functionality of JavaScript arrays, focusing on the differences between mutating and non-mutating methods, functional programming patterns (`map`, `filter`, `reduce`), and array destructuring.

## 🚀 Learning Outcomes

- Create arrays and access elements by index.
- Implement mutating methods (`splice`, `push`, `pop`, etc.).
- Implement non-mutating methods (`map`, `filter`, `reduce`, `find`, `every`, etc.).
- Understand and prevent unintended data mutation.
- Use modern ES6+ features like array destructuring and the rest operator (`...`).

## 📁 Project Structure

```text
├── day-10/
│   ├── arrays.js       # Main execution script containing task solutions
│   └── README.md       # Project documentation (this file)
```

## 📝 Task Walkthrough

### Task 1 & 2: Functional Array Methods

Using a dataset of `students` with names and scores, the following operations are solved without manual `for` loops:

- **Filter:** Extracts students with a score greater than 85.
- **Map:** Transforms the array of objects into a flat array of student names.
- **Reduce (Aggregation):** Accumulates total scores to calculate the class average.
- **Reduce (Comparison):** Compares scores line-by-line to identify the top-performing student.
- **Every:** Validates if all students meet the passing threshold (score $\ge$ | >= 70).

### Task 3: `slice` vs `splice`

This section highlights the critical architectural difference between safe and mutating methods:

- **`slice(start, end)`**: Non-mutating. It returns a shallow copy of a portion of an array into a new array object. The original array remains pristine.
- **`splice(start, deleteCount, items...)`**: Mutating. It changes the contents of an array by removing or replacing existing elements in place, directly modifying the source array.

### Task 4: Array Destructuring

Demonstrates how to unpack values from arrays into distinct variables using positional matching and capturing remaining items using the rest pattern:

```javascript
const [first, second, ...rest] = someArray;
```

## 📖 Reference Resources

- [JavaScript.info — Arrays](https://javascript.info)
- [JavaScript.info — Array Methods](https://javascript.info-methods)
- [MDN Web Docs — Array Reference](https://mozilla.org)
