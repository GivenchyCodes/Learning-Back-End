```java
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";

    // Hides the constructor call from the stack trace
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ValidationError);
    }
  }
}

// --- Note on the difference it makes to the trace ---
/*
Without Error.captureStackTrace(this, ValidationError):
The top of the stack trace would show the line inside this constructor:
   at new ValidationError (error-handling.js:4:5)
   at validateForm (error-handling.js:45:11)

With Error.captureStackTrace(this, ValidationError):
Node.js strips the constructor call entirely. The trace begins directly at the
throw site, which is much cleaner for debugging:
   at validateForm (error-handling.js:45:11)
*/
```

# Error Categorization & Handling Reference

## 1. Operational Errors

Operational errors are runtime problems expected in correct programs. They represent external failures, not bugs in the source code.

### Examples from Written Code:

1. **Missing Nested API Data:** In your Day 12 code, dealing with `serverResponse.location?.region`. The server might return an empty object or omit optional keys entirely.
2. **Method Context Loss (`this` Stripping):** Stripping the reference window when assigning a method to a variable: `const looseSpeak = mouse.speak;`. This simulates an unexpected functional reference wrapper detachment at runtime.
3. **Unexpected Input Types to Factory Methods:** Passing malformed data configurations to `Animal.fromObject(data)` where `data` might accidentally arrive as `null` or `undefined` from a network payload.

### Handling Strategy:

- **Graceful Degradation:** Use optional chaining (`?.`) and nullish coalescing (`??`) to supply standard fallbacks (e.g., defaulting `region` to `'Global'`).
- **Defensive Interception:** Wrap volatile contextual execution references inside explicit try/catch architecture to swallow the crash and flag user notifications safely.

## 2. Programmer Errors

Programmer errors are genuine bugs where the developer wrote incorrect syntax, broke a design contract, or misunderstood language mechanics.

### Examples from Written Code:

1. **Subclass Initialization Flow Violation:** Invoking `this.breed = breed;` inside the `Dog` class constructor prior to calling `super(name);`. JavaScript throws a syntax runtime error blocking execution.
2. **Scope Overwrites / Lexical Type Overlays:** Accidentally attempting to assign values to open block variables improperly, like the dangling bracket mismatch visible in your Day 1 snippet (`cons` trailing character).
3. **Invalid Loop Extraction Methods:** Attempting to extract raw element values using a `for...in` loop over `itemPrices` expecting arrays, which extracts indexed string keys (`"0"`, `"1"`) instead of numeric sums.

### Handling Strategy:

- **Fail Loudly & Fast:** Do not attempt to catch or patch programmer errors with try/catch. Let the application crash during development or testing.
- **Tooling & Compilation Review:** Fix the root source code directly. Use static analysis linters (ESLint) and write comprehensive test suites to catch these bugs before deployment.

```java
class FormValidationError extends Error {
  constructor(message, invalidFields) {
    super(message);
    this.name = "FormValidationError";
    this.fields = invalidFields; // Array of failed field logs
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, FormValidationError);
    }
  }
}

function validateForm(data) {
  const errors = [];

  // 1. Verify "name" exists and matches format rules
  if (!data?.name || typeof data.name !== 'string' || data.namt.trim() === '') { // '' for null or 0
    errors.push({ field: 'name', message: 'Name must be a valid, non-empty string.' });
  }

  // 2. Verify "genres" uses modern collection rules (Array layout)
  if (!data?.genres || !Array.isArray(data.genres) || data.genres.length === 0) {
    errors.push({ field: 'genres', message: 'Genres must include at least one category.' });
  }

  // 3. Verify "rating" falls within valid mathematical bounds
  if (typeof data?.rating !== 'number' || data.rating < 0 || data.rating > 5) {
    errors.push({ field: 'rating', message: 'Rating must be a valid number between 0 and 5.' });
  }

  // If items populated the error collection array, fire the combined bundle
  if (errors.length > 0) {
    const errorSummary = errors.map(e => `[${e.field}]: ${e.message}`).join(' | ');
    throw new FormValidationError(`Form processing failed: ${errorSummary}`, errors);
  }

  return "Form data passes successfully.";
}

//  Execution Test Examples
try {
  // Simulating an invalid object payload mapping back to my Book configuration structure
  const invalidFormData = { title: "The BSK", genres: "Not An Array", rating: 9.5 };
  validateForm(invalidFormData);
} catch (error) {
  console.log(`Caught ${error.name}:`, error.message);
  console.log("Detailed field errors array:", error.fields);
}
```

### When is Accumulation Better Than Failing Fast?

- User-Facing UI Inputs: When validation occurs on a UI checkout or profile form, failing fast forces users to submit, hit an error, fix one field, and submit again repeatedly.
- Accumulation highlights all invalid fields at once for a frictionless user experience.
- Bulk Data Processing / Ingestion: When parsing large CSV logs or executing batches of background migrations, you want to identify all corrupted configuration properties across a dataset simultaneously rather than stopping execution on row one.

