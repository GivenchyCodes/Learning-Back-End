/* eslint-disable */
// sonarjs:disable-next-line
// nosonar

// Using C language comments method

/**
 * TASK 1: Built-in Error Types
 * Demonstrates causing, catching, and logging common JavaScript error types.
 */
console.log('TASK 1');
// 1. Generic Error (it has no sementics on it own for global object)
try {
  // Manual throw of a generic system error
  throw new Error('Something went wrong globally.');
} catch (error) {
  console.log(`[${error.name}]: ${error.message}`);
}

// 2. TypeError ()
console.log('TASK 2');
try {
  // Attempting to execute a non-existent method on a primitive type
  const numm = 42;
  numm.toUpperCase();
} catch (error) {
  console.log(`[${error.name}]: ${error.message}`);

  //   const m = Map(); // TypeError: calling a builtin Map constructor without new is forbidden
  //   console.log;
}

try {
  // Corrected: Convert number to string before capitalizing
  const num = 42;
  console.log(num.toString().toUpperCase());
} catch (error) {
  console.log(`[${error.name}]: ${error.message}`);
}

try {
  // Corrected: Added 'new' keyword and fixed the missing closing bracket/console.log syntax
  const m = new Map();
  console.log(m);
} catch (error) {
  console.log(`[${error.name}]: ${error.message}`);
}

// 3. RangeError
console.log('TASK 3');
try {
  // Passing an invalid length value to an array constructor
  const arr = new Array(-1);
} catch (error) {
  console.log(`[${error.name}]: ${error.message}`);
}

// 4. ReferenceError
console.log('TASK 4');
try {
  // Accessing a variable that has never been declared
  console.log(nonExistentVariable);
} catch (error) {
  console.log(`[${error.name}]: ${error.message}`);
}

// 5. SyntaxError (via JSON.parse)
console.log('TASK 5');
try {
  // Bad syntax in external string data parsed at runtime
  JSON.parse('{ invalid json }');
} catch (error) {
  console.log(`[${error.name}]: ${error.message}`);
}

/**
 * TASK 2: Safe JSON Parsing Wrapper
 * @param {string} str - The string to parse.
 * @returns {object|string} Parsed object or clear error message string.
 */

function parseJSON(str) {
  try {
    return JSON.parse(str);
  } catch (error) {
    // Return a clear user message instead of crashing the program
    return `Parsing failed: ${error.message}`;
  }
}

// Testing Task 2
console.log('TASK 2');
console.log(parseJSON('{"status": "success"}')); // Returns object
console.log(parseJSON('{ bad data }')); // Returns message string

/**
 * TASK 3: Custom Error Classes
 * Extending the base Error class with specific status codes.
 */
console.log('TASK 3');
class ValidationError extends Error {
  constructor(message) {
    super(message); // Correctly sets up message and engine stack trace
    this.name = 'ValidationError';
    this.statusCode = 400; // Operational status code for bad requests
  }
}

class NotFoundError extends Error {
  constructor(message) {
    super(message); // Correctly sets up message and engine stack trace
    this.name = 'NotFoundError';
    this.statusCode = 404; // Operational status code for missing resources
  }
}

/**
 * TASK 4: Using Custom Errors with Type Checking
 */
console.log('TASK 4');
// MongoDB database storage
const users = [{ id: 1, email: 'Givenchicodes@live.com' }];

function findUser(id) {
  const user = users.find((u) => u.id === id);
  if (!user) {
    throw new NotFoundError(`User with ID ${id} could not be found.`);
  }
  return user;
}

function validateEmail(email) {
  if (!email.includes('@')) {
    throw new ValidationError(`The email "${email}" is missing an @ symbol.`);
  }
  return true;
}

// Execution using instanceof to differentiate operational responses
try {
  validateEmail('Givens.abraham.email.com'); // Will trigger validation logic
  findUser(999); // Will trigger not found logic
} catch (error) {
  if (error instanceof ValidationError) {
    console.warn(`[Client Error ${error.statusCode}]: ${error.message}`);
  } else if (error instanceof NotFoundError) {
    console.warn(`[Resource Error ${error.statusCode}]: ${error.message}`);
  } else {
    // Re-throw unexpected programmer errors or system glitches to prevent silencing bugs
    throw error;
  }
}

/**
 * TASK 5: Guaranteeing Clean-up via finally
 */
console.log('TASK 5');
const databaseConnection = {
  isOpen: false,
  open() {
    this.isOpen = true;
    console.log('DB connection opened.');
  },
  close() {
    this.isOpen = false;
    console.log('DB connection safely closed.');
  },
};

function processData() {
  databaseConnection.open();
  try {
    console.log('Processing query...');
    // Simulate an unexpected dynamic failure during operation
    throw new Error('Network lost mid-query.');
  } finally {
    // This block executes regardless of whether the try blocks succeeds or throws
    databaseConnection.close();
  }
}

// Execute the process wrapping the unexpected operational error safely
try {
  processData();
} catch (err) {
  console.log(`Handled root error: ${err.message}`);
}
