console.log(`/**
 * DAY 17: ASYNC/AWAIT EXERCISES
 * Previous Topic: Promises
 * File: day-17/async-await.js
 * Using C language comments
 */`);

// Simulated helper functions from my Day 16 Task (from line 8 to 33 should be a protype)
function readFilePromise(filename) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!filename) {
        reject(new Error('Read Error: Filename is missing.'));
      } else {
        resolve(
          `Content of ${filename}: {"user": "Givenchicodes", "role": "Admin"}`,
        );
      }
    }, 500);
  });
}

function processDataPromise(fetchUserData) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`${fetchUserData} -> [Processed]`), 300);
  });
}

function saveDataPromise(fetchUserData) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(`Success: Saved (${fetchUserData})`), 300);
  });
}

// TASK 1: Rewrite Promise Chain using Async/Await

async function runFileLifecycle() {
  try {
    console.log('Starting Task 1: Async/Await Chain');

    const fileData = await readFilePromise('config.json');
    console.log('Step 1 Complete:', fileData);

    const processedData = await processDataPromise(fileData);
    console.log('Step 2 Complete:', processedData);

    const saveMessage = await saveDataPromise(processedData);
    console.log('Step 3 Complete:', saveMessage);
  } catch (error) {
    console.error('Chain caught an error:', error.message);
  }
}

/*
  COMMENT COMPARING PROMISES TO ASYNC/AWAIT (TASK 1):

  * The Day 16 Promise version eliminated callback nesting by chaining `.then()`
  downward. However, it still required boilerplate callback arrow functions
  inside every single step.

  * The `async/await` version completely flattens the syntax. By placing the
  `await` keyword behind the promise, JavaScript halts local execution until the
  promise resolves, handing us back the raw data value directly. The code reads
  exactly like traditional, synchronous blocking code. Error handling is also
  unified back into standard language structures (`try/catch`) instead of a
  specialized `.catch()` method.
*/
// so my question is "facebook and most chating social media uses the Promise method to buy them time right on rel project success rate progress request"

// TASK 2: Two Ways of Handling Failures

// Method A: Internal try/catch handling
async function failingFunctionInternal() {
  try {
    await readFilePromise(''); // Triggers failure
  } catch (error) {
    console.log('Task 2 (Internal Catch) Confirmed:', error.message);
  }
}

// Method B: External handling via attached .catch()
async function failingFunctionExternal() {
  return await readFilePromise(''); // Propagates the rejection upward
}

// TASK 3: Sequential vs. Parallel Execution

const taskOne = () =>
  new Promise((res) => setTimeout(() => res('Data 1'), 400));
const taskTwo = () =>
  new Promise((res) => setTimeout(() => res('Data 2'), 400));

async function runSequential() {
  const start = Date.now();

  const r1 = await taskOne();
  const r2 = await taskTwo();

  const duration = Date.now() - start;
  console.log(`Sequential execution finished in ${duration}ms with:`, [r1, r2]);
}

async function runParallel() {
  const start = Date.now();

  // Kick off both tasks concurrently and await their combined resolution array
  const results = await Promise.all([taskOne(), taskTwo()]);

  const duration = Date.now() - start;
  console.log(`Parallel execution finished in ${duration}ms with:`, results);
}

/*
  COMMENT ON SEQUENTIAL VS PARALLEL PERFORMANCE (TASK 3):

  * In `runSequential()`, `taskTwo` cannot start until `taskOne` completely finishes.
  Because they run back-to-back, their individual 400ms delays compound into a
  total execution wall-clock runtime of ~800ms.

  * In `runParallel()`, both tasks are pushed to the event loop at the exact same
  instant. They process concurrently in the background. Because they execute over
  the same slice of time, the total execution wall-clock runtime matches only the
  duration of the single slowest operation (~400ms).
*/

// TASK 4: Read Multi-Files with Consolidated Error Handling

async function readAndCombineFiles() {
  try {
    console.log('\n Starting Task 4: Multi-file Read');

    // Read three files sequentially using await
    const file1 = await readFilePromise('BSksecurity.txt');
    const file2 = await readFilePromise('BSkfacility.txt');
    const file3 = await readFilePromise('BSKstaff.txt');

    const combinedData = `${file1} | ${file2} | ${file3}`;
    const output = await processDataPromise(combinedData);

    console.log('Task 4 Combined Process Output:', output);
  } catch (error) {
    console.error(
      'Task 4 execution failed during file parsing:',
      error.message,
    );
  }
}

// TASK 5: Sleep Helper Implementation

/** //C progaramming comments multiple lines
 * Delays code execution asynchronously.
 * @param {number} ms - The millisecond timeout duration.
 * @returns {Promise<void>} Resolves after the specified time.
 */
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)); // because its empty

async function testSleep() {
  console.log('\nStarting Task 5: Sleep Test');
  console.log('Message 1: Initiating delay... counting 5 4 3 2 1 Loading');

  await sleep(1000); // Pauses local async execution context for 1 second

  console.log('Message 2: 1000ms has successfully elapsed!');
}

// Execution Runner
async function main() {
  // Execute tasks step-by-step
  await runFileLifecycle();

  console.log('\nStarting Task 2: Error Testing');
  await failingFunctionInternal();
  await failingFunctionExternal().catch((err) => {
    console.log('Task 2 (External Catch) Confirmed:', err.message);
  });

  console.log('\nStarting Task 3: Benchmarking');
  await runSequential();
  await runParallel();

  await readAndCombineFiles();
  await testSleep();
}

main();
