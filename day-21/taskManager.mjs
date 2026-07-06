// Import the load and save functions from our custom storage engine module
import { loadTasks, saveTasks } from './storage.mjs';

/**
 * Native, zero-dependency ANSI Escape Sequences for terminal styling.
 */
const COLORS = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

/**
 * Calculates a unique sequential ID based on existing tasks.
 * @param {Array} tasks - The current task array.
 */
function getNextId(tasks) {
  // If there are no tasks in the file, start our ID sequence at 1
  if (tasks.length === 0) return 1;
  // Map out an array containing only the numeric IDs of the tasks
  const ids = tasks.map((task) => task.id);
  // Find the highest number in that ID array and add 1 to it
  return Math.max(...ids) + 1;
}

/**
 * Checks if a task is overdue relative to the current system date.
 * Validates only incomplete tasks ('todo' or 'in-progress') against a valid YYYY-MM-DD string.
 */
function isTaskOverdue(task) {
  if (task.status === 'done' || !task.dueDate) return false;

  // Normalize dates to midnight to perform an accurate daily comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(task.dueDate);
  due.setHours(0, 0, 0, 0);

  // Return true if the deadline timestamp falls behind today's local date parameters
  return due < today;
}

/**
 * Formats a status string with descriptive ANSI escape logging targets.
 */
function formatStatusColor(status) {
  if (status === 'todo') return `${COLORS.red}todo${COLORS.reset}`;
  if (status === 'in-progress') {
    return `${COLORS.yellow}in-progress${COLORS.reset}`;
  }
  if (status === 'done') return `${COLORS.green}done${COLORS.reset}`;
  return status;
}

/**
 * Standardized grid display printer logic utilized across list and search pathways.
 */
export function printTaskGrid(tasks) {
  // Draw table header columns using padding spacing methods to make it scannable
  process.stdout.write(
    `${'ID'.padEnd(5)} ${'Status'.padEnd(15)} ${'Due Date'.padEnd(12)} ${'Created At'.padEnd(20)} Description\n`,
  );
  // Draw a clean dividing horizontal border line composed of dashes
  process.stdout.write(`${'-'.repeat(90)}\n`);

  // Iterate across every single task record in our active list array
  tasks.forEach((task) => {
    // Convert the stored ISO string into a cleaner local readable format string
    const createdDate = task.createdAt
      ? new Date(task.createdAt).toLocaleString(undefined, {
          dateStyle: 'short',
          timeStyle: 'short',
        })
      : 'N/A';

    // Parse out deadline tokens defaulting to explicit empty string blanks if omitted
    let displayDueDate = task.dueDate || 'No Date';

    // Set fallback container strings to preserve standard column alignment metrics safely
    let statusText = formatStatusColor(task.status);
    let descriptionText = task.description;

    // Evaluate dynamic watchdog parameters to inject bold red color formats on overdue data records
    if (isTaskOverdue(task)) {
      displayDueDate = `${COLORS.bold}${COLORS.red}${displayDueDate}${COLORS.reset}`;
      descriptionText = `${COLORS.bold}${COLORS.red}${descriptionText}${COLORS.reset}`;
    }

    // Format and print each task row aligning column lengths systematically
    process.stdout.write(
      `${task.id.toString().padEnd(5)} ` +
        `[${statusText.padEnd(20)}] ` +
        `${displayDueDate.padEnd(21)} ` +
        `${createdDate.padEnd(20)} ` +
        `${descriptionText}\n`,
    );
  });
}

/**
 * Adds a new task with a 'todo' status and an optional calendar deadline constraint to the list.
 */
export async function addTask(description, dueDateArg) {
  // Check if the description parameter is missing or consists only of empty spaces
  if (!description || !description.trim()) {
    throw new Error('Givens said Task description cannot be empty.');
  }

  let finalDueDate = null;

  // Validate date context matching parameters structurally using regex logic strings if present
  if (dueDateArg) {
    const trimmedDate = dueDateArg.trim();
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(trimmedDate) || Number.isNaN(Date.parse(trimmedDate))) {
      throw new Error('Due date must match the format YYYY-MM-DD exactly.');
    }
    finalDueDate = trimmedDate;
  }

  // Load the current list of tasks from the JSON database file
  const tasks = await loadTasks();
  // Generate a standardized ISO timestamp string representing right now
  const now = new Date().toISOString();

  // Construct a new task object structure matching the updated project spec
  const newTask = {
    id: getNextId(tasks), // Assign the next calculated sequential integer ID
    description: description.trim(), // Save the cleaned task description text
    status: 'todo', // Set the mandatory initial status to 'todo'
    createdAt: now, // Set the initial creation timestamp record
    updatedAt: now, // Set the initial update timestamp record
    dueDate: finalDueDate, // Assign standard calendar due dates or default null records
  };

  // Immutably clone the array instead of using direct mutation (.push)
  const updatedTasks = [...tasks, newTask];
  // Commit the updated task array back to the local database file
  await saveTasks(updatedTasks);

  process.stdout.write(
    `Givens Said your Task added successfully (ID: ${newTask.id})\n`,
  );
  return newTask;
}

/**
 * Deletes a task from the list by its ID.
 */
