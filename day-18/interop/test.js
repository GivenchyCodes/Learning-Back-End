// 1. ESM importing CommonJS
// Node.js automatically maps module.exports to the default export.
import cjs from './interopCJSmodule.cjs'; // - ESM importing CJS: Seamless. CJS exports match to the 'default' import key.
// there must be on empty line btw them
console.log(
  'n/ 4. Explore the interoperability rules yourself. From an ES Module, import a CommonJS module and use it. Then, from a CommonJS file, `require` a simple ES Module that has no top-level `await`. Write a short comment recording what worked and what each side received.',
);

console.log(cjs.greet());

// 2. Dynamic import of an ES Module // Also CJS requiring ESM (Handled via dynamic import in modern Node.js)
// // Note: Synchronous require() of a true ESM file throws an ERR_REQUIRE_ESM error.
// // We must use dynamic import() or run an asynchronous wrapper to fetch it.
// Note: We use import.meta.url or a relative path to import itself or another ESM.
import('./interopESMmodule').then((esm) => {
  // - CJS requiring ESM: Synchronous require('./esm') FAILS. It requires async import().
  console.log(esm.message); // Prints named export // Works: returns a module namespace object.
  console.log(esm.default); // Prints default export
});
