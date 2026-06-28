/**
 * using C language Multilnes comment
 * Day 20: Advanced Collections Exercises
 * File: day-20/collections.js
 */

// Task 1: Map with Object Keys
const mapExercise = () => {
  const objectMap = new Map();

  // Create two distinct object keys
  const keyOne = { id: 1 };
  const keyTwo = { id: 2 };

  // Store values
  objectMap.set(keyOne, 'Value for Key One');
  objectMap.set(keyTwo, 'Value for Key Two');

  // Read them back and confirm both exist
  console.log('Task 1 - Key One:', objectMap.get(keyOne));
  console.log('Task 1 - Key Two:', objectMap.get(keyTwo));
  console.log('Task 1 - Total Size:', objectMap.size); // The output: 2

  /*
      WHY A PLAIN OBJECT CANNOT DO THIS:
      Plain JavaScript objects stringify all keys. If you try to use objects as keys,
      the object converts both 'keyOne' and 'keyTwo' into the string "[object Object]".
      As a result, the second assignment simply overwrites the first one.

      Example of failure in plain objects:
      const plainObj = {};
      plainObj[keyOne] = "Value One";
      plainObj[keyTwo] = "Value Two"; // Overwrites "Value One" because plainObj["[object Object]"] is reused.
    */
};

// Task 2: Set Operations (Union & Intersection)
// Deduplicate an array using a Set
const sampleArray = [];
const uniqueArray = [...new Set(sampleArray)];
console.log('Task 2 - Unique Array:', uniqueArray); // Output: [1, 2, 3, 4, 5]

// Returns the union of two arrays (all unique items from both)
const getUnion = (arr1, arr2) => [...new Set([...arr1, ...arr2])];

// Returns the intersection of two arrays (items present in both)
const getIntersection = (arr1, arr2) => {
  const set2 = new Set(arr2); // Lookups in a Set are fast O(1)
  return arr1.filter((item) => set2.has(item));
};

console.log('Task 2 - Union:', getUnion([1, 2, 3], [3, 4, 5])); // Output: [1, 2, 3, 4, 5]
console.log('Task 2 - Intersection:', getIntersection([1, 2, 3], [2, 3, 4])); // Output: [2, 3]

// Task 3: Word Counter Map

const countWords = (text) => {
  const wordMap = new Map();
  // Normalize text: lowercase and split by spaces/whitespace
  const words = text.toLowerCase().match(/\b\w+\b/g) || [];

  // for (const word of words) {
  //   const currentCount = wordMap.get(word) || 0;
  //   wordMap.set(word, currentCount + 1);
  // }
  words.forEach((word) => {
    wordMap.set(word, (wordMap.get(word) || 0) + 1);
  });

  return wordMap;
};

const textSample = 'JavaScript is great and writing JavaScript is fun.';
const countedWords = countWords(textSample);

// Show how to read the count for one specific word
console.log("Task 3 - Count for 'javascript':", countedWords.get('javascript')); // Output: 2
console.log("Task 3 - Count for 'fun':", countedWords.get('fun')); // Output: 1

// Task 4: Simple Cache with WeakMap

const processCache = new WeakMap();

const getComputedResult = (objKey) => {
  // If the result is already cached, return it immediately
  if (processCache.has(objKey)) {
    console.log('Fetching from cache...');
    return processCache.get(objKey);
  }

  // Simulate an expensive computation
  console.log('Performing heavy computation...');
  const result = { calculatedAt: Date.now(), metadata: 'heavy_data' };

  // Store in WeakMap cache
  processCache.set(objKey, result);
  return result;
};

/*
  WHY A WEAKMAP IS THE RIGHT CHOICE HERE:
  If we used a standard Map, the cache itself would maintain a permanent, strong reference
  to 'objKey'. Even if the rest of our application discarded 'objKey', it would remain
  trapped in memory forever, creating a memory leak.

  With WeakMap, the reference is weak. Once the application drops 'objKey', the key and
  its large computed result object are automatically swept away by the garbage collector.
*/

// Execution wrapper to run our tasks
const runExercises = () => {
  mapExercise();

  // Test Cache
  let userSession = { token: 'xyz123' };
  getComputedResult(userSession); // Runs computation
  getComputedResult(userSession); // Fetches from cache
  userSession = null; // Memory will automatically clean up behind the scenes
};

runExercises();

/*
   Task 5: Architectural Summary Table


   KEY-VALUE STORAGE: OBJECT vs MAP vs WEAKMAP

   1. Plain Object
      - When to use: For static data structures, configurations, or simple JSON payloads.
      - Clear reason: Best for hardcoded properties with string keys where syntax simplicity is preferred.

   2. Map
      - When to use: For highly dynamic dictionaries with frequent writes/deletes, or non-string keys.
      - Clear reason: Guarantees insertion order, allows any key data type, and provides an instant O(1) `.size` counter.

   3. WeakMap
      - When to use: For caching, memoization metadata, or private data storage tied to lifecycle-bound objects.
      - Clear reason: Prevents severe memory leaks by letting garbage collection scrub entries automatically when keys die.


   LIST STORAGE: ARRAY vs SET vs WEAKSET

   1. Array
      - When to use: For ordered records, stacks, queues, or items that need direct index/sorting manipulation.
      - Clear reason: Best when duplicates are allowed and explicit element order (like standard sorting or mapping) is required.

   2. Set
      - When to use: For tracking distinct IDs, values, or tag pools where elements must be unique.
      - Clear reason: Eliminates duplicates instantly and performs ultra-fast lookup checks using `.has()` in O(1) time.

   3. WeakSet
      - When to use: For branding, state tracking, or flagging live objects within a processing stream.
      - Clear reason: Allows checking if a specific object instance is flagged without blocking its memory cleanup.

*/
