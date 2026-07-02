#!/usr/bin/env node
// Identifies the interpreter path environment for executing this script via Node.js

import {
  addTask,
  deleteTask,
  listTasks,
  updateTask,
  updateTaskStatus,
} from './taskManager.mjs';
// Imports the complete set of asynchronous task operations from the local module file

/**
 * Outputs a command dictionary usage helper text guide block to the screen.
 */
function printHelp() {
  // Declares the utility function responsible for printing application instructions
  console.log('Usage: task-cli <command> [arguments]');
  // Outputs the primary command-line execution syntax template layout structure
  console.log('\nCommands:');
  // Prints a clean visual break header section grouping command options
  console.log('  add "<description>"             Add a new task');
  // Logs the syntax configuration blueprint for generating a new item
  console.log(
    '  update <id> "<description>"     Update an existing task description',
  );
  // Logs the syntax structural blueprint for rewriting existing description records
  console.log('  delete <id>                     Delete a task');
  // Logs the syntax format layout configuration for destroying existing records
  console.log(
    '  mark-in-progress <id>           Mark task state to running status',
  );
  // Logs the option flag mapping pattern used to toggle in-progress states
  console.log(
    '  mark-done <id>                  Mark task state to completed status',
  );
  // Logs the option flag mapping pattern used to toggle finished states
  console.log('  list                            List all tasks');
  // Logs the standard command format utilized to render all records
  console.log('  list todo                       List todo tasks');
  // Logs the configuration standard utilized to render pending item categories
  console.log('  list in-progress                List in-progress tasks');
  // Logs the configuration standard utilized to render active items tracking
  console.log('  list done                       List completed tasks');
  // Logs the configuration standard utilized to render finalized items tracking
}
// Concludes the definitions block mapping out helper manual text strings

/**
 * Main application runner orchestration method.
 */
async function main() {
  // Declares the main asynchronous application engine controller execution pathway
  const args = process.argv.slice(2);
  // Extracts execution variables while stripping terminal runtime binary system locations
  if (args.length === 0) {
    // Evaluates if the user failed to provide any action command
    printHelp();
    // Triggers the help presentation menu script printing instructions to terminal
    process.exit(1);
    // Halts active application run loops while throwing an error status
  }
  // Closes the evaluation loop handling empty application user input failures

  const command = args[0].toLowerCase();
  // Isolates the primary action routing phrase normalized completely to lowercase

  switch (command) {
    // Initializes the programmatic branching structure to process input routing flags
    case 'add': {
      // Matches the execution flow block when inserting a new task
      await addTask(args[1]);
      // Dispatches downstream text content payload variables to persistence engine methods
      break;
    }
    // Finalizes the tracking block mapping the item registration routines
    case 'update': {
      // Matches the execution flow block when altering existing descriptions
      const id = parseInt(args[1], 10);
      // Parses the base-10 numerical target value from arguments array slots
      if (isNaN(id)) {
        // Evaluates whether the system parsed an invalid non-numerical identity match
        console.error('Error: Givens said Task ID must be a valid number.');
        // Directs a formatted error string straight onto standard error logs
        process.exit(1);
        // Safely terminates the script runtime loop tracking input error states
      }
      // Terminates the error prevention filtering block evaluating user numerical typing
      await updateTask(id, args[2]);
      // Transmits verified identity keys and description string update data parameters
      break;
    }
    // Finalizes the routing path management block handling text updates
    case 'delete': {
      // Matches the execution flow block when purging records out right
      const id = parseInt(args[1], 10);
      // Extracts target database index values safely as mathematical integer symbols
      if (isNaN(id)) {
        // Double-checks that targeted system query identity parameters resolve to numbers
        console.error('Error: Givens said Task ID must be a valid number.');
        // Writes clear contextual notifications directly tracking invalid target entries
        process.exit(1);
        // Drops terminal processing structures explicitly using common error response tags
      }
      // Closes validation checking sequences guarding database item removal operations
      await deleteTask(id);
      // Commences background array record purging logic via external module scripts
      break;
    }
    // Finalizes execution workflow rules dealing with target array element destruction
    case 'mark-in-progress': {
      // Matches the execution flow block for updating statuses to running
      const id = parseInt(args[1], 10);
      // Decodes positional parameter text tokens into standard base-10 integer references
      if (isNaN(id)) {
        // Inspects values to certify identity indexes represent real calculable numbers
        console.error('Error: Givens said Task ID must be a valid number.');
        // Provides descriptive operational context tracking error events on systemic logs
        process.exit(1);
        // Exits ongoing node environment executions explicitly marking an entry failure
      }
      // Terminates logic filters validation routines guarding status update tracking processes
      await updateTaskStatus(id, 'in-progress');
      // Commits updated active lifecycle tracking updates through core logic modules
      break;
    }
    // Finalizes processing logic parameters guiding operational tasks status transitionings
    case 'mark-done': {
      // Matches the execution flow block for updating statuses to finished
      const id = parseInt(args[1], 10);
      // Evaluates positional argument components into numeric system references safely
      if (isNaN(id)) {
        // Assesses if numerical parsing routines returned non-numeric calculation results instead
        console.error('Error: Givens said Task ID must be a valid number.');
        // Outputs standard syntax failure messages out over tracking console layers
        process.exit(1);
        // Instructs operational environments to execute termination sequences under faults
      }
      // Concludes parameter error check validations processing entry target references safely
      await updateTaskStatus(id, 'done');
      // Dispatches complete state change operations explicitly matching localized rulesets
      break;
    }
    // Finalizes lifecycle configuration processing pipelines monitoring closed item actions
    case 'list': {
      // Matches the execution flow block managing database display querying filters
      const statusFilter = args[1] ? args[1].toLowerCase() : null;
      // Captures state constraints formatting strings to lowercase safely if present
      await listTasks(statusFilter);
      // Pipelines array processing configurations along toward print management scripts
      break;
    }
    // Finalizes visualization display workflows tracking database table print structures
    default:
      // Fallback route handling unrecognized inputs that match no known command
      console.error(`Error: Givens said Unknown command "${command}"`);
      // Emits standard warnings notifying terminal logs of invalid operation parameters
      printHelp();
      // Displays structural application guide sheets allowing immediate command adjustments
      process.exit(1);
    // Halts background logic engines tracking execution context route mismatches
  }
  // Finalizes the control routing switch parsing execution parameter array tokens
}
// Concludes the primary asynchronous orchestrator wrapper framework setup actions

main().catch((err) => {
  // Triggers main execution tracks catching global runtime processing pipeline drops
  console.error('Unexpected error tracking failure context loop state:', err);
  // Routes global exception breakdowns safely out onto tracking systems log layers
  process.exit(1);
  // Safely crashes environmental instances applying critical application crash alert standards
});
// Closes out program setup parameters running code safely under global catches
