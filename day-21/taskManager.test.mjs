// Imports native Node.js test runner functions for structuring and executing tests.
import { test, describe, beforeEach, afterEach } from 'node:test';
// Imports strict assertion utilities to validate test results and conditions.
import assert from 'node:assert/strict';
// Imports asynchronous file system methods using Promises for file operations.
import fs from 'fs/promises';
// Imports the path module to safely handle and resolve cross-platform file paths.
import path from 'path';
// Imports the application function responsible for adding new tasks.
import { addTask } from './taskManager.mjs';
// Imports the application function responsible for reading saved tasks.
import { loadTasks } from './storage.mjs';
// Dynamically imports the statistics reporting engine function from the main task manager module.
import { printStats } from './taskManager.mjs';
// Defines the absolute path to a temporary JSON file used for test isolation.
const TEST_FILE = path.join(process.cwd(), 'tasks.test.json');
// Dynamically imports the persistent data saving method from the local storage module.
import { saveTasks } from './storage.mjs';

// Groups related tests together into a specific suite for Task Manager core logic.
describe('Task Manager Core Logic Engine Suite', () => {
  // Hook that automatically runs before every single test to ensure a clean state.
  beforeEach(async () => {
    // Standard try-catch block to handle errors if the file does not exist yet.
    try {
      // Deletes the temporary test file before the test begins execution.
      await fs.unlink(TEST_FILE);
    } catch {} // Safely ignores errors if there is no file to delete.
  });

  // Hook that automatically runs after every single test to clean up generated files.
  afterEach(async () => {
    // Standard try-catch block to handle errors during file deletion.
    try {
      // Deletes the temporary test file created during the test run.
      await fs.unlink(TEST_FILE);
    } catch {} // Safely ignores errors if the file was already deleted.
  });

  // Defines an individual test case verifying successful creation of a valid task.
  test('addTask() should successfully create a structured todo entry item', async () => {
    // Triggers the application logic to create and save a new task string.
    await addTask('Verify unit test engine integration');

    // Reads the newly written test file content using UTF-8 text encoding.
    const data = await fs.readFile(TEST_FILE, 'utf-8');
    // Converts the raw JSON text string back into a usable JavaScript array object.
    const tasks = JSON.parse(data);

    // Verifies that exactly one task object exists in the storage array.
    assert.equal(tasks.length, 1);
    // Verifies that the auto-increment system assigned an initial ID value of 1.
    assert.equal(tasks[0].id, 1);
    // Verifies that the saved task text exactly matches the input argument.
    assert.equal(tasks[0].description, 'Verify unit test engine integration');
    // Verifies that the initial status of the created task defaults to 'todo'.
    assert.equal(tasks[0].status, 'todo');
    // Verifies that a valid timestamp value exists for the creation date property.
    assert.ok(tasks[0].createdAt);
  });

  // Defines an individual test case verifying error handling for empty string inputs.
  test('addTask() must block empty descriptions and throw a system failure exit code', async () => {
    // Backs up the original Node.js process.exit method to restore it later.
    const originalExit = process.exit;
    // Variables to track if, and with what code, the exit function gets called.
    let exitCodeCalled = null;
    // Replaces the global exit method with a mock function to capture the code.
    process.exit = (code) => {
      // Records the code passed by the application during the validation failure.
      exitCodeCalled = code;
    };

    // Attempts to add a task consisting only of empty whitespace characters.
    await addTask('   ');

    // Verifies that the system safely aborted operation by throwing an exit code of 1.
    assert.equal(exitCodeCalled, 1);

    // Puts the original global process.exit function back to prevent test pollution.
    process.exit = originalExit;
  });
});

//PRINSTAT TEST
// Defines an individual test case verifying mathematical metric calculations and console reporting.
test('printStats() should accurately calculate metrics and complete ratio percentages', async () => {
  // Backs up the native console.log function to safely restore it after the test.
  const originalLog = console.log;
  // Initializes an array buffer to accumulate all text output intercepted from the console.
  const capturedLogs = [];
  // Replaces global console.log with a spy function to intercept terminal output streams.
  console.log = (message) => {
    if (message) capturedLogs.push(message);
  };

  // Constructs an isolated array of test objects representing a diverse mix of task states.
  const mockTasks = [
    // Mock entry representing a completed task with tracking metadata.
    {
      id: 1,
      description: 'Task 1',
      status: 'done',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: null,
    },
    // Mock entry representing an unstarted task with tracking metadata.
    {
      id: 2,
      description: 'Task 2',
      status: 'todo',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: null,
    },
    // Mock entry representing an active task currently in progress.
    {
      id: 3,
      description: 'Task 3',
      status: 'in-progress',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: null,
    },
    // Second mock entry representing a completed task to create a balanced dataset.
    {
      id: 4,
      description: 'Task 4',
      status: 'done',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate: null,
    },
  ];
  // Writes the array of mock task objects directly into the database test file.
  await saveTasks(mockTasks);

  // Executes the reporting engine to calculate values and print metrics to the console.
  await printStats();

  // RESTORES the native console.log behavior immediately so test runners can print reports normally.
  console.log = originalLog;

  // Aggregates all captured terminal log segments into a single cohesive string for analysis.
  const fullOutputText = capturedLogs.join('\n');

  // Confirms that the report correctly aggregates and displays a total count of 4 items.
  assert.match(fullOutputText, /Absolute Records Total\s*:\s*4/);
  // Verifies that the printed text reports the correct quantity of unstarted 'todo' tasks.
  assert.match(fullOutputText, /Pending Status \(Todo\)\s*:\s*/);
  // Verifies that the printed text reports the correct quantity of completed 'done' tasks.
  assert.match(fullOutputText, /Finalized \(Done\)\s*:\s*/);
  // Confirms that the output calculates exactly 50.0% completion with single-decimal float precision.
  assert.match(fullOutputText, /50\.0% Complete/);
});
