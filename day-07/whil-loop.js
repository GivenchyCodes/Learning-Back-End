// Task 5: Number Guesses
const target = Math.floor(Math.random() * 10) + 1;
let guess = 0;
let attempts = 0;

// Since we don't have user input in a basic JS file,
// we simulate "guessing" by incrementing a number or using a hardcoded one.
// Tommorrow i will input the user input number for guessing, i will use the way i did for grade.
while (guess !== target) {
  attempts += 1;
  // Simulating a guess - in a real app, this would be user input
  guess = Math.floor(Math.random() * 10) + 1;
  // it should the number of attempts base on structured with the iteration and also the number guess if it finally hit target
  console.log(`Attempt ${attempts}: Guessed ${guess}`);
}

console.log(`Correct! The number was ${target}. It took ${attempts} tries.`);
