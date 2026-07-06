#!/usr/bin/env node
// Identifies the interpreter path environment for executing this script via Node.js

import {
  addTask,
  deleteTask,
  listTasks,
  updateTask,
  updateTaskStatus,
  searchTasks,
  printStats,
} from './taskManager.mjs';

/**
 * Outputs a command dictionary usage helper text guide block to the screen.
 */
function printHelp() {
  process.stdout.write('Usage: task-cli <command> [arguments]\n');
  process.stdout.write('\nCommands:\n');
  process.stdout.write(
    '  add "<description>" [YYYY-MM-DD] Add a new task (Optional due date)\n',
  );
  process.stdout.write(
    '  update <id> "<description>"     Update an existing task description\n',
  );
  process.stdout.write('  delete <id>                     Delete a task\n');
  process.stdout.write(
    '  mark-in-progress <id>           Mark task state to running status\n',
  );
  process.stdout.write(
    '  mark-done <id>                  Mark task state to completed status\n',
  );
  process.stdout.write('  list                            List all tasks\n');
  process.stdout.write('  list todo                       List todo tasks\n');
  process.stdout.write(
    '  list in-progress                List in-progress tasks\n',
  );
  process.stdout.write(
    '  list done                       List completed tasks\n',
  );
  process.stdout.write(
    '  search "<keyword>"              Search for tasks targeting words\n',
  );
  process.stdout.write(
    '  stats                           Display analytical performance metrics\n',
  );
}

/**
 * Main application runner orchestration method.
 */
async function main() {
  const args = process.argv.slice(2);
  if (args.length === 0) {
    printHelp();
    process.exit(1);
  }

  const command = args[0].toLowerCase();

  try {
    switch (command) {
      case 'add': {
        await addTask(args[1], args[2]);
        break;
      }
      case 'update': {
        const id = parseInt(args[1], 10);
        if (Number.isNaN(id)) {
          process.stderr.write(
            'Error: Givens said Task ID must be a valid number.\n',
          );
          process.exit(1);
        }
        await updateTask(id, args[2]);
        break;
      }
      case 'delete': {
        const id = parseInt(args[1], 10);
        if (Number.isNaN(id)) {
          process.stderr.write(
            'Error: Givens said Task ID must be a valid number.\n',
          );
          process.exit(1);
        }
        await deleteTask(id);
        break;
      }
      case 'mark-in-progress': {
        const id = parseInt(args[1], 10);
        if (Number.isNaN(id)) {
          process.stderr.write(
            'Error: Givens said Task ID must be a valid number.\n',
          );
          process.exit(1);
          return;
        }
        await updateTaskStatus(id, 'in-progress');
        break;
      }
      case 'mark-done': {
        const id = parseInt(args[1], 10);
        if (Number.isNaN(id)) {
          process.stderr.write(
            'Error: Givens said Task ID must be a valid number.\n',
          );
          process.exit(1);
          return;
        }
        await updateTaskStatus(id, 'done');
        break;
      }
      case 'list': {
        await listTasks(args[1]);
        break;
      }
      case 'search': {
        if (!args[1] || !args[1].trim()) {
          process.stderr.write('Error: Search keyword cannot be empty.\n');
          process.exit(1);
          return;
        }
        await searchTasks(args[1]);
        break;
      }
      case 'stats': {
        await printStats();
        break;
      }
      default: {
        process.stderr.write(`Error: Unknown command "${command}"\n`);
        printHelp();
        process.exit(1);
      }
    }
  } catch (error) {
    // Gracefully catch standard validation errors thrown from taskManager.mjs
    process.stderr.write(`❌ ${error.message}\n`);
    process.exit(1);
  }
}

main();
