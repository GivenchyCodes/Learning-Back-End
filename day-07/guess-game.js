import PromptSync from 'prompt-sync';

const prompt = PromptSync();

function getBet() {
  // Task 5: Number Guesses (Human Input Edition)
  const target = Math.floor(Math.random() * 10) + 1;

  let attempts = 0;
  let guess = Number(prompt('Try to guess right? '));
  console.log("I'm thinking of a number between 1 and 10...");

  while (guess !== target) {
    attempts += 1;

    // prompt() pops up a window for the user to type in
    // Number() converts that text into an actual number for comparison
    guess = Number(prompt(`Attempt ${attempts}: Enter your guess (1-10):`));

    if (guess < target) {
      console.log(`Attempt ${attempts}: ${guess} is too low!`);
    } else if (guess > target) {
      console.log(`Attempt ${attempts}: ${guess} is too high!`);
    } else if (guess === target) {
      console.log(`Correct! You got it in ${attempts} attempts.`);
    } else {
      console.log('Please enter a valid number.');
    }
  }
}

getBet();
