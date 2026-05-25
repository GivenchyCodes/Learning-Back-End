// DAY 12: Spread/Rest, Template Literals & Other Modern JS Features
// TASK 1: Three Uses of the Spread Operator (...)

// (a) copying an array
// i am creating a separate memory refe so changes to the copy do not alter the original.
const originalFruits = ['apple', 'banana', 'cherry'];
const copiedFruits = [...originalFruits];

copiedFruits.push('Dates');
console.log(' Task 1a: Array Copying ');
console.log('Original:', originalFruits); // ['apple', 'banana', 'cherry'] (Unchanged)
console.log('Copy:', copiedFruits); // ['apple', 'banana', 'cherry', 'Dates']

// (b) Merging two objects
// Combining properties. If keys conflict, the property declared last overrides earlier ones.
const userDefaults = { role: 'guest', theme: 'dark', active: true };
const userOverrides = { role: 'admin', active: false };

const finalUser = { ...userDefaults, ...userOverrides };
console.log('\n Task 1b: Object Merging ');
console.log(finalUser); // { role: 'admin', theme: 'dark', active: false }

// (c) Passing array items as separate arguments
// Unpacking an array into isolated arguments for functions that do not accept arrays directly.
const scores = [45, 99, 12, 84];
const topScore = Math.max(...scores); // Equates to Math.max(45, 99, 12, 84) ref via MDN

console.log('\n Task 1c: Argument Unpacking ');
console.log('Top Score:', topScore); // 99

// ADDITIONAL IMPLEMENTATIONS: Rest, Templates, Loops & Short-Circuits

// 2. Rest Parameters (...)
// Gathers infinitely many individual arguments into a single structured array.
function aggregateScores(...allScores) {
  return allScores.reduce((sum, current) => sum + current, 0);
}
console.log('\n Rest Parameters ');
console.log('Total Sum:', aggregateScores(10, 20, 30)); // 60

// 3. Template Literals
// Uses backticks (`) for painless variable evaluation via ${} and multi-line strings.
//const classes = `header ${
// //isLargeScreen() ? "" : `icon-${item.isCollapsed ? "expander" : "collapser"}`
// //}`;

const employee = 'Abraham';
const department = 'Developer';
const report = `Employee: ${employee}
Department: ${department}
Status: Active`;

console.log('\n Template Literals ');
console.log(report);

// 4. Looping: for...of VS for...in
const itemPrices = [100, 250, 400];
const itemManifest = { id: 'A1', stackable: true };

console.log('\n Loops ');
// for...of pulls item VALUES directly from iterable data structures (Arrays)
for (const price of itemPrices) {
  console.log(`Price: ${price}`);
}
// for...in pulls property KEYS/LABELS from objects
for (const key in itemManifest) {
  console.log(`Key: ${key} -> Value: ${itemManifest[key]}`);
}

// 5 & 6. Optional Chaining (?.) & Nullish Coalescing (??)
// ?. halts execution and outputs undefined instead of crashing if a nested property is missing.
// ?? provides a fallback ONLY when dealing with null or undefined.
const serverResponse = {
  meta: { status: 200 },
  preferences: {
    timeout: 0, // Valid 0 value that || would mistakenly overwrite
  },
};

const region = serverResponse.location?.region ?? 'Global';
const globalTimeout = serverResponse.preferences?.timeout ?? 5000;

console.log('\n Optional Chaining & Nullish Coalescing');
console.log('Region:', region); // 'Global' (safely defaulted because location is undefined)
console.log('Timeout:', globalTimeout); // 0 (safely preserved because 0 is a valid non-nullish value)
