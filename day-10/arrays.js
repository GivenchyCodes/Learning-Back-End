// Setup: Input Data

const students = [
  { name: 'Alice', score: 85 },
  { name: 'Bob', score: 92 },
  { name: 'Charlie', score: 78 },
  { name: 'Diana', score: 95 },
  { name: 'Eve', score: 88 },
];

// Task 1 & 2: Functional Array Methods

// (a) Get all students with score > 85
const highScorers = students.filter((student) => student.score > 85);
console.log('Students scoring > 85:', highScorers);

// (b) Get an array of just the names
const studentNames = students.map((student) => student.name);
console.log('Student names:', studentNames);

// (c) Calculate the average score using reduce
const totalScore = students.reduce((sum, student) => sum + student.score, 0);
const averageScore = totalScore / students.length; // This is the formula of average for statistics (TS/SN)
console.log('Average score:', averageScore);

// (d) Find the student with the highest score
const topStudent = students.reduce((highest, current) =>
  current.score > highest.score ? current : highest,
);
console.log('Top student:', topStudent);

// (e) Check if every student passed (score >= 70)
const allPassed = students.every((student) => student.score >= 70); // got this idea fom day03 task about cummulative score
console.log('Did everyone pass?:', allPassed);

// Task 3: Difference between slice and splice

// --- SLICE (Non-mutating) ---
// slice(start, end) copies a portion of an array. The original array remains unchanged.
const BskCampus = ['WH', 'MB', 'BM', 'TSK'];
const ReceptionLower = BskCampus.slice(1, 3); // Extracts index 1 up to (but excluding) index 3

console.log('\n Slice Example ');
console.log('Returned copy:', ReceptionLower); // ['MB', 'BM']
console.log('Original array (unchanged):', BskCampus); // ['WH', 'MB', 'BM', 'TSK']

// --- SPLICE (Mutating) ---
// splice(start, deleteCount, item1, item2...) changes the original array by removing or replacing elements.
const BIE = ['WH', 'MB', 'BM', 'TSK'];
const NorthCampus = BIE.splice(1, 2, 'CH'); // Removes 2 elements starting from index 1, inserts 'CH'

console.log('\n Splice Example ');
console.log('Returned removed elements:', NorthCampus); // ['MB', 'BM']
console.log('Original array (mutated):', BIE); // ['WH', 'CH', 'TSK']

// Task 4: Array Destructuring

const colors = ['Red', 'Green', 'Blue', 'Yellow', 'Purple'];

// Extract the first two elements and group the remaining ones into an array called 'rest'
const [firstColor, secondColor, ...restColors] = colors;

console.log('\n Destructuring Example ');
console.log('First:', firstColor); // 'Red'
console.log('Second:', secondColor); // 'Green'
console.log('Rest:', restColors); // ['Blue', 'Yellow', 'Purple']
