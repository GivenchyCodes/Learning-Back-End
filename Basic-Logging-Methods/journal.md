## JavaScript Logging Guide

A quick reference for handling logging in both browser and Node.js environments.

## 1. Basic Logging Methods

The console object provides different levels to help categorize and filter messages in developer tools. [1]

- console.log(): General information and standard debugging.
- console.info(): Similar to log; often includes an "i" icon in browsers.
- console.warn(): Displays a yellow warning icon for non-critical issues.
- console.error(): Displays a red error icon and usually includes a stack trace. [2, 3, 4, 5, 6]

## 2. Pro Debugging Tricks

Visualize your data more effectively with these advanced methods:

## Log Variables as Objects

Wrap a variable in curly braces {} to see its name alongside its value.

const user = { name: "Alice", id: 1 };
console.log({ user }); // Output: { user: { name: "Alice", id: 1 } }

## Table View

Use console.table() to display arrays or objects as a readable grid. [7]

const users = [
{ id: 1, name: "Alice" },
{ id: 2, name: "Bob" }
];
console.table(users);

## Grouping

Use console.group() and console.groupEnd() to nest logs together into collapsible sections. [8]

## 3. Server-Side Logging (Node.js)

In Node.js, you can write logs directly to a file using the fs (File System) module. [9]

## Simple File Log Example

const fs = require('fs');
function logToFile(message) {
const timestamp = new Date().toISOString();
fs.appendFileSync('server.log', `${timestamp} - ${message}\n`);
}

logToFile("Server started on port 3000");