## Developer Journal: JavaScript Error Handling & Exception Management

This journal documents the implementation of robust error handling strategies in JavaScript, covering built-in error types, defensive parsing, custom error inheritance, type-based routing, and resource lifecycle management.

## Task 1: Built-in Error Types

Demonstrates how to trigger, catch, and log five common JavaScript error types. Dynamic approaches are used to bypass static analysis tools and lint rules.

- Error: Generic system error thrown manually.
- TypeError: Raised when an operation is performed on an incompatible data type.
- RangeError: Triggered when a numeric value or length falls outside its allowed range.
- ReferenceError: Occurs when code attempts to access a non-existent variable.
- SyntaxError: Raised during compilation or execution when parsing malformed code or data formats like bad JSON.

```java
// 1. Generic Errortry {
  // Manual throw of a generic system error
  throw new Error('Something went wrong globally.');
} catch (error) {
  console.log(`[${error.name}]: ${error.message}`);
}
// 2. TypeErrortry {
  // Bypasses static analysis by obfuscating the type check via a dynamic object map
  const dynamicValues = { value: 42 };
  const methodKey = 'toUpperCase';
  dynamicValues.value[methodKey]();
} catch (error) {
  console.log(`[${error.name}]: ${error.message}`);
}
// 3. RangeErrortry {
  // Bypasses literal array checks by computing a negative number at runtime
  const dynamicSize = (() => -1)();
  const arr = new Array(dynamicSize);
} catch (error) {
  console.log(`[${error.name}]: ${error.message}`);
}
// 4. ReferenceErrortry {
  // Bypasses "variable not defined" lint checks by looking up a property on the global scope
  const globalContext = typeof window !== 'undefined' ? window : global;
  if (!globalContext.nonExistentVariable) {
    // Evaluating string expression at runtime causes genuine engine ReferenceError without static code flags
    eval('nonExistentVariable');
  }
} catch (error) {
  console.log(`[${error.name}]: ${error.message}`);
}
// 5. SyntaxError (via JSON.parse)try {
  // Bad syntax in external string data parsed at runtime
  JSON.parse('{ invalid json }');
} catch (error) {
  console.log(`[${error.name}]: ${error.message}`);
}


## Task 2: Safe JSON Parsing Wrapper
A defensive utility function that wraps JSON.parse to prevent unpredictable runtime data crashes by returning an explicit descriptive string upon failure.

* Defensive Design: Prevents untrusted string payloads from crashing execution threads.
* Graceful Degradation: Switches a fatal runtime failure into an informational error payload string.

/**
 * Safe JSON Parsing Wrapper
 * @param {string} str - The string to parse.
 * @returns {object|string} Parsed object or clear error message string.
 */function parseJSON(str) {
  try {
    return JSON.parse(str);
  } catch (error) {
    // Return a clear user message instead of crashing the program
    return `Parsing failed: ${error.message}`;
  }
}
// Testing Task 2
console.log(parseJSON('{"status": "success"}')); // Returns object
console.log(parseJSON('{ bad data }')); // Returns message string


## Task 3: Custom Error Classes
Extending the base Error class to create operational application errors. Each subclass inherits core stack tracing properties while embedding custom HTTP-aligned status codes.

* Subclassing: Uses extends Error to tap into native browser/engine stack traces.
* Context Preservation: Appends unique contextual fields (statusCode) to aid upstream API routers.

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


## Task 4: Using Custom Errors with Type Checking
Simulates data validation and resource lookup. Uses the instanceof operator within the catch block to handle domain-specific errors differently, while re-throwing unhandled programmer errors to preserve systemic visibility.

* Type-Based Routing: Leverages instanceof to cleanly separate validation bugs from routing bugs.
* Error Bubble Protection: Explicitly re-throws unhandled errors (throw error) to keep development tools active.

// Mock database storage
const users = [{ id: 1, email: 'user@example.com' }];
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
// Execution using instanceof to differentiate operational responsestry {
  validateEmail('bademail.com'); // Will trigger validation logic
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


## Task 5: Guaranteeing Clean-up via finally
Demonstrates safe external resource lifecycle control. By leveraging the finally block, state cleanup routines run automatically regardless of whether operations complete cleanly or terminate prematurely due to unexpected network errors.

* Guaranteed Interception: The finally structural block runs even if early returns or catastrophic code crashes disrupt execution flows.
* Leak Mitigation: Safely closes external resources, connections, or streams to free operational system memory.

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
// Execute the process wrapping the unexpected operational error safelytry {
  processData();
} catch (err) {
  console.log(`Handled root error: ${err.message}`);
}

## Advance Error Handling
* Document asynchronous error handling using async/await try-catch blocks.
* Add an architectural explanation on the difference between operational errors vs. programmer errors.
* Create a section explaining how to handle unhandled rejections globally.


```
