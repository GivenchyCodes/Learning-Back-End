# JavaScript Learning: Day 7 — Control Flow

This project contains solutions for Day 7 of my JavaScript learning journey, focusing on **Control Flow**. Control flow is the order in which statements are executed in a script, allowing programs to make decisions and repeat actions.

## 🚀 Learning Outcomes

- Mastering `if/else` chains and the ternary operator for decision-making.
- Using `switch` statements for handling multiple fixed values.
- Implementing `for`, `while`, and `do...while` loops to automate repetitive tasks.
- Understanding **Truthy** and **Falsy** values in JavaScript.

## 📁 File Structure

- `day-07/control-flow.js`: Contains the grade conversion logic (If/Else and Switch) and the classic FizzBuzz challenge.
- `day-07/truthy-falsy.js`: Demonstrates all eight falsy values in JavaScript with functional checks.

## 🛠️ Tasks Implemented

### 1. Grade Converter

A program that converts a numeric score (0–100) into a letter grade (A, B, C, D, F).

- **Techniques used:** `if...else if` for range checking and `switch(true)` as a comparative alternative.

### 2. FizzBuzz Challenge

A classic programming exercise that prints numbers from 1 to 100 with specific rules:

- Multiples of 3 print "Fizz".
- Multiples of 5 print "Buzz".
- Multiples of both print "FizzBuzz".

### 3. Truthy & Falsy Demonstration

Explicitly lists and checks all falsy values in JavaScript: `false`, `0`, `-0`, `0n`, `""`, `null`, `undefined`, and `NaN`.

### 4. Random Number Guessing Game

A `while` loop that continues to generate random numbers until it matches a "target" number, tracking the number of attempts it took to succeed.

## 📝 Key Insights

- **Switch vs. If/Else:** `if/else` is generally more readable for range-based logic (like grades), while `switch` is ideal for discrete, predefined values (like days of the week).
- **Loop Choice:** `for` loops are best when you know the number of iterations; `while` loops are better when the end condition depends on dynamic factors (like a random guess).

# problem i faced:

- the truthy-falsy is complecated but the documentations suggest you disabble at this point.
- i will continue tomorrow on the stretchery and mastery.
- `day-07/guessing-game.js`: A simulation of a number-guessing game using a `while` loop. i will do this tomorrow

## Day 07 PassOver

- I finally figured it out on how to use while loop. i also stratched my code to have:
  - An import method for prompt
  - i create a start function for getBet() and it return getBet()
  - i crated a method with a callback 'target': 'const target = Math.floor(Math.random() \* 10) + 1;'
  - i also crated a 'while loop function with an argument input to flush with an attampts += 1 iteration: while (guess !== target) {
    attempts += 1; }

- The standard break statement only exits the innermost loop it is currently in. Using a labelled break is primarily useful in nested loops when you need to exit an outer loop from within an inner one: i will continue on it tomorrow with the code, i am still studying the resources.

- I iterates from 1 to the limit, concatenating strings for multiples of 3 and 5.
- The logs "Fizz", "Buzz", or "FizzBuzz" accordingly, returns to the number itself.

## Today MAY 13th - Stretch & Mastery

I discussed theoritically about the workflow of a Full-Stack Project (Web App)

# Full-Stack Web Application Workflow

- `Phase 1:` Requirements & Architecture Planning
  - User Experience Design: Defining user journeys, wireframes, and interface layouts.
  - Tech Stack Selection: Choosing the frontend, backend, and database technologies.
  - System Architecture: Mapping data flow between client, server, and storage layers.

- `Phase 2:` Database Design & Data Modeling
  - Schema Definition: Structuring tables or collections to hold application data.
  - Relationship Mapping: Defining how data points connect (one-to-many, many-to-many).
  - Query Optimization: Designing indexes to quickly search through data grids.

- `Phase 3:` Backend (Server-Side) Development
  - API Construction: Building RESTful endpoints or GraphQL schemas for data exchange.
  - Business Logic: Writing code to filter, validate, and process data matrices.
  - Authentication & Security: Implementing user login protocols and data encryption.

- `Phase 4:` Frontend (Client-Side) Development
  - UI Component Assembly: Coding reusable visual elements like forms, menus, and grids.
  - State Management: Tracking dynamic data changes locally within the browser.
  - API Integration: Connecting UI actions to backend endpoints using HTTP requests.

- `Phase 5:` DevOps, Deployment & Maintenance
  - Environment Configuration: Setting up production servers and environment variables.
  - CI/CD Pipelines: Automating code testing and deployment workflows.
  - Monitoring & Analytics: Tracking server performance and application errors post-launch.

## Read about labelled statements in loops. When might `break LABEL` be useful?

# Multi-Level Loop Extraction

The primary use case for labeled break statements is exiting `deeply nested` loops instantly without setting flag variables.

# Key Scenarios for break LABEL

- Matrix Searching: Finding a specific value in a 3D or 2D grid and stopping all further processing.
- Early Validation: Aborting complex, multi-layered data validation sequences the moment a single failure occurs.
- Performance Optimization: Skipping remaining iterations across multiple dimensions to save CPU cycles.
- Graph Traversal: Halting deep tree or node operations immediately once a path condition is met.

# Nested Loop Labeling

The provided code in my `Nested-Loop.js` uses a JavaScript feature called labeled statements.

- Label definition:
  - search: acts as a custom prefix name for the outer loop.
  - Targeted exit: break search; forces execution to jump completely out of the named outer loop.
  - Standard break limitation: A normal break; without a label only exits the inner loop (j).

# Step-by-Step

- ExecutionOuter Loop (i): Iterates through each row of a 2D array (grid).
- Inner Loop (j): Iterates through each cell within the current row.
- Conditional Check: Evaluates if the value at coordinates grid[i][j] equals 'TARGET'.Action: Prints 'Found it!' to the console upon a successful match.
- Termination: Bypasses all remaining cells and rows instantly, stopping all loop operations.

## Please, the resouces i read were all helpful.

Using it in real project for: FindIndex method
const indexofFour = numbers.findIndex(num=> num === 4);
