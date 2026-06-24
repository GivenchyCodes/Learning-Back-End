console.log('\n TASK 3: PRIVATE COUNTER VIA CLOSURE');

function createCounter() {
  let count = 0; // Private variable hidden by outer lexical scope

  return {
    increment() {
      count += 1;
      return count;
    },
    decrement() {
      count -= 1;
      return count;
    },
    getCount() {
      return count;
    },
  };
}

const counter = createCounter();
console.log('  Increment:', counter.increment()); // 1
console.log('  Increment:', counter.increment()); // 2
console.log('  Decrement:', counter.decrement()); // 1
console.log('  Get Current:', counter.getCount()); // 1
// console.log(counter.count); // undefined (Safe and encapsulated!)

console.log('\n TASK 4: UNIQUE ID GENERATOR');

function createIdGenerator() {
  let id = 0; // Private counter in series literal

  return function () {
    id += 1;
    return `id_${id}`;
  };
}

const generateUserId = createIdGenerator();
console.log('  User ID 1:', generateUserId()); // "id_1"
console.log('  User ID 2:', generateUserId()); // "id_2"

console.log('\n TASK 5: ASYNCHRONOUS LOOP FIXES');

/*
  EXPLANATION: Why did the original code print '5' five times?
  The 'variable' keyword makes 'i' globally/function scoped. Loop iterations overwrite
  the same shared space. The 'setTimeout' callback triggers asynchronously AFTER
  the loop finishes. By then, the shared value of 'i' has already reached '5'. #javaScript scope
*/

// Modern Solution: Use 'let' to bind a distinct 'i' per iteration block
//console.log("  Starting 'var' loop (kindly watch logs arrive in 100ms)");
///0xx0x0x0x0x00x

for (var iterationVar = 0; iterationVar <= 6; iterationVar += 1) {
  setTimeout(
    () => console.log('    Fix (var) loop output:', iterationVar),
    100,
  );
}

for (let iterationLet = 0; iterationLet < 5; iterationLet += 1) {
  setTimeout(
    () => console.log('    Fix (let) loop output:', iterationLet),
    100,
  );
}

// for (var iterationVar = 0; iterationVar < 5; iterationVar += 1) {
//   console.log('    Fix (var) loop output:', iterationVar);
// }

// for (let iterationLet = 0; iterationLet < 5; iterationLet += 1) {
//   console.log('    Fix (let) loop output:', iterationLet);
// }
