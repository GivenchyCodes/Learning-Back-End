// DAY 9 — SCOPE, HOISTING & CLOSURES (ALL-IN-ONE MASTER SCRIPT)

console.log('TASK 1 & 2: SCOPE DEMONSTRATION & VAR VS LET');

// Global Scope: Means it is Accessible everywhere
const globalVar = 'I am Global';

function testFunctionScope() {
  // Function Scope: Only accessible inside this function
  var functionVar = 'I am function scoped';
  console.log('  [Inside Function] Global:', globalVar); // Accessible
  console.log('  [Inside Function] Function:', functionVar); // Accessible
}
testFunctionScope();

// Block Scope Comparison (Inside an IF statement)
if (true) {
  var blockVarVar = 'var leaks out of blocks';
  let blockVarLet = 'let stays in blocks';
  console.log('  [Inside Block] Let:', blockVarLet); // Accessible
}
console.log('  [Outside Block] Var:', blockVarVar); // Accessible! (var leaked)
// console.log(blockVarLet); // ReferenceError if uncommented

// Block Scope Comparison (Inside a FOR loop)
for (var i = 0; i < 3; i += 1) {
  /* Loop body */
}
console.log('  [Post-Loop] var i value:', i); // Prints 3

for (let j = 0; j < 3; j += 1) {
  /* Loop body */
}
// console.log(j); // ReferenceError
