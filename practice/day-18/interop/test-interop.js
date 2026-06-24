import cjs from './cjsModule.cjs';
console.log('--- Task 4: Interoperability Output ---');
console.log('1. ESM importing CJS:', cjs.msg);

try {
  console.log('2. Attempting to require ESM from CJS...');
  // Standard require would throw an error here, demonstrating the workaround:
  import('./esmModule.js').then((esm) => {
    console.log('Async Import Success:', esm.esmMsg);
    console.log('\n/* COMMENTARY RECORD: ESM importing CJS works seamlessly. CJS requiring ESM synchronously throws an error, requiring an async dynamic import() workaround. */\n');
  });
} catch (err) {
  console.log('Caught expected sync require failure:', err.message);
}
