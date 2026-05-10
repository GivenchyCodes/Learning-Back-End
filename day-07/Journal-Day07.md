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