export async function deleteTask(id) {
  const tasks = await loadTasks();
  const initialLength = tasks.length;

  // Create a new array that excludes the task matching the target ID
  const filteredTasks = tasks.filter((t) => t.id !== id);

  // If the length of the array did not decrease, the target ID does not exist
  if (filteredTasks.length === initialLength) {
    throw new Error(`Task with ID ${id} not found.`);
  }

  // Write the filtered array back to the file to persist the deletion
  await saveTasks(filteredTasks);
  process.stdout.write(`Task ${id} deleted successfully.\n`);
}

/**
 * Updates a task description text string by its ID.
 */
export async function updateTask(id, newDescription) {
  if (!newDescription || !newDescription.trim()) {
    throw new Error('Task description cannot be empty.');
  }

  const tasks = await loadTasks();
  const taskExists = tasks.some((t) => t.id === id);

  if (!taskExists) {
    throw new Error(`Task with ID ${id} not found.`);
  }

  // Immutably transform the collection with .map to bypass object mutation errors
  const updatedTasks = tasks.map((task) => {
    if (task.id !== id) return task;
    return {
      ...task,
      description: newDescription.trim(),
      updatedAt: new Date().toISOString(),
    };
  });

  await saveTasks(updatedTasks);
  process.stdout.write(`Task ${id} updated successfully.\n`);
}

/**
 * Updates a task status flag by its ID.
 */
export async function updateTaskStatus(id, newStatus) {
  const tasks = await loadTasks();
  const taskExists = tasks.some((t) => t.id === id);

  if (!taskExists) {
    throw new Error(`Task with ID ${id} not found.`);
  }

  // Immutably map updates onto a new array instance reference
  const updatedTasks = tasks.map((task) => {
    if (task.id !== id) return task;
    return {
      ...task,
      status: newStatus,
      updatedAt: new Date().toISOString(),
    };
  });

  await saveTasks(updatedTasks);
  process.stdout.write(`Task ${id} marked as ${newStatus} successfully.\n`);
}

/**
 * Filters and prints the task collection to the terminal.
 */
export async function listTasks(statusFilter) {
  const allTasks = await loadTasks();
  let displayTasks = allTasks;

  // Check if the user specified a specific list status filter argument
  if (statusFilter) {
    if (!['todo', 'in-progress', 'done'].includes(statusFilter)) {
      throw new Error("Invalid status. Use 'todo', 'in-progress', or 'done'.");
    }
    displayTasks = allTasks.filter((t) => t.status === statusFilter);
  }

  if (displayTasks.length === 0) {
    process.stdout.write('No tasks found.\n');
    return;
  }

  // Pass active array components along to standardized grid formatting layout engines
  printTaskGrid(displayTasks);
}

/**
 * Isolates substring verification arrays inside structural files to match query text words.
 */
export async function searchTasks(keyword) {
  const tasks = await loadTasks();
  const searchNormalized = keyword.toLowerCase();

  const matchedTasks = tasks.filter((task) =>
    task.description.toLowerCase().includes(searchNormalized),
  );

  if (matchedTasks.length === 0) {
    process.stdout.write(`No tasks found matching keyword: "${keyword}"\n`);
    return;
  }

  process.stdout.write(
    `${COLORS.cyan}Search Results for keyword: "${keyword}"${COLORS.reset}\n\n`,
  );
  printTaskGrid(matchedTasks);
}

/**
 * Analytical metrics engine measuring core percentage complete ratios.
 */
export async function printStats() {
  const tasks = await loadTasks();
  const total = tasks.length;

  if (total === 0) {
    process.stdout.write(
      'No tracking metrics accessible. Database collection array is empty.\n',
    );
    return;
  }

  // Perform mathematical tracking count evaluations across matching array item records
  const todoCount = tasks.filter((t) => t.status === 'todo').length;
  const inProgressCount = tasks.filter(
    (t) => t.status === 'in-progress',
  ).length;
  const doneCount = tasks.filter((t) => t.status === 'done').length;

  // Process overdue totals explicitly using watchdog evaluation methods
  const overdueCount = tasks.filter((t) => isTaskOverdue(t)).length;

  // Compute precise programmatic percentage performance statistics ratios safely
  const completeRatio = ((doneCount / total) * 100).toFixed(1);

  process.stdout.write(
    `\n${COLORS.bold}${COLORS.cyan}📊 TASK ANALYTICS STATS DASHBOARD${COLORS.reset}\n`,
  );

  process.stdout.write(`${'='.repeat(45)}\n`);
  process.stdout.write(`  Absolute Records Total : ${total}\n`);
  process.stdout.write(
    `  Pending Status (Todo)  : ${COLORS.red}${todoCount}${COLORS.reset}\n`,
  );
  process.stdout.write(
    `  Running (In-Progress)  : ${COLORS.yellow}${inProgressCount}${COLORS.reset}\n`,
  );
  process.stdout.write(
    `  Finalized (Done)       : ${COLORS.green}${doneCount}${COLORS.reset}\n`,
  );
  process.stdout.write(
    `  Overdue Deadline Items : ${COLORS.bold}${COLORS.red}${overdueCount}${COLORS.reset}\n`,
  );
  process.stdout.write(`${'-'.repeat(45)}\n`);
  process.stdout.write(
    `  Execution Progress Ratio: ${COLORS.bold}${COLORS.magenta}${completeRatio}% Complete${COLORS.reset}\n\n`,
  );
}
