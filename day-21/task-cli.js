#!/usr/bin/env node
// Shebang line to execute this file using the Node.js environment from the user's PATH

import {
  addTask, // Imports the function to add a new task
  deleteTask, // Imports the function to remove an existing task
  listTasks, // Imports the function to view and filter tasks
  updateTask, // Imports the function to modify a task's description
  updateTaskStatus, // Imports the function to change a task's completion state
  searchTasks, // Imports the function to search tasks by keywords
  printStats, // Imports the function to show metrics and task analytical data
} from './taskManager.mjs'; // Specifies the local ES module file containing the core business logic

// Defines a function to display usage instructions when errors occur or no commands are passed
function printHelp() {
  // Writes the main command usage pattern to the standard output stream
  process.stdout.write('Usage: task-cli <command> [arguments]\n');
  // Writes a newline and the header for the commands section
  process.stdout.write('\nCommands:\n');
  // Writes instructions for the "add" command which accepts a description and an optional due date
  process.stdout.write(
    '  add "<description>" [YYYY-MM-DD] Add a new task (Optional due date)\n',
  );
  // Writes instructions for the "update" command which updates a specific task's description by its ID
  process.stdout.write(
    '  update <id> "<description>"     Update an existing task description\n',
  );
  // Writes instructions for the "delete" command which removes a task using its unique ID
  process.stdout.write('  delete <id>                     Delete a task\n');
  // Writes instructions for setting a task state to 'in-progress' using its ID
  process.stdout.write(
    '  mark-in-progress <id>           Mark task state to running status\n',
  );
  // Writes instructions for setting a task state to 'done' using its ID
  process.stdout.write(
    '  mark-done <id>                  Mark task state to completed status\n',
  );
  // Writes instructions for the basic "list" command to view all tasks
  process.stdout.write('  list                            List all tasks\n');
  // Writes instructions for filtering the list to show only tasks marked as 'todo'
  process.stdout.write('  list todo                       List todo tasks\n');
  // Writes instructions for filtering the list to show only tasks marked as 'in-progress'
  process.stdout.write(
    '  list in-progress                List in-progress tasks\n',
  );
  // Writes instructions for filtering the list to show only tasks marked as 'done'
  process.stdout.write(
    '  list done                       List completed tasks\n',
  );
  // Writes instructions for filtering the list to show only tasks that missed their due dates
  process.stdout.write(
    '  list overdue                    List tasks past their deadlines\n',
  );
  // Writes instructions for the "search" command to query tasks by textual matches
  process.stdout.write(
    '  search "<keyword>"              Search for tasks targeting words\n',
  );
  // Writes instructions for the "stats" command to view data summaries and productivity charts
  process.stdout.write(
    '  stats                           Display analytical performance metrics\n',
  );
}

