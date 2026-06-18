import { capitalize, double } from './utils.js';
// eslint flagged me but already i included type on my package.json
console.log(
  ' n/ 2. Create a `day-18/esm/` folder with its own `package.json` containing `"type": "module"`. Rewrite the same utility module there using `export`, and use it from an `index.js` with `import`.',
);
console.log(capitalize('givenchiCodes Extension is esm')); // Output: Hello esm
console.log(double(50)); // Output: 100
