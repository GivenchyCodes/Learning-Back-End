import mathUtils, { add, subtract } from './mathEngine.js';
console.log('--- Task 3: Default + Named Exports Output ---');
console.log(`Engine: ${mathUtils.description} (v${mathUtils.version})`);
console.log(`10 + 5 = ${add(10, 5)}`);
console.log(`10 - 5 = ${subtract(10, 5)}\n`);