// Defines the main orchestrator asynchronous function to process input and execute matching logic
async function main() {
  // Grabs CLI arguments, skipping the execution paths of Node and this script file
  const args = process.argv.slice(2);
  // Checks if the user failed to provide any action arguments
  if (args.length === 0) {
    // Displays the script's usage guide to help the user
    printHelp();
    // Exits the process immediately with an error status code of 1
    process.exit(1);
  }

  // Normalizes the primary action command string to lowercase to handle varying inputs safely
  const command = args[0].toLowerCase();

  // Initiates a try block to gracefully capture and handle errors thrown during database or file execution
  try {
    // Evaluates the command against predefined supported actions
    switch (command) {
      // Handles the action to append a new task entry
      case 'add': {
        // Invokes the asynchronous addTask handler with the description and optional due date arguments
        await addTask(args[1], args[2]);
        // Breaks out of the switch block upon successful completion
        break;
      }
      // Handles the action to modify an existing task entry
      case 'update': {
        // Parses the ID string argument into an integer using base-10 formatting
        const id = parseInt(args[1], 10);
        // Validates if the parsed ID is an invalid number (NaN)
        if (Number.isNaN(id)) {
          // Prints an explicit type validation error to the standard error stream
          process.stderr.write(
            'Error: Givens said Task ID must be a valid number.\n',
          );
          // Halts code execution with an error status code of 1
          process.exit(1);
        }
        // Invokes the asynchronous updateTask handler with the valid numeric ID and new description text
        await updateTask(id, args[2]);
        // Breaks out of the switch block upon successful completion
        break;
      }
      // Handles the action to remove a task entry
      case 'delete': {
        // Parses the target task ID string argument into a base-10 integer
        const id = parseInt(args[1], 10);
        // Validates if the parsed ID is an invalid number (NaN)
        if (Number.isNaN(id)) {
          // Prints a type validation error to the standard error stream
          process.stderr.write(
            'Error: Givens said Task ID must be a valid number.\n',
          );
          // Halts code execution with an error status code of 1
          process.exit(1);
        }
        // Invokes the asynchronous deleteTask handler using the verified ID
        await deleteTask(id);
        // Breaks out of the switch block upon successful completion
        break;
      }
      // Handles the action to switch a task's status to 'in-progress'
      case 'mark-in-progress': {
        // Parses the target task ID string argument into a base-10 integer
        const id = parseInt(args[1], 10);
        // Validates if the parsed ID is an invalid number (NaN)
        if (Number.isNaN(id)) {
          // Prints a type validation error to the standard error stream
          process.stderr.write(
            'Error: Givens said Task ID must be a valid number.\n',
          );
          // Halts code execution with an error status code of 1
          process.exit(1);
        }
        // Invokes the status modification handler, passing the ID and the explicit state literal
        await updateTaskStatus(id, 'in-progress');
        // Breaks out of the switch block upon successful completion
        break;
      }
      // Handles the action to switch a task's status to 'done'
      case 'mark-done': {
        // Parses the target task ID string argument into a base-10 integer
        const id = parseInt(args[1], 10);
        // Validates if the parsed ID is an invalid number (NaN)
        if (Number.isNaN(id)) {
          // Prints a type validation error to the standard error stream
          process.stderr.write(
            'Error: Givens said Task ID must be a valid number.\n',
          );
          // Halts code execution with an error status code of 1
          process.exit(1);
        }
        // Invokes the status modification handler, passing the ID and the explicit state literal
        await updateTaskStatus(id, 'done');
        // Breaks out of the switch block upon successful completion
        break;
      }
      // Handles the action to display tasks
      case 'list': {
        // Invokes the asynchronous listTasks handler with the optional status or deadline filter argument
        await listTasks(args[1]);
        // Breaks out of the switch block upon successful completion
        break;
      }
      // Handles the action to search through existing tasks
      case 'search': {
        // Validates that the search term argument exists and is not purely empty whitespace
        if (!args[1] || !args[1].trim()) {
          // Prints a validation error message to the standard error stream
          process.stderr.write('Error: Search keyword cannot be empty.\n');
          // Halts code execution with an error status code of 1
          process.exit(1);
        }
        // Invokes the asynchronous searchTasks handler with the validated search keyword string
        await searchTasks(args[1]);
        // Breaks out of the switch block upon successful completion
        break;
      }
      // Handles the action to view analytics
      case 'stats': {
        // Invokes the asynchronous printStats handler to calculate and write metrics out to the terminal
        await printStats();
        // Breaks out of the switch block upon successful completion
        break;
      }
      // Handles any invalid or unrecognized commands entered by the user
      default: {
        // Writes an unknown command error notice out to the standard error stream
        process.stderr.write(`Error: Unknown command "${command}"\n`);
        // Prints the clear help utilization guide for recovery orientation
        printHelp();
        // Halts code execution with an error status code of 1
        process.exit(1);
      }
    }
  } catch (error) {
    // Catches operational system errors, file access failures, or unfulfilled runtime rules
    // Prints a formatted error indicator badge and the specific error message to the standard error stream
    process.stderr.write(`❌ ${error.message}\n`);
    // Gracefully terminates the execution loop flagging an error exit code of 1
    process.exit(1);
  }
}

// Executes the main CLI engine wrapper loop function
main();
