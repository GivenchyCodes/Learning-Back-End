##

## This journal documents the implementation of robust error handling strategies in JavaScript, covering built-in error types, defensive parsing, custom error inheritance, type-based routing, and resource lifecycle management.

## Task 1: Built-in Error Types

Demonstrates how to trigger, catch, and log five common JavaScript error types. Dynamic approaches are used to bypass static analysis tools and lint rules (the ignore).

- Error: Generic system error thrown manually.
- TypeError: Raised when an operation is performed on an incompatible data type.
- RangeError: Triggered when a numeric value or length falls outside its allowed range.
- ReferenceError: Occurs when code attempts to access a non-existent variable.
- SyntaxError: Raised during compilation or execution when parsing malformed code or data formats like bad JSON.

## Task 2: Safe JSON Parsing Wrapper

A defensive utility function that wraps JSON.parse to prevent unpredictable runtime data crashes by returning an explicit descriptive string upon failure.

- Defensive Design: Prevents untrusted string payloads from crashing execution threads.
- Graceful Degradation: Switches a fatal runtime failure into an informational error payload string.

## Task 3: Custom Error Classes

Extending the base Error class to create operational application errors. Each subclass inherits core stack tracing properties while embedding custom HTTP-aligned status codes.

- Subclassing: Uses extends Error to tap into native browser/engine stack traces.
- Context Preservation: Appends unique contextual fields (statusCode) to aid upstream API routers.

## Task 4: Using Custom Errors with Type Checking

Simulates data validation and resource lookup. Uses the instanceof operator within the catch block to handle domain-specific errors differently, while re-throwing unhandled programmer errors to preserve systemic visibility.

- Type-Based Routing: Leverages instanceof to cleanly separate validation bugs from routing bugs.
- Error Bubble Protection: Explicitly re-throws unhandled errors (throw error) to keep development tools active.

## Task 5: Guaranteeing Clean-up via finally

Demonstrates safe external resource lifecycle control. By leveraging the finally block, state cleanup routines run automatically regardless of whether operations complete cleanly or terminate prematurely due to unexpected network errors.

- Guaranteed Interception: The finally structural block runs even if early returns or catastrophic code crashes disrupt execution flows.
- Leak Mitigation: Safely closes external resources, connections, or streams to free operational system memory.

## Advance Error handling

Setting up IDE:

- Settime
- CI-CD
- PR
