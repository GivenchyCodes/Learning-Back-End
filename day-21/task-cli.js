#!/usr/bin/env node
// Import the core business logic functions from our local task manager engine module
import { addTask, deleteTask, listTasks } from './taskManager.mjs';

/**
 * Outputs a command dictionary usage helper text guide block to the screen.
 */
function printHelp() {
  // Print usage banner layout
  console.log('Usage: task-cli <command> [arguments]');
  // Print command categories visual spacer line break
  console.log('\nCommands:');
  // Log usage configuration instruction syntax string for creating items
  console.log('  add "<description>"             Add a new task');
  // Log syntax instruction configuration string for removing target elements
  console.log('  delete <id>                     Delete a task');
  // Log syntax instruction layout for global listing output strings
  console.log('  list                            List all tasks');
  // Log syntax instruction layout for filtering pending tasks
  console.log('  list todo                       List todo tasks');
  // Log syntax instruction layout for filtering running operations
  console.log('  list in-progress                List in-progress tasks');
  // Log syntax instruction layout for filtering finished tasks
  console.log('  list done                       List completed tasks');
}

/**
 * Main application runner orchestration method.
 */
async function main() {
  // Capture inputs while discarding node binary and script path components
  const args = process.argv.slice(2);
  // Evaluate if the user failed to supply arguments to the app run execution
  if (args.length === 0) {
    // Display the guidance syntax helper options text block to the user
    printHelp();
    // Drop terminal runtime execution with an invalid argument failure state
    process.exit(1);
  }

  // Isolate the core application operation parameter and force lowercase consistency
  const command = args[0].toLowerCase();

  // Run routing switches mapping process command strings to specific controllers
  switch (command) {
    // Match logic branch for item entry insertions
    case 'add': {
      // Execute the module creation function passing along the target string argument
      await addTask(args[1]);
      // Exit out of the evaluation engine switch structure
      break;
    }
    // Match logic branch for records deletion requests
    case 'delete': {
      // Parse the second argument value directly into an integer number data type
      const id = parseInt(args[1], 10);
      // Check if parsing failed to generate a valid matching mathematical integer number
      if (isNaN(id)) {
        // Log an analytical parameter type error alert directly to standard error
        console.error('Error: Givens said Task ID must be a valid number.');
        // Terminate process loop operations explicitly with an input error state status
        process.exit(1);
      }
      // Trigger the background array element destruction engine module function
      await deleteTask(id);
      // Exit out of the evaluation engine switch structure
      break;
    }
    // Match evaluation branch managing standard list query filters
    case 'list': {
      // Isolate optional secondary state constraint parameters and format to lowercase strings safely
      const statusFilter = args[1] ? args[1].toLowerCase() : null;
      // Pipeline downstream dataset array parameters to list formatting printing scripts
      await listTasks(statusFilter);
      // Exit out of the evaluation engine switch structure
      break;
    }
    // Fallback block executing automatically when matching command configurations cannot be located
    default:
      // Construct an unrecognized routing path notification alerting the terminal console logs
      console.error(`Error: Givens said Unknown command "${command}"`);
      // Print command structural options maps allowing users to evaluate structural configuration maps
      printHelp();
      // Halt execution routines completely providing an invalid action state exit notice code
      process.exit(1);
  }
}

// Invoke the main engine loop capturing unexpected background runtime execution pipeline errors
main().catch((err) => {
  // Route system tracking exceptions directly outward onto the system errors logging interface
  console.error('Unexpected error tracking failure context loop state:', err);
  // Kill processing workflows dropping state context flags using critical execution crash tracking codes
  process.exit(1);
});
