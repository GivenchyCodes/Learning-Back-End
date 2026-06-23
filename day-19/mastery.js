// // STRETCH & MASTERY SOLVED

// // Mastery Task 1: JSON Reviver function for ISO Date strings
// console.log('\n JSON Reviver function for ISO Date strings: TESt');
// const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

// function dateReviver(key, value) {
//   if (typeof value === 'string' && isoDatePattern.test(value)) {
//     return new Date(value);
//   }
//   return value;
// }

// // Testing Mastery Task 1
// const userWithDate = {
//   name: 'Givenchicodes',
//   joined: new Date('2026-06-23T15:00:00.000Z'),
// };
// const serializedUser = JSON.stringify(userWithDate);
// const roundTrippedUser = JSON.parse(serializedUser, dateReviver);

// console.log('Is real Date instance:', roundTrippedUser.joined instanceof Date); // true
// console.log('Can run Date methods:', roundTrippedUser.joined.getFullYear()); // 2026

// // STRETCH & MASTERY SOLVED

// // Mastery Task 2: Lookahead assertion to match number before 'px'
// function extractPixelValues(str) {
//   const pxRegex = /\d+(?=px)/g;
//   return str.match(pxRegex) || [];
// }

// console.log(
//   'Lookahead match:',
//   extractPixelValues('width: 120px; margin: 15px; count: 42;'),
// );
// // ['120', '15'] (42 is ignored because it lacks 'px')

// // Mastery Task 3: Named Capture Groups for parsing custom dates (YYYY-MM-DD)
// function parseNamedDate(dateStr) {
//   const namedDateRegex = /(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})/;
//   const match = dateStr.match(namedDateRegex);

//   if (match && match.groups) {
//     const { year, month, day } = match.groups;
//     return `Year: ${year}, Month: ${month}, Day: ${day}`;
//   }
//   return 'No match found';
// }

// console.log(parseNamedDate('Submission date is 2026-06-23.'));
// // "Year: 2026, Month: 06, Day: 23"

// STRETCH & MASTERY SOLVED
// Just a text comment indicating the section title.

// Mastery Task 1: JSON Reviver function for ISO Date strings
// Another text comment describing the purpose of Task 1.

console.log('\n JSON Reviver function for ISO Date strings: TESt');
// Prints a header message to the console with a newline (\n) for spacing.

const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
// Defines a Regular Expression (Regex) to match standard ISO date strings.
// ^ asserts the start of the string.
// \d{4}, \d{2}, etc., look for specific counts of digits (e.g., year, month, day, time).
// $ asserts the end of the string, ensuring a strict, exact match.

function dateReviver(key, value) {
  // Defines a callback function used by JSON.parse to inspect every key-value pair.

  if (typeof value === 'string' && isoDatePattern.test(value)) {
    // Checks if the current value is a string AND matches the ISO date format.

    return new Date(value);
    // If both conditions are true, transforms the string into a live JavaScript Date object.
  }

  return value;
  // If it is not an ISO date string, returns the original value unchanged.
}

// Testing Mastery Task 1
// Comment indicating the start of the testing phase.

const userWithDate = {
  name: 'Givenchicodes',
  joined: new Date('2026-06-23T15:00:00.000Z'),
};
// Creates a test object containing a string name and a real Date object.

const serializedUser = JSON.stringify(userWithDate);
// Converts the object into a JSON string. Note: This turns the Date object into a plain text string.

const roundTrippedUser = JSON.parse(serializedUser, dateReviver);
// Parses the JSON string back into an object, using dateReviver to rebuild the Date object.

console.log('Is real Date instance:', roundTrippedUser.joined instanceof Date); // true
// Prints true because dateReviver successfully turned the text string back into a Date instance.

console.log('Can run Date methods:', roundTrippedUser.joined.getFullYear()); // 2026
// Prints 2026, proving that native Date methods can now be executed on this property.

// STRETCH & MASTERY SOLVED
// Repeat comment marking a new section of solved tasks.

// Mastery Task 2: Lookahead assertion to match number before 'px'
// Comment explaining the goal of using a Regex lookahead.

function extractPixelValues(str) {
  // Declares a function that takes a text string as an input argument.

  const pxRegex = /\d+(?=px)/g;
  // Defines a Regex where \d+ matches one or more consecutive digits.
  // (?=px) is a positive lookahead. It ensures 'px' follows the numbers without including 'px' in the final match.
  // The g flag ensures it finds all matches throughout the entire string, not just the first one.

  return str.match(pxRegex) || [];
  // Uses .match() to find all matches. If no matches are found, it returns an empty array [] as a fallback.
}

console.log(
  'Lookahead match:',
  extractPixelValues('width: 120px; margin: 15px; count: 42;'),
);
// Calls the function and prints the result: ['120', '15'].
// Note: 42 is skipped because it does not have 'px' written directly after it.
