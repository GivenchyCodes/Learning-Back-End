// Task 4: Falsy Values
const falsyValues = [false, 0, -0, 0n, '', null, undefined, NaN];

falsyValues.forEach((val) => {
  if (!val) {
    // Airbnb usually warns against console.log; use a logger or disable for this line
    // eslint-disable-next-line no-console
    console.log(`The value ${val} is falsy.`);
  }
});

// Manual demonstration
const x = 0;

if (!'') {
  // eslint-disable-next-line no-console
  console.log('Empty strings are falsy');
}

if (x === 0) {
  // eslint-disable-next-line no-console
  console.log('Zero is falsy');
}

// Fixed: null check should be direct, as typeof null is 'object'
if (null === null) {
  // eslint-disable-next-line no-console
  console.log('Null is falsy');
}

// eslint suggest we disabble
