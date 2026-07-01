// Import the load and save functions from our custom storage engine module
import { loadTasks, saveTasks } from './storage.mjs';

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
 * Adds a new task with a 'todo' status to the list.
 */
export async function addTask(description) {
  // Check if the description parameter is missing or consists only of empty spaces
  if (!description || !description.trim()) {
    // Print an error message directly to the standard error stream
    console.error('Error: Givens said Task description cannot be empty.');
    // Terminate the Node process early with a failure exit code of 1
    process.exit(1);
  }

  // Load the current list of tasks from the JSON database file
  const tasks = await loadTasks();
  // Generate a standardized ISO timestamp string representing right now
  const now = new Date().toISOString();

  // Construct a new task object structure matching the project spec
  const newTask = {
    id: getNextId(tasks), // Assign the next calculated sequential integer ID
    description: description.trim(), // Save the cleaned task description text
    status: 'todo', // Set the mandatory initial status to 'todo'
    createdAt: now, // Set the initial creation timestamp record
    updatedAt: now, // Set the initial update timestamp record
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

  // Draw table header columns using padding spacing methods to make it scannable
  console.log(
    `${'ID'.padEnd(5)} ${'Status'.padEnd(15)} ${'Created At'.padEnd(20)} Description`,
  );
  // Draw a clean dividing horizontal border line composed of dashes
  console.log('-'.repeat(75));
  // Iterate across every single task record in our active list array
  tasks.forEach((task) => {
    // Convert the stored ISO string into a cleaner local readable format string
    const createdDate = task.createdAt
      ? new Date(task.createdAt).toLocaleString(undefined, {
          dateStyle: 'short',
          timeStyle: 'short',
        })
      : 'N/A';

    // Format and print each task row aligning column lengths systematically
    console.log(
      `${task.id.toString().padEnd(5)} ` +
        `[${task.status.padEnd(11)}] ` +
        `${createdDate.padEnd(20)} ` +
        `${task.description}`,
    );
  });
}
