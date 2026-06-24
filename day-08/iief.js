// STRETCH & MASTERY 2: IIFEs
console.log('\n Stretch 2: IIFE');

(function () {
  const privateVariable = 'Secure Token';
  console.log(`IIFE executed immediately. Data: ${privateVariable}`);
})();

// An IIFE runs automatically when the Javascript engine reads it (compiles it).
