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
  if (status === 'in-progress')
    return `${COLORS.yellow}in-progress${COLORS.reset}`;
  if (status === 'done') return `${COLORS.green}done${COLORS.reset}`;
  return status;
}

/**
 * Standardized grid display printer logic utilized across list and search pathways.
 */
function printTaskGrid(tasks) {
  // Draw table header columns using padding spacing methods to make it scannable, expanding to handle deadlines
  console.log(
    `${'ID'.padEnd(5)} ${'Status'.padEnd(15)} ${'Due Date'.padEnd(12)} ${'Created At'.padEnd(20)} Description`,
  );
  // Draw a clean dividing horizontal border line composed of dashes
  console.log('-'.repeat(90));
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

    // Format and print each task row aligning column lengths systematically, accounting for hidden ANSI character overhead
    console.log(
      `${task.id.toString().padEnd(5)} ` +
        `[${statusText.padEnd(20)}] ` +
        `${displayDueDate.padEnd(21)} ` +
        `${createdDate.padEnd(20)} ` +
        `${descriptionText}`,
    );
  });
}

/**
 * Adds a new task with a 'todo' status and an optional calendar deadline constraint to the list.
 */
export async function addTask(description, dueDateArg) {
  // Check if the description parameter is missing or consists only of empty spaces
  if (!description || !description.trim()) {
    // Print an error message directly to the standard error stream
    console.error('Error: Givens said Task description cannot be empty.');
    // Terminate the Node process early with a failure exit code of 1
    process.exit(1);
  }

  let finalDueDate = null;

  // Validate date context matching parameters structurally using regex logic strings if present
  if (dueDateArg) {
    const trimmedDate = dueDateArg.trim();
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

    if (!dateRegex.test(trimmedDate) || isNaN(Date.parse(trimmedDate))) {
      console.error(
        'Error: Givens said Due date must match the format YYYY-MM-DD exactly.',
      );
      process.exit(1);
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

  // Push the newly constructed task object into the memory array
  tasks.push(newTask);
  // Commit the updated task array back to the local database file
  await saveTasks(tasks);
  // Print a confirmation message to the user showing their new task's ID
  console.log(`Givens Said your Task added successfully (ID: ${newTask.id})`);
}

/**
 * Deletes a task from the list by its ID.
 */
export async function deleteTask(id) {
  // Load the current array of tasks from the database file
  const tasks = await loadTasks();
  // Count how many tasks exist before filtering out the target
  const initialLength = tasks.length;
  // Create a new array that excludes the task matching the target ID
  const filteredTasks = tasks.filter((t) => t.id !== id);

  // If the length of the array did not decrease, the target ID does not exist
  if (filteredTasks.length === initialLength) {
    // Output a target-not-found error message to the user
    console.error(`Error: Givens said Task with ID ${id} not found.`);
    // Quit application execution with an error status code
    process.exit(1);
  }

  // Write the filtered array back to the file to persist the deletion
  await saveTasks(filteredTasks);
  // Confirm the successful deletion back to the command terminal
  console.log(`Task ${id} deleted successfully.`);
}

/**
 * Updates a task description text string by its ID.
 */
export async function updateTask(id, newDescription) {
  // Validate that the new description string contains characters
  if (!newDescription || !newDescription.trim()) {
    console.error('Error: Givens said Task description cannot be empty.');
    process.exit(1);
  }

  const tasks = await loadTasks();
  // Attempt to locate the exact index position matching our task ID
  const taskIndex = tasks.findIndex((t) => t.id === id);

  // If findIndex yields a negative sequence flag, the item does not exist
  if (taskIndex === -1) {
    console.error(`Error: Givens said Task with ID ${id} not found.`);
    process.exit(1);
  }

  // Update properties on the target element inside the memory dataset array
  tasks[taskIndex].description = newDescription.trim();
  tasks[taskIndex].updatedAt = new Date().toISOString();

  await saveTasks(tasks);
  console.log(`Task ${id} updated successfully.`);
}

/**
 * Updates a task status flag by its ID.
 */
export async function updateTaskStatus(id, newStatus) {
  const tasks = await loadTasks();
  const taskIndex = tasks.findIndex((t) => t.id === id);

  if (taskIndex === -1) {
    console.error(`Error: Givens said Task with ID ${id} not found.`);
    process.exit(1);
  }

  // Update status tracks along with standard timeline auditing indicators
  tasks[taskIndex].status = newStatus;
  tasks[taskIndex].updatedAt = new Date().toISOString();

  await saveTasks(tasks);
  console.log(`Task ${id} marked as ${newStatus} successfully.`);
}

/**
 * Filters and prints the task collection to the terminal.
 */
export async function listTasks(statusFilter) {
  // Read the active array of tasks out of the storage file
  let tasks = await loadTasks();

  // Check if the user specified a specific list status filter argument
  if (statusFilter) {
    // If the filter argument is not one of our three supported statuses
    if (!['todo', 'in-progress', 'done'].includes(statusFilter)) {
      // Print an invalid argument error message to the terminal standard error
      console.error(
        "Error: Invalid status. Use 'todo', 'in-progress', or 'done'.",
      );
      // Exit execution manually with an error notification code
      process.exit(1);
    }
    // Filter the task dataset to match only the requested status string
    tasks = tasks.filter((t) => t.status === statusFilter);
  }

  // Check if the resulting task collection to print is completely empty
  if (tasks.length === 0) {
    // Print a simple placeholder notice message to the console
    console.log('No tasks found.');
    // Exit out of the function early since there is nothing to iterate over
    return;
  }

  // Pass active array components along to standardized grid formatting layout engines
  printTaskGrid(tasks);
}

/**
 * Isolates substring verification arrays inside structural files to match query text words.
 */
export async function searchTasks(keyword) {
  const tasks = await loadTasks();
  const searchNormalized = keyword.toLowerCase();

  // Extract relevant task rows matching descriptions to structural user keywords
  const matchedTasks = tasks.filter((task) =>
    task.description.toLowerCase().includes(searchNormalized),
  );

  if (matchedTasks.length === 0) {
    console.log(`No tasks found matching keyword: "${keyword}"`);
    return;
  }

  console.log(
    `${COLORS.cyan}Search Results for keyword: "${keyword}"${COLORS.reset}\n`,
  );
  // Route matched arrays to structural data grid printers safely
  printTaskGrid(matchedTasks);
}

/**
 * Analytical metrics engine measuring core percentage complete ratios.
 */
export async function printStats() {
  const tasks = await loadTasks();
  const total = tasks.length;

  if (total === 0) {
    console.log(
      'No tracking metrics accessible. Database collection array is empty.',
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

  console.log(
    `\n${COLORS.bold}${COLORS.cyan}📊 TASK ANALYTICS STATS DASHBOARD${COLORS.reset}`,
  );
  console.log('='.repeat(45));
  console.log(`  Absolute Records Total : ${total}`);
  console.log(
    `  Pending Status (Todo)  : ${COLORS.red}${todoCount}${COLORS.reset}`,
  );
  console.log(
    `  Running (In-Progress)  : ${COLORS.yellow}${inProgressCount}${COLORS.reset}`,
  );
  console.log(
    `  Finalized (Done)       : ${COLORS.green}${doneCount}${COLORS.reset}`,
  );
  console.log(
    `  Overdue Deadline Items : ${COLORS.bold}${COLORS.red}${overdueCount}${COLORS.reset}`,
  );
  console.log('-'.repeat(45));
  console.log(
    `  Execution Progress Ratio: ${COLORS.bold}${COLORS.magenta}${completeRatio}% Complete${COLORS.reset}\n`,
  );
}
