// Task 4: Regular Expression Pattern Matching

// (a) Basic email shape validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// (b) Extracting every sequence of digits
function extractNumbers(str) {
  const numberRegex = /\d+/g;
  return str.match(numberRegex) || []; // put digits inside the array
}

// (c) Simple 5-digit ZIP code validation
function isValidZip(zip) {
  const zipRegex = /^\d{5}$/;
  return zipRegex.test(zip);
}

// (d) Replacing multiple spaces with a single dash
function singleDashSpaces(str) {
  const spaceRegex = / +/g;
  return str.replace(spaceRegex, '-');
}

// Test Task 4
console.log(
  'Email tests:',
  isValidEmail('givencodes@givenchiCodes.com'),
  isValidEmail('invalid-email'),
); // true false
console.log(
  'Extract numbers:',
  extractNumbers('Givenchicodes is 24 and has 3 tasks left.'),
); // ['24', '3']
console.log('ZIP tests:', isValidZip('90210'), isValidZip('abc12')); // true false
console.log('Space clean:', singleDashSpaces('Alliance   Security      Guard')); // "Alliance-Security-Guard"

// Task 5: Slugify text function
function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove punctuation characters
    .replace(/\s+/g, '-') // Convert one or more spaces into a single dash
    .replace(/-+/g, '-') // Collapse consecutive dashes into a single dash
    .replace(/^-+|-+$/g, ''); // Strip leading and trailing dashes from edges
}

// Test Task 5
console.log('Slug 1:', slugify('Givenchicodes Portfolio!')); // "givenchicodes-portfolio"
console.log('Slug 2:', slugify('  My Day 19 Blog Post...  ')); // "my-day-19-blog-post"
console.log('Slug 3:', slugify('JavaScript & Regex: Age 24?')); // "javascript-regex-age-24"
