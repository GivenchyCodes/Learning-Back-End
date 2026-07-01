## Day 21

\*_FIRST_

- `package.json` was created, and my `task-cli.js` contains the cli shebang to the absolute top of my main javascript file
- **_Modulus_** are divided into four:
  1. `storage.js`: This file serves as my Data Access Layer. Its single responsibility is reading and writing raw text to my local hard drive.
  - Import the core filesystem module from Node.js using promises
  - Import Node's path utility to handle cross-platform file paths seamlessly
  - Combine the current working directory
  - Ensures the JSON database file exists before reading (Fulfulled promise)
  - Loads tasks array from JSON file (JSON.PARSE)
  - Saves tasks array back to JSON file(JSON.STRINGIFY)
  2. `taskManager.js`: This file is the Business Logic Module that It evaluates inputs, structures task objects, calculates IDs, formats outputs, and tells the storage layer when to save data.
  - Import the data manipulation utilities directly from our local storage engine file
  - Calculates a unique sequential ID based on existing tasks.
  - If the database array is completely empty, start our task index sequence at 1
  - Use map to loop over every task and extract an array containing only their numeric IDs
  - Find the largest number inside that ID array using Math.max and add 1 to it (...ids) + 1
  - Adds a new task with a 'todo' status to the list.
  - Validate input: verify description exists and is not just empty whitespace characters
  - Write a clear validation error alert out to the system's standard error stream , if no error terminate the node script run environment
  - Retrieve the existing array list of tasks from our database file
  - Create an ISO timestamp string representing the exact millisecond this action occurs
  - Construct a fresh, strictly structured task entity matching specifications \*_for objects field:_
    id: getNextId(tasks), / Generate the next sequential tracking number
    description: description.trim(), // Remove any accidental leading or trailing white spaces
    status: 'todo', // Enforce the initial lifecycle status state as 'todo'
    createdAt: now, // Record the immutable historical creation timestamp
    updatedAt: now, // Record the mutable historical modification timestamp
  - Push the newly constructed task object onto our temporary application memory array
  - Persist the modified task collection securely back down to the physical JSON database file
  - Output a success status confirmation alert specifying the new tracking number (Givens Said your Task added successfully (ID))
    **_Deletes a task from the list by its ID_**
  - Pull down the active dataset array from storage into local application memory
  - Capture the total size count of the collection before filtering operations begin
  - Generate a new filtered array containing only items whose ID does NOT match the requested ID (const filteredTasks = tasks.filter((t) => t.id !== id);)
  - Notify the operator via standard error that the targeted tracking number does not exist
  - Stop script operations entirely, passing out a standard error termination flag
  - Commit & print a clear confirmation message stating the action was completed successfully
    **_Filters and prints the task collection to the terminal_**
  -
  3. `task-cli.js`
     **_#!/usr/bin/env node_**
  - The line above is a "Shebang". It instructs Unix operating systems to run this file directly using Node.
  - Import our target business logic command controllers from our local task manager engine module
    addTask
    deleteTask
    listTasks
    **_Outputs a command dictionary usage helper text guide block to the screen._**
    function printHelp() {
    // Print usage banner layout syntax header
    console.log('Usage: task-cli <command> [arguments]');
    // Visual spacer line break formatting
    console.log('\nCommands:');
    // Log instruction syntax configuration string for adding new items
    console.log(' add "<description>" Add a new task');
    // Log instruction configuration string for removing target elements
    console.log(' delete <id> Delete a task');
    // Log configuration syntax instruction layout for global listing outputs
    console.log(' list List all tasks');

  ## **_Main application runner orchestration method._**
  - Capture terminal inputs, slicing off the first two system arguments (node path and script path)
  - Check if the user ran the command raw without appending any action parameters
  - Print the instruction guidance syntax reference map block to their screen
  - Halt operations immediately using a standard input error termination flag (process.exit(1))
  - Isolate the very first input string command parameter and normalize it to lowercase
  - Run routing switches to execute specific functions based on the matching keyword
    switch (command)
  - Route matching for adding tasks
    case 'add':
    - Pass along the secondary description string argument into the creation manager
      Route matching for deleting tasks
      case 'delete':
    - Attempt to parse the secondary ID argument string into a mathematical base-10 integer
      case 'list':
    - Safely capture optional filter arguments, forcing lowercase values if they exist
  - Fire off the main workflow runner loop, catching any unexpected runtime logic failures
    main().catch (err) =>
  - Intercept the crash details and log them straight to the system tracking interface
    console.error('Unexpected error tracking failure context loop state:', err);
  - Kill processing workflows dropping critical execution error codes
    process.exit(1);
  4. `package.json`: This is my project's configuration manifest.
  - "name": "task-cli": Defines the official administrative name of my package in the Node ecosystem.
  - "version": "1.0.0": Tracks my application's current development release version following semantic versioning rules.
  - "type": "module": Crucial setting that forces Node.js to use modern ES Modules (import/export) instead of older CommonJS syntax (require)
  - "bin": Maps custom terminal keywords to physical scripts. It tells my computer that typing the global shortcut task-cli should execute the local ./task-cli.js file.

- import are made from taskManager on the three categories:
  1. `addTask`
  2. `listTasks`
  3. `deleteTask`

## File Path

Storage.js

- To locate the tasks.json where it saves the data, run: node -e "import path from 'path'; console.log(path.join(process.cwd(), 'tasks.json'))"

## Terminal

Display

- cat task.json

## CMD cli

- Create: task-cli add ""
- Check list: task-cli list
- Delete: task-cli delete 3

## Area of Concentration

JSON doesnt support '//' for comments

## IN Concli=usion

**_My project is on modern Node.js CLI Task Tracker app split into a clean three-tier architecture (storage.mjs, taskManager.mjs, and task-cli.js) using ES Modules._**
**_The app automatically initializes a local tasks.json file and allows users to add, list, and delete tasks globally via their terminal using npm link._**
