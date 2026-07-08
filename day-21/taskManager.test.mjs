// Set the environment variable to 'test' to configure the app behavior for testing
process.env.NODE_ENV = 'test';

// Import the built-in Node.js test runner functions for structuring the test suite
import { test, beforeEach, afterEach } from 'node:test';
// Import the strict assertion library to validate expected outcomes against actual results
import assert from 'node:assert/strict';
// Import the promise-based file system module to read and write files asynchronously
import fs from 'node:fs/promises';
// Import the path module to safely handle and transform file system paths
import path from 'node:path';

// Import the specific task manipulation functions that need to be tested
import { addTask, isTaskOverdue } from './taskManager.mjs';
// Import the data loading function to inspect the state of the task storage
import { loadTasks } from './storage.mjs';

// Construct an absolute file path pointing to 'tasks.test.json' in the current working directory
const TEST_FILE_PATH = path.join(process.cwd(), 'tasks.test.json');
// Initialize a mutable array variable to hold a backup copy of the test data
let backupData = [];

// Register a hook that automatically runs before every individual test block executes
beforeEach(async () => {
  try {
    // Attempt to read the entire contents of the test JSON file using UTF-8 encoding
    const data = await fs.readFile(TEST_FILE_PATH, 'utf-8');
    // Parse the file string into JavaScript arrays/objects, defaulting to an empty list if blank
    backupData = JSON.parse(data || '[]');
  } catch (err) {
    // Catch errors (like a missing file) and safely initialize the backup as an empty array
    backupData = [];
  }
});

// Register a hook that automatically runs after every individual test block completes
afterEach(async () => {
  // Restore the original test file state by writing the backup data back to the disk
  await fs.writeFile(
    TEST_FILE_PATH,
    // Convert the backup data back to a formatted JSON string with a 2-space indentation
    JSON.stringify(backupData, null, 2),
    'utf-8',
  );
});

// Define a test case to ensure the specific count of completed tasks matches expectations
test('Day 24 Query Engine: Verifies status distribution match totals', async () => {
  // Fetch the current array of tasks from the storage system
  const tasks = await loadTasks();
  // Filter the list to isolate only the tasks that have a status value of 'done'
  const doneTasks = tasks.filter((t) => t.status === 'done');
  // Confirm that the number of completed tasks found is exactly equal to 2
  assert.equal(doneTasks.length, 2);
});

// Define a test case to check if the overdue checking logic handles dates properly
test('Day 24 Deadline Core Engine: Validates chronological overdue evaluation parameters', () => {
  // Mock a mock task object representing an incomplete task with a past due date
  const pastTask = { status: 'todo', dueDate: '2020-01-01' };
  // Mock a mock task object representing an incomplete task with a future due date
  const futureTask = { status: 'todo', dueDate: '2030-12-31' };
  // Verify that the system correctly identifies the past task as overdue (true)
  assert.equal(isTaskOverdue(pastTask), true);
  // Verify that the system correctly identifies the future task as not overdue (false)
  assert.equal(isTaskOverdue(futureTask), false);
});

// Define a test case to verify that adding new tasks updates the list length and sequential IDs
test('Day 24 Immutable Core Persistence: Asserts new items stack sequential index arrays', async () => {
  // Retrieve the initial list of tasks before making any alterations
  const initialTasks = await loadTasks();
  // Verify that the test database starts out with exactly 4 tasks
  assert.equal(initialTasks.length, 4);

  // Execute the target function to append a brand new task to the database
  const created = await addTask(
    'Verify test suite integration pipelines',
    '2026-12-31',
  );
  // Re-fetch the task list from storage to capture the updated state
  const updatedTasks = await loadTasks();

  // Confirm that the total task count has successfully increased from 4 to 5
  assert.equal(updatedTasks.length, 5);
  // Confirm that the newly generated task was assigned the correct sequential ID of 5
  assert.equal(created.id, 5);
});
