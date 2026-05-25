### Day 12: Modern JavaScript Features

This project demonstrates core Modern JavaScript (ES6+) features based on the Day 12 task requirements. It covers the spread and rest operators, template literals, loop variations, optional chaining, and nullish coalescing.

### Features Implemented

1. Spread Operator (...)Used to unpack elements from arrays or objects.

- Array Copying: Creates a separate memory reference so modifications to the copied array do not alter the original array.
- Object Merging: Combines multiple objects into one. Properties declared last override conflicting earlier keys.
- Argument Unpacking: Unpacks array items into isolated arguments for functions like Math.max() that do not accept raw arrays.

2. Rest Parameters (...)Gathers infinitely many individual arguments passed into a function into a single, structured array for easy manipulation (e.g., using .reduce()).
3. Template LiteralsUses backticks (`) to handle multi-line strings and evaluate embedded variables or expressions painlessly using ${} syntax.
4. Advanced Loopsfor...of: Pulls item values directly from iterable data structures like arrays.for...in: Pulls property keys/labels from objects.
5. Optional Chaining (?.)Halts execution and returns undefined instead of throwing a runtime error if a nested property or object path is missing.
6. Nullish Coalescing (??)Provides a fallback value only when dealing with null or undefined. Unlike the logical OR (||) operator, it safely preserves valid falsy values like 0 or "".

### Code Execution

`To view the output of these implementations:`

Task 1a: adding
Original: [ 'apple', 'banana', 'cherry' ]
Copy: [ 'apple', 'banana', 'cherry', 'Dates' ]

Task 1b: Object Merging
{ role: 'admin', theme: 'dark', active: false }

Task 1c: Argument Unpacking
Top Score: 99

Rest Parameters
Total Sum: 60

Template Literals
Employee: Abraham
Department: Developer
Status: Active

Loops
Price: 100
Price: 250
Price: 400
Key: id -> Value: A1
Key: stackable -> Value: true

Optional Chaining & Nullish Coalescing
Region: Global
Timeout: 0
