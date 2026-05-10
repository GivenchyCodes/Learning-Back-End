// Task 1: If/Else Grade Logic
import PromptSync from 'prompt-sync';

const prompt = PromptSync();

function getGrade() {
  const termScore = Number(prompt('Total Scores? '));

  if (typeof termScore !== 'number') {
    console.log('Please enter a valid number');
    return;
  }

  // Your logic
  if (termScore <= 29) {
    console.log('Grade F');
  } else if (termScore <= 49) {
    console.log('Grade D');
  } else if (termScore <= 59) {
    console.log('Grade C');
  } else if (termScore <= 69) {
    console.log('Grade B');
  } else if (termScore <= 100) {
    console.log('Grade A');
  } else {
    console.log('You didnt take the exams this term.');
  }
}

getGrade();

// Task 2: Switch Statement Grade Logic
const termScore = Number(prompt('what did you scored? '));

switch (true) {
  case termScore >= 70:
    console.log('A');
    break;
  case termScore >= 60:
    console.log('B');
    break;
  case termScore >= 50:
    console.log('C');
    break;
  case termScore >= 40:
    console.log('D');
    break;
  default:
    console.log('F');
}

// Task 3: FizzBuzz
for (let i = 1; i <= 100; i += 1) {
  if (i % 3 === 0 && i % 5 === 0) {
    console.log('FizzBuzz');
  } else if (i % 3 === 0) {
    console.log('Fizz');
  } else if (i % 5 === 0) {
    console.log('Buzz');
  } else {
    console.log(i);
  }
}
