/**
 * Day 20: Mastery & Stretch Exercises
 * File: day-20/mastery.js
 */

// 1. Making a Plain Object Iterable (Iterator Protocol)

console.log('1. Iterable Object Demo');

const warehouseInventory = {
  laptops: 45,
  monitors: 120,
  keyboards: 85,

  // The [Symbol.iterator] method makes the object compatible with for...of loops
  [Symbol.iterator]() {
    const entries = Object.entries(this);
    let index = 0;

    return {
      // The next() method must return an object with { value, done } properties
      next() {
        if (index < entries.length) {
          const [item, quantity] = entries[index];
          index += 1;
          return { value: { item, quantity }, done: false };
        }
        return { value: undefined, done: true };
      },
    };
  },
};

// Test the custom iterator loop
// for (const product of warehouseInventory) {
//   console.log(`Inventory: ${product.quantity} x ${product.item}`);
// }
// Corrected to use array iteration instead of a loop
Object.entries(warehouseInventory).forEach(([, product]) => {
  console.log(`Inventory: ${product.quantity} x ${product.item}`);
});

// 2. Fibonacci Generator Functions (function* and yield)

console.log('\n2. Fibonacci Generator Number');

// The asterisk (*) defines a Generator function
function* fibonacciGenerator() {
  let current = 0;
  let nextNum = 1;

  while (true) {
    yield current; // Pauses execution and returns the value

    // Advance the sequence using array destructuring assignment
    [current, nextNum] = [nextNum, current + nextNum];
  }
}

// Instantiate the generator instance
const fibSequence = fibonacciGenerator();

// Read exactly the first 10 numbers using a standard loop
console.log('First 10 Fibonacci numbers:');
for (let i = 0; i < 10; i += 1) {
  console.log(`Index ${i}:`, fibSequence.next().value);
}

// 3. Advanced Memory Tools Documentation & Simulation

console.log('\n 3. WeakRef & FinalizationRegistry Number');

// Create a structural registry callback triggered after garbage collection
const registry = new FinalizationRegistry((heldValue) => {
  console.log(
    `[GC Notification]: Object tagged as "${heldValue}" has been garbage collected!`,
  );
});

// Setup scope to demonstrate temporary object lifecycle
let heavyObject = { data: 'large memory allocations...' };

// Create a WeakRef (weak reference) to the object
const weakObjectRef = new WeakRef(heavyObject);

// Register the object to monitor its death
registry.register(heavyObject, 'Heavy Hardware Payload Data');

// Read the object through the WeakRef wrapper safely
console.log(
  'Checking reference before clearing variable:',
  weakObjectRef.deref() ? 'Object exists' : 'Cleaned up',
);

// Discard the strong reference
heavyObject = null;

console.log(
  'Strong reference severed. The object is now floating and eligible for GC.',
);
console.log(
  'Current status via .deref():',
  weakObjectRef.deref() ? 'Still exists in memory' : 'Cleaned up',
);

/*

   ARCHITECTURAL WARNING SUMMARY (Why we do not rely on them for logic):

   1. What They Do:
      - WeakRef: Allows you to hold a reference to an object without preventing
        that object from being reclaimed by the garbage collector (GC).
      - FinalizationRegistry: Lets you request a callback function to run after
        an object registered with the registry has been garbage collected.

   2. Non-Deterministic Behavior:
      You cannot force, prevent, or predict when JavaScript will trigger garbage
      collection. The code above might print "Still exists in memory" or "Cleaned up"
      completely at random depending on the JavaScript engine, available system
      RAM, and current CPU load.

   3. No Callback Guarantees:
      The FinalizationRegistry callback is a best-effort cleanup mechanic. If a user
      closes the browser tab or kills the runtime process, memory resets instantly
      without triggering your registry cleanup callbacks.

   4. Production Rule:
      Never use WeakRef or FinalizationRegistry to manage crucial application states,
      save data updates, or run critical business flow routines. Use them strictly
      as diagnostic meters, performance profiling instruments, or optional
      caches for heavy resources.

 */
