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
