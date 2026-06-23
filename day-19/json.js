// Task 1: Deep copy function using JSON serialization
function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

// Test Task 1
console.log('Task 1 DeepCopy');
const originalUser = {
  name: 'Givencodes',
  age: 24,
  courses: ['Artificial Intelligent', 'Machine Learning'], // array braces
};
const copiedUser = deepCopy(originalUser);

copiedUser.courses.push('Data Science');
console.log('Original courses:', originalUser.courses); // ["Artificial Intelligent", "Machine Learning"]
console.log('Copied courses:', copiedUser.courses); // ["Artificial Intelligent", "Machine Learning", "Data Science"]

/* C language multiple line comments
  The value types this approach would lose or change:
  1. Functions: Silently omitted from objects; converted to null in arrays.
  2. undefined: Silently omitted from objects; converted to null in arrays.
  3. Symbols: Silently omitted from objects; converted to null in arrays.
  4. Date objects: Converted into standard ISO text strings (loses Date methods).
  5. Built-in collections (Set, Map): Converted into empty objects {}.
  6. RegExp objects: Converted into empty objects {}.
  7. NaN and Infinity: Converted into null values.
*/

// Task 2: Safe JSON parsing function
console.log('\n Task 2: parsing function Test');
function safeJSONParse(str) {
  try {
    const data = JSON.parse(str);
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message };
  }
}

// Test Task 2
console.log('Valid Parse:', safeJSONParse('{"name":"Givencodes","age":24}'));
// { data: { name: 'Givencodes', age: 24 }, error: null }

console.log('Invalid Parse:', safeJSONParse('{ broken json }'));
// { data: null, error: 'Unexpected token b in JSON...' }

// Task 3: Demonstration of JSON data representation limits
console.log('\n Task 3 show JSON Limit:');
const complexObject = {
  myFunction: () => 'World Cup 2026',
  myUndefined: undefined,
  myDate: new Date('2026-06-23T12:00:00.000Z'),
  mySet: new Set(),
};

const serializedText = JSON.stringify(complexObject); // The serialization sementic
console.log('Serialized result:', serializedText);
// Output: {"myDate":"2026-06-23T12:00:00.000Z","mySet":{}}

/* using C language multiple lines comment
  What happened to each value during serialization:
  - myFunction: Completely dropped from the string along with its key.
  - myUndefined: Completely dropped from the string along with its key.
  - myDate: Converted into a standard string. It loses its object properties and Date methods.
  - mySet: Converted into an empty object literal '{}' because Set items are not enumerable object keys.
*/
